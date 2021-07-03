export interface Req{
    page: number
}

export interface iImages{
    farm:number,
    id: number,
    secret: string,
    server: string,
    title: string,
    owner: string,
    favorite?: boolean
}