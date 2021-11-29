//Entities

export interface Plan {
    id: number;
    nome: string;
    minutos: string;
}

export interface Tariff {
    id: number,
    origem: string,
    destino: string,
    valor: number
}

export interface Call {
    origem: string,
    destino: string,
    duracao: number,
    plano: string
}

//Responses
export type PlanResponse = WithKey<'planos', Plan[]>
export type TariffResponse = WithKey<'tarifas', Tariff[]>
export interface CallResponse {
    tarifa: Tariff,
    plano: Plan,
    duracao: number,
    custoPadrao: number,
    custoComPlano: number
}

//Errors
export interface ApiError<T> {
    error: ErrorDescription<T>
}

// Helper TypeMapping
type WithKey<K extends string,T> = {
    [P in K]: T
}

type ErrorDescription<T> = {
    [K in keyof T]?: Record<string, any>
}