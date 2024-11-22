import { Bolao } from "./Bolao";
import { Time } from "./Time";

export interface Jogo {
  id: number;
  data: string;
  timeUm: Time;
  timeDois: Time;
  totalTimeUm: number;
  totalTimeDois: number;
}
