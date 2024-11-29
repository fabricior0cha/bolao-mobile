import { Jogo } from "./Jogo";
import { Participante } from "./Participante";

export interface Palpite {
  id: number;
  resultadoTimeUm: number;
  resultadoTimeDois: number;
  jogo: Jogo;
  participante: Participante;
}
