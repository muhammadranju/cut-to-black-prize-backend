export const API_URL = "http://10.10.7.101:5000/api/v1";

export const axiosResponseInterceptor = (response: any) => {
  return response.response?.data?.message;
};
