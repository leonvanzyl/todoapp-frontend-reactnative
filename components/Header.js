import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  HeaderView,
  HeaderTitle,
  HeaderButton,
  colors,
} from "../styles/appStyles";

import { Entypo } from "@expo/vector-icons";

const Header = ({ onClearTodos }) => {
  return (
    <HeaderView>
      <HeaderTitle>Todos</HeaderTitle>
      <HeaderButton onPress={onClearTodos}>
        <Entypo name="trash" size={25} color={colors.tertiary} />
      </HeaderButton>
    </HeaderView>
  );
};

export default Header;

const styles = StyleSheet.create({});
