import { Usuario } from "@/models/Usuario";
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
});

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    if (usuario) {
      router.push(
        usuario.tipo.codigo == "ADM" ? "/(tabs)/perfil" : "/(tabs)/boloes"
      );
    }
  }, []);
  return (
    <Context.Provider value={{ usuario, setUsuario }}>
      {children}
    </Context.Provider>
  );
};

export const useUsuarioContext = () => useContext(Context);
