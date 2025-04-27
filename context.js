// Importações necessárias do React e Firebase
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Compartilha informações entre componentes
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado que guarda o usuário logado
  const [isAuthenticated, setIsAuthenticated] = useState(undefined); // Estado que indica se o usuário está autenticado

  // useEffect para escutar mudanças de autenticação no Firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // Quando o estado de login muda (login/logout), esta função é chamada
      if (user) {
        setIsAuthenticated(true); // Se houver usuário, define como autenticado
        setUser(user); // Salva o usuário no estado
        updateUserData(user.uid); // Atualiza informações do usuário no Firestore
      } else {
        setIsAuthenticated(false); // Se não houver usuário, define como não autenticado
        setUser(null); // Remove o usuário do estado
      }
    });
    return unsub;
  }, []);

  // Função para buscar e atualizar dados do usuário no Firestore
  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId); // Cria referência ao documento do usuário no Firestore
    const docSnap = await getDoc(docRef); // Busca o documento

    if (docSnap.exists()) {
      // Se o documento existe
      let data = docSnap.data(); // Pega os dados do documento
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
      // Atualiza o estado do usuário adicionando username, profileUrl e userId
    }
  };

  // Função de login
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true }; // Retorna sucesso
    } catch (e) {
      let msg = e.message; //Captura a mensagem de erro
      // Mensagens de erro específicas
      if (msg.includes("(auth/invalid-email)")) msg = "E-mail inválido";
      if (msg.includes("(auth/invalid-credential)"))
        msg = "E-mail ou Senha errada";
      return { success: false, msg }; // Retorna erro e a mensagem específica
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await signOut(auth); // Chama afunção do Firebase para deslogar
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  // Função de cadastro de um novo usuário
  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response.user :", response?.user);

      // setUser(response?.user);
      // setIsAuthenticated(true);

      // Cria um documento no Firestore com informações do usuário
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;
      // Possíveis erros no registro
      if (msg.includes("(auth/invalid-email)")) msg = "E-mail inválido";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Esse e-mail já está em uso";
      return { success: false, msg };
    }
  };

  // Retorna os componentes filhos com os valores desejados
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    // Garante que o hook seja usado somente dentro do AuthContextProvider
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value; // Retorna o valor (user, login, logout)
};
