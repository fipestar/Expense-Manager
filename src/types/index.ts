export type Category = {
    id: number,
    name: string
}

export type Event = {
    category: number, 
    description: string,
    amount: number,
    date: Date
}