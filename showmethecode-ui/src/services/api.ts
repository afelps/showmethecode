import axios from "axios";
import { CallResponse, PlanResponse, TariffResponse } from '../interfaces'

const api = axios.create({ baseURL: "http://localhost:8080" });

export function getTariffs() {
  return api.get<TariffResponse>("/tarifa");
}

export function getPlans() {
  return api.get<PlanResponse>("/plano");
}

export function calculateCall(origem: string, destino: string, duracao: number, plano:string) {
  return api.get<CallResponse>("/chamada", {params: {
    origem: origem,
    destino: destino,
    duracao: duracao,
    plano: plano
  }});
}