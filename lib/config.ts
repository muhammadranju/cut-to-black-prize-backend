export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const axiosResponseInterceptor = (response: any) => {
  return response.response?.data?.message;
};
