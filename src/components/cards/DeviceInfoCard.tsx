"use client";
import React, { useEffect, useState } from "react";

interface DeviceInfoCardProps {
  device: {
    id: string;
    prefGuidanceMode: string;
    status: string;
    softwareVer: string;
    batteryLvl: string;
    lastKnownLocation: string;
    vibrationSensitivity: string;
  }
}



const DeviceInfoCard: React.FC<DeviceInfoCardProps> = ({ device }) => {


  
  const deviceData = [
    { label: "Device Id", value: device.id},
    { label: "Preffered Guidance Mode", value: device.prefGuidanceMode},
    { label: "Device status", value: device.status },
    { label: "Last Known Location", value: device.lastKnownLocation},
    { label: "Vibration Sensitivity", value: device.vibrationSensitivity },
    { label: "Battery Level", value: device.batteryLvl },
    { label: "Software version", value: device.softwareVer },
  ];


  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-white">
      <ul className="space-y-3 pl-16">
        {deviceData.map(({label, value}) => (
            
            <li className="flex" key={label}>
              <span className="text-white text-lg font-semibold min-w-[250px] capitalize">{label.replace(/([A-Z])/g, ' $1').trim()}:</span>
              
                <span>{value}</span>
              
            </li>
          
        ))}
      </ul>

    </div>
  );
};

export default DeviceInfoCard;