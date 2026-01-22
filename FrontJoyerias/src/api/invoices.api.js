import api from "./axios";

export const getMyInvoices = () => 
    api.get("/invoices/me");

export const getAllInvoices = () =>
    api.get("/invoices");

export const downloadInvoice = (id) => 
    api.get(`/invoices/${id}/pdf`, {
        responseType: "blob"        
});