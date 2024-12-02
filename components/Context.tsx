import { API_URL } from "@/constants/Api";
import { Participante } from "@/models/Participante";
import { Usuario } from "@/models/Usuario";
import axios from "axios";
import { router } from "expo-router";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const Context = createContext({
  usuario: null as Usuario | null,
  setUsuario: (usuario: Usuario) => {},
  participante: null as Participante | null,
  setParticipante: (participante: Participante) => {},
  handleGetParticipante: () => {},
});

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [participante, setParticipante] = useState<Participante | null>(null);

  const handleGetParticipante = () => {
    axios
      .get(`${API_URL}/participantes?idUsuario=${usuario?.id}`)
      .then((resp) => {
        setParticipante(resp.data);
      });
  };

  useEffect(() => {
    if (usuario) {
      router.push(
        usuario.tipo.codigo == "ADM" ? "/(tabs)/perfil" : "/(tabs)/jogos"
      );
    }
  }, []);
  return (
    <Context.Provider
      value={{
        usuario,
        setUsuario,
        setParticipante,
        participante,
        handleGetParticipante,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUsuarioContext = () => useContext(Context);
