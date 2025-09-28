import { AxiosErrorResponse, errorHandleProps } from "@/types/errroHandleTypes";

export default function errorHandle({ error, label }: errorHandleProps) {
  const axiosError = error as AxiosErrorResponse;
  console.error(
    `Axios error: ${label}`,
    axiosError.response ? axiosError.response.data : axiosError.message
  );
}
