export interface IApiResponse<T> {
  success: boolean;
  data: T | T[];
  message?: string;
}
