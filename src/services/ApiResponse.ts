export interface ApiResponse<T> {
  averageUptimeRaw: any;
  success: boolean;
  data: T;
}
