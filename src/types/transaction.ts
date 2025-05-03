export interface Transaction {
    id: string;
    clientName: string;
    commercial: string;
    dispositifID: string;
    status: boolean;
    addingDate: string;
}

export interface TransactionRes {
    transactionId: string;
    userName: string;
    commercialName: string;
    dispositiveId: string;
    Status: boolean;
    date: string;
}