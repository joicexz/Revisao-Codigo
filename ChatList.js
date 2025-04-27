import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem"; // Importa o componente que renderiza cada item da lista de chats
import { useRouter } from "expo-router";

export default function ChatList({ users, currentUser }) {
  const router = useRouter(); // Navegação entre telas
  return (
    <View className="flex-1">
      <FlatList
        data={users} // Lista de usuários
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()} // Gera uma chave única aleatória para cada item
        showsVerticalScrollIndicator={false}
        renderItem={(
          { item, index } // Função que renderiza cada item da lista
        ) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            router={router}
            currentUser={currentUser}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
}
