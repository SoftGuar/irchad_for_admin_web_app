'use client';

import React, { useEffect, useState } from 'react';
import { Doughnut, Scatter, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  CategoryScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import type { Uptime, Anomaly, DiskUsage } from '@/types/system';
import { systemApi } from '@/services/systemService';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  CategoryScale
);

// Utility: assign a color to each service
const SERVICE_COLORS = [
  '#FF4C4C', // red
  '#FFA500', // orange
  '#FFD700', // yellow
  '#00BFFF', // blue
  '#32CD32', // green
  '#BA55D3', // purple
  '#FF69B4', // pink
  '#A0522D', // brown
  '#20B2AA', // teal
  '#808080', // gray
];

function getServiceColor(service: string, serviceList: string[]) {
  const idx = serviceList.indexOf(service);
  return SERVICE_COLORS[idx % SERVICE_COLORS.length];
}

export default function AnalyticsPage() {
  const [uptime, setUptime] = useState<Uptime | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [diskUsage, setDiskUsage] = useState<DiskUsage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uptimeData, anomaliesData, diskData] = await Promise.all([
          systemApi.getUptimeStats(),
          systemApi.getAnomalies(),
          systemApi.getDiskUsage()
        ]);

        setUptime(uptimeData);
        setAnomalies(anomaliesData || []);
        setDiskUsage(diskData || []);

      } catch (err) {
        console.error('Erreur complète:', err);
      }
    };

    fetchData();
  }, []);

  // --- Resource Usage Chart Data Prep (as before, with smoothing/cleaning) ---
  const prepareChartData = (rawData: DiskUsage[]) => {
    // Filter, sort, deduplicate, outlier removal, decimation, smoothing
    const validData = rawData.filter(d => 
      d.timestamp &&
      typeof d.disk_usage_percent === 'number' &&
      typeof d.cpu_usage === 'number' &&
      !isNaN(d.disk_usage_percent) &&
      !isNaN(d.cpu_usage) &&
      d.disk_usage_percent >= 0 &&
      d.disk_usage_percent <= 100 &&
      d.cpu_usage >= 0 &&
      d.cpu_usage <= 100
    );
    if (validData.length === 0) return [];
    const sortedData = validData.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    // Remove duplicates and close timestamps
    const deduplicatedData = [];
    let lastTimestamp = 0;
    const minInterval = 30 * 1000;
    for (const item of sortedData) {
      const currentTimestamp = new Date(item.timestamp).getTime();
      if (currentTimestamp - lastTimestamp >= minInterval) {
        deduplicatedData.push(item);
        lastTimestamp = currentTimestamp;
      }
    }
    // Outlier removal
    const removeOutliers = (data: DiskUsage[], field: keyof DiskUsage) => {
      const values = data.map(d => d[field] as number).sort((a, b) => a - b);
      const q1Index = Math.floor(values.length * 0.25);
      const q3Index = Math.floor(values.length * 0.75);
      const q1 = values[q1Index];
      const q3 = values[q3Index];
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.0 * iqr;
      const upperBound = q3 + 1.0 * iqr;
      return data.filter(d => {
        const value = d[field] as number;
        return value >= lowerBound && value <= upperBound;
      });
    };
    let cleanedData = removeOutliers(deduplicatedData, 'cpu_usage');
    cleanedData = removeOutliers(cleanedData, 'disk_usage_percent');
    // Decimation
    const maxPoints = 50;
    if (cleanedData.length > maxPoints) {
      const step = Math.floor(cleanedData.length / maxPoints);
      cleanedData = cleanedData.filter((_, index) => index % step === 0);
    }
    // Smoothing
    const applyMovingAverage = (data: DiskUsage[], field: keyof DiskUsage, windowSize: number = 3) => {
      return data.map((item, index) => {
        const start = Math.max(0, index - Math.floor(windowSize / 2));
        const end = Math.min(data.length, index + Math.ceil(windowSize / 2));
        const window = data.slice(start, end);
        const average = window.reduce((sum, d) => sum + (d[field] as number), 0) / window.length;
        return {
          ...item,
          [field]: Math.round(average * 100) / 100
        };
      });
    };
    cleanedData = applyMovingAverage(cleanedData, 'cpu_usage', 5);
    cleanedData = applyMovingAverage(cleanedData, 'disk_usage_percent', 3);
    return cleanedData;
  };

  if (!uptime || !anomalies || !diskUsage) {
    return (
      <div className="min-h-screen bg-[#2E2E2E] p-8 flex items-center justify-center">
        <div className="text-orange-400">Loading system data...</div>
      </div>
    );
  }

  // --- Prepare data for anomalies chart ---
  // 1. Get all unique services (in order of appearance)
  const serviceList = Array.from(
    anomalies.reduce((set, a) => set.add(a.service), new Set<string>())
  );
  // 2. Build a dataset per service
  const anomalyDatasets = serviceList.map((service, idx) => ({
    label: service,
    data: anomalies
      .filter(a => a.service === service)
      .map(a => ({
        x: new Date(a.timestamp),
        y: idx + 1 // stack vertically by service
      })),
    backgroundColor: getServiceColor(service, serviceList),
    pointRadius: 6,
    pointHoverRadius: 8,
    showLine: false,
  }));

  // --- Prepare cleaned data for resource usage chart ---
  const cleanedDiskUsage = prepareChartData(diskUsage);

  return (
    <div className="min-h-screen bg-[#2E2E2E] p-8 flex justify-center">
      <div
        className="max-w-6xl w-full h-[80vh] overflow-y-auto space-y-8"
        style={{
          direction: 'ltr',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Uptime Card */}
        <div className="bg-[#262626] p-6 rounded-lg shadow">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32">
              <Doughnut 
                data={{
                  labels: ['Uptime', 'Downtime'],
                  datasets: [{
                    data: [uptime?.averageUptimeRaw || 0, 1 - (uptime?.averageUptimeRaw || 0)],
                    backgroundColor: ['#FFA500', '#FF4C4C']
                  }]
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: { color: '#FFF' }
                    }
                  }
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-[#2E2E2E] rounded">
                <p className="text-sm text-gray-300">Average Uptime</p>
                <p className="text-xl font-bold text-orange-400">
                  {uptime?.averageUptime || 'N/A'}
                </p>
              </div>
              <div className="p-4 bg-[#2E2E2E] rounded">
                <p className="text-sm text-gray-300">Max Uptime</p>
                <p className="text-xl font-bold text-orange-400">
                  {uptime?.maxUptime || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Anomalies Timeline */}
        <div className="bg-[#262626] p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4 text-orange-400">System Anomalies</h3>
          <Scatter
            data={{
              datasets: anomalyDatasets
            }}
            options={{
              plugins: {
                legend: { 
                  labels: { 
                    color: '#FFF',
                    boxWidth: 12,
                    padding: 20
                  } 
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) => {
                      const raw = ctx.raw as { x: Date, y: number };
                      const service = ctx.dataset.label || 'Unknown';
                      return `${service}: ${raw.x.toLocaleString()}`;
                    },
                  },
                },
              },
              scales: {
                x: { 
                  type: 'time', 
                  time: { 
                    unit: 'minute',
                    displayFormats: {
                      minute: 'HH:mm',
                      hour: 'MMM dd HH:mm'
                    }
                  },
                  ticks: { color: '#FFA500' },
                  grid: { color: '#444' }
                },
                y: { 
                  display: false,
                  min: 0,
                  max: Math.max(serviceList.length + 1, 5)
                }
              }
            }}
          />
        </div>

        {/* Resource Usage */}
        <div className="bg-[#262626] p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4 text-orange-400">Resource Usage</h3>
          {cleanedDiskUsage.length > 0 ? (
            <div style={{ height: '400px' }}>
              <Line
                data={{
                  labels: cleanedDiskUsage.map(d => new Date(d.timestamp)),
                  datasets: [
                    {
                      label: 'Disk Usage (%)',
                      data: cleanedDiskUsage.map(d => d.disk_usage_percent),
                      borderColor: '#FFA500',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                      tension: 0.6,
                      pointRadius: 1,
                      pointHoverRadius: 3,
                      borderWidth: 2,
                      fill: false
                    },
                    {
                      label: 'CPU Usage (%)',
                      data: cleanedDiskUsage.map(d => d.cpu_usage),
                      borderColor: '#FF4C4C',
                      backgroundColor: 'rgba(255,76,76,0.1)',
                      tension: 0.6,
                      pointRadius: 1,
                      pointHoverRadius: 3,
                      borderWidth: 2,
                      fill: false
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  animation: false,
                  plugins: {
                    legend: { 
                      labels: { color: '#FFF', position: 'top' }
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      titleColor: '#FFA500',
                      bodyColor: '#FFF'
                    }
                  },
                  scales: {
                    x: { 
                      type: 'time', 
                      time: { 
                        unit: 'minute',
                        displayFormats: {
                          minute: 'HH:mm',
                          hour: 'MMM dd HH:mm'
                        }
                      },
                      ticks: { 
                        color: '#FFA500',
                        maxTicksLimit: 8
                      },
                      grid: { color: '#444' }
                    },
                    y: { 
                      min: 0,
                      max: 100,
                      ticks: { 
                        color: '#FFA500',
                        stepSize: 10,
                        callback: function(value) {
                          return value + '%';
                        }
                      },
                      grid: { color: '#444' }
                    }
                  },
                  interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                  },
                  elements: {
                    line: {
                      tension: 0.6
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              No valid resource usage data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
