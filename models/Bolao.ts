import { Jogo } from "./Jogo";

export interface Bolao {
  id: number;
  titulo: string;
  dataCriacao: Date;
  premio: number;
  jogo: Jogo;
}
