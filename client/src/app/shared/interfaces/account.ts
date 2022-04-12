export interface ITransaction {
    _id: string,
    title: string,
    category: string[],
    description: string,
    amount: number,
    payment_date: string,
    payee: string,
    type: string,
    createdAt: string,
    updatedAt: string
}

export interface IAccount {
    _id: string,
    userId: string,
    title: string,
    description: string,
    currency: string,
    amount: number,
    transactions: {
        income: ITransaction[],
        expense: ITransaction[]
    },
    createdAt: string,
    updatedAt: string,
}