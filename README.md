# Revisão de código: React Native + Firebase + Expo + NativeWind

Repositório criado com o propósito de servir como menção para a matéria de _Desenvolvimento para Dispositivos Móveis II_, onde deve ser feita a revisão do código buscando identificar boas práticas utilizadas e sugerir melhorias para otimização, legibilidade e manutenção.

## Arquivos

### ChatList.js
Componente responsável por listar os usuários em uma lista de chats, utilizando o `FlatList` do React Native. Cada item da lista é renderizado através do componente `ChatItem`, e o roteamento é feito usando o `useRouter` do `expo-router`.

### ChatRoomHeader.js
Componente que define o cabeçalho da tela de conversa (ChatRoom). Utiliza `Stack.Screen` do `expo-router` para customizar o header, exibindo informações do usuário (imagem e nome) e ícones de chamada e vídeo.

### context.js
Arquivo que implementa o contexto de autenticação usando `Firebase Auth` e `Firestore`. Gerencia o estado do usuário (user) e autenticação (isAuthenticated), além de prover funções para login, logout, cadastro e atualização de dados do usuário.

### CustomMenuItems.js
Componente de item de menu personalizado, utilizado junto com o `react-native-popup-menu`. Define a ação ao selecionar uma opção do menu e permite a personalização do item com texto e ícone.

## Boas Práticas Utilizadas
- **Organização em Componentes:** Cada funcionalidade está separada em seu próprio componente, facilitando a manutenção e reutilização.

- **Uso de Context API:** Implementação do AuthContext para centralizar a lógica de autenticação, seguindo boas práticas de gerenciamento de estado global.

- **Responsividade:** Uso de ``react-native-responsive-screen` para adaptar tamanho de ícones, fontes e imagens a diferentes tamanhos de telas.

- **Tratamento de Erros:** Mensagens de erro personalizadas na autenticação para melhor feedback ao usuário.

## Melhorias Sugeridas
- **Uso do `keyExtractor` no `FlatList`:**
    - É usado o `Math.random()`, que gera chaves diferentes a cada renderização e prejudica a performance. **Sugestão:** usar `item.id` para identificador único do usuário.
- **Consolidação de Estilos:**
    - Centralizar estilos compartilhados como cores e tamanhos para melhor manutenção, usando um arquivo de temas ou `StyleSheet`.
- **Segurança em operações assíncronas:**
    - Adicionar `try/catch` no `updateUserData`, pois a função assíncrona pode falhar ao buscar dados.

## Refatoração
- **Separar lógica de autenticação:**
    - Criar uma pasta `services` e mover as funções `login`, `logout`, `register` e `updateUserData` para lá, deixando apenas como camada de gerencimento de estado.
- **Criar hooks personalizados:**
    - Pode ser criado um `useAuthActions()` para isolar funções como `login`, `logout` e `register`, separando a lógica de UI da lógica de autenticação.
- **Tipagem com TypeScript:**
    - Adicionar TypeScipt para maior segurança em tipos, principalmente nas propriedades dos componentes.
    - Exemplo ChatList:

```js
// Define a estrutura que cada usuário (User) deve seguir
interface User {
  id: string;            
  username: string;      
  profileUrl: string;  
  userId: string;       
}

// Define o formato esperado para as propriedades que o componente ChatList irá receber
interface ChatListProps {
  users: User[];         // Lista de usuários que serão exibidos no chat (um array de User)
  currentUser: User;     // O usuário que está atualmente logado
}

// Ele recebe como parâmetro um objeto { users, currentUser } que é do tipo ChatListProps
export default function ChatList({ users, currentUser }: ChatListProps) {
  // restante do código...
}

```

## Conclusão
O projeto demonstra boas práticas em componentes, gerenciamento de estado e uso de bibliotecas populares. As melhorias sugeridas visam aumentar a performance, segurança e escalabilidade do código.
