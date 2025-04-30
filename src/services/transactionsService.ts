import { fetchClient } from "@/utils/fetchClient";


const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
};


export const getTransactions = async () => {
    const token = getToken();
    const uri = `/sales/transactions/sales`;
    return fetchClient(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` 
      },
    });
  };


  export const getTransactionById = async (id: string) => {
    const token = getToken();
    const uri = `/sales/transactions/${id}`;
    return fetchClient(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
       
      },
    });
  };

  export const addTransaction = async (data: Record<string, any>) => {
    const token = getToken();
    const uri = `/sales/transactions/`;
    return fetchClient(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };


  export const editTransaction = async (id: string, data: Record<string, any>) => {
    const token = getToken();
    const uri = `/sales/transactions/${id}`;
    return fetchClient(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  };


  export const deleteTransaction = async (id: string) => {
    const token = getToken();
    const uri = `/sales/transactions/${id}`;
    return fetchClient(uri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({id:id})
    });
  };

  export const confirmTransaction = async (transaction_id: string, dispositive_id: string) => {
    const token = getToken();
    const uri = `/sales/transactions/sales/${transaction_id}/${dispositive_id}`;
    return fetchClient(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({
        transaction_id : transaction_id,
        dispositive_id : dispositive_id
      })
    });
  };

