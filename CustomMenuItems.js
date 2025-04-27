import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu"; // Opção do menu de popup
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Componente reutilizável que representa uma opção dentro de um menu popup
// Exibe um texto, um ícone opcional e executa uma ação quando selecionado
export const MenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      {" "}
      {/* Define a ação ao selecionar a opção */}
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text
          style={{ fontSize: hp(1.7) }}
          className="font-semibold text-neutral-600"
        >
          {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
};
