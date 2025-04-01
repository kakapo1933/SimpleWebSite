export interface ApiResponse<T> {
  success: boolean;
  data: T | T[];
  message?: string;
}