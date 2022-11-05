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
import { StatusBar } from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { GlobalContext } from "../App";
import HideKeyboardEventListener from "../utils/HideKeyboardEventListener";

export default function EditProduct() {
  const navigation = useNavigation();
  useEffect(HideKeyboardEventListener(navigation), []);

  const route = useRoute();
  const { id } = route.params;
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setFullname(route.params.fullname);
      setUsername(route.params.username);
      setPassword(route.params.password + "");
    }, [route])
  );

  const { db } = useContext(GlobalContext);

  const updateUser = async (id) => {
    console.log("Clicked Update Product button.");

    const sql = `UPDATE users SET fullname='${fullname}', username='${username}', password='${password}'
       WHERE id=${id}`;

    try {
      await db.exec(sql);
      alert("Successfully updated the user.");
      navigation.navigate("ListUser");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView bgColor="white">
        <Box p="3">
          <Heading m="3" numberOfLines={1} ellipsizeMode="tail">
            Edit User Details
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
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password."
            />
            <HStack justifyContent="flex-end" space={1}>
              <Button
                size="lg"
                bgColor="danger.500"
                onPress={() => navigation.navigate("ListUser")}
              >
                Cancel
              </Button>
              <Button size="lg" onPress={() => updateUser(id)}>
                Update
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
