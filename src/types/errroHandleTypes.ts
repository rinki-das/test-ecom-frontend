export interface AxiosErrorResponse {
  response?: {
    data: object;
    status: number;
    statusText: string;
  };
  message: string;
}

export interface errorHandleProps {
  error: object;
  label?: string;
}
