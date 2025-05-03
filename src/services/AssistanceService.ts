import { fetchClient } from "@/utils/fetchClient";


const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
};


export const getHelperRecommandations = async () => {
    const token = getToken();
    const uri = `/admin/helperRecommendations/`;
    return fetchClient(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` 
      },
    });
  };



  export const ConfirmHelperRecommandation = async (id: string, data: Record<string, any>) => {
    const token = getToken();
    const uri = `/admin/helperRecommendations/${id}/approve`;
    return fetchClient(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };