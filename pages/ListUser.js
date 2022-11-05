import React, { useState, useContext } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  HStack,
  ScrollView,
  Icon,
} from "native-base";
import { StatusBar } from "react-native";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { GlobalContext } from "../App";
import generateUniqueKey from "../utils/generateUniqueKey";

export default function ListUser() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const { db } = useContext(GlobalContext);

  const editUser = (users) => {
    console.log(users);
    navigation.navigate("EditUser", { ...users });
  };

  const getUsers = async () => {
    const sql = `SELECT * FROM users`;

    try {
      let items = await db.exec(sql);
      setUsers(items);
      console.log("Successfully got the users.");
    } catch (e) {
      alert(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUsers();
    }, [])
  );

  const confirmDelete = (id) => {
    Alert.alert("", "Delete this users?", [
      { text: "Yes", onPress: () => deleteUser(id) },
      { text: "No", style: "cancel" },
    ]);
  };

  const deleteUser = async (id) => {
    const sql = `DELETE FROM users WHERE id=${id}`;

    try {
      let rowsAffected = await db.exec(sql);
      let items = users.filter((item) => item.id != id);

      setUsers(items);
      console.log("Successfully deleted the users.");
    } catch (e) {
      alert(e);
    }
  };

  const ListItem = ({ users }) => {
    return (
      <HStack
        borderBottomWidth="1"
        borderBottomColor="tertiary.200"
        bgColor="muted.100"
        justifyContent="center"
      >
        <Text w="10%" p="3" numberOfLines={1} 
          textAlign="center" ellipsizeMode="tail">
          {users.id}
        </Text>
        <Text
          onPress={() => editUser(users)}
          w="35%"
          p="3"
          textAlign="center"
          flex="1" 
          flexWrap="wrap"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {users.fullname}
        </Text>
        <Text
          w="30%"
          p="3"
          textAlign="center"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {users.username}
        </Text>
        <Center w="17%" p="3">
          <Icon
            onPress={() => confirmDelete(users.id)}
            as={Ionicons}
            name="trash"
            color="danger.700"
            size={5}
          />
        </Center>
      </HStack>
    );
  };

  return (
    <Box flex={1} bgColor="white" marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView>
        <Box p="3">
          <Heading m="3">
            <Text>List of Users</Text>
          </Heading>
          <VStack>
            <HStack justifyContent="center">
              <Text fontWeight="bold" w="15%" p="3" textAlign="center">
                ID
              </Text>
              <Text fontWeight="bold" w="35%" p="3">
                Full Name
              </Text>
              <Text fontWeight="bold" w="30%" p="3">
                Username
              </Text>
              <Center w="17%" p="3">
                <Icon as={Ionicons} name="trash" size={6} />
              </Center>
            </HStack>
            <Box>
              {users.length ? (
                users.map((users) => (
                  <ListItem key={generateUniqueKey(16)} users={users} />
                ))
              ) : (
                <Center>
                  <Text>No users found.</Text>
                </Center>
              )}
            </Box>
          </VStack>
        </Box>
        <Box h="60px" w="100%"></Box>
      </ScrollView>
    </Box>
  );
}
