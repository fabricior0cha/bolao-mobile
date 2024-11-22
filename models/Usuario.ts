export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: {
    id: number;
    codigo: string;
  };
}
