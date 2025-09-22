export type Category = {
    id: number,
    name: string
}

export type Event = {
    id: string
    category: number, 
    description: string,
    amount: number,
    date: Date
}