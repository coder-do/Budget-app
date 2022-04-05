export interface UserData {
    _id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    age: number,
    gender: string,
    email: string,
    password: string,
    role: string,
    country: string,
    createdAt: string,
    updatedAt: string,
    categories: [
        income: string[],
        expense: string[],
    ]
    __v: number
}