import { Bolao } from "./Bolao";
import { Participante } from "./Participante";

export interface Palpite {
  id: number;
  resultadoTimeUm: number;
  resultadoTimeDois: number;
  dataCriacao: Date;
  bolao: Bolao;
  participante: Participante;
}
