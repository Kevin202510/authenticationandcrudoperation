import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  ScrollView,
  HStack,
  Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { GlobalContext } from "../App";
import HideKeyboardEventListener from "../utils/HideKeyboardEventListener";

export default function AddUser() {
  const navigation = useNavigation();
  useEffect(HideKeyboardEventListener(navigation), []);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { db } = useContext(GlobalContext);

  const saveUser = async () => {
    console.log("Clicked Save User button.");

    const sql = `INSERT INTO users (fullname, username, password) 
       VALUES ('${fullname}','${username}','${password}')`;

    try {
      await db.exec(sql);
      alert("Successfully added the User.");
      clearForm();
    } catch (e) {
      alert(e);
    }
  };

  const clearForm = () => {
    setFullname("");
    setUsername("");
    setPassword("");
  };

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView bgColor="white">
        <Box p="3">
          <Heading m="3" numberOfLines={1} ellipsizeMode="tail">
            Enter User Details
          </Heading>
          <VStack w="100%" p="3" space="5">
            <Input
              w="auto"
              bgColor="white"
              value={fullname}
              onChangeText={setFullname}
              placeholder="Enter fullname."
            />
            <Input
              w="auto"
              bgColor="white"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username."
            />
            <Input
              w="auto"
              bgColor="white"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password."
            />
            <HStack justifyContent="flex-end">
              <Button size="lg" onPress={saveUser}>
                Save
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
