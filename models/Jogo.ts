import { Time } from "./Time";

export interface Jogo {
  id: number;
  horario: Date;
  data: string;
  timeUm: Time;
  timeDois: Time;
  totalTimeUm: number;
  totalTimeDois: number;
}
