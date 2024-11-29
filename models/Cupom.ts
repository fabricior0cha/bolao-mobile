import { Loja } from "./Loja";

export interface Cupom {
  id: number;
  pontos: number;
  codigo: string;
  dataVencimento: Date;
  desconto: number;
  loja: Loja;
}
