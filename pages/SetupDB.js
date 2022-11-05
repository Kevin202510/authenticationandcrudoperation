import React, { useEffect, useContext } from "react";
import { Box, Center, HStack, Heading, VStack, Spinner } from "native-base";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SetupDB() {
  const navigation = useNavigation();
  const { db } = useContext(GlobalContext);

  const kuninAngData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('session_status');
       
        if(jsonValue===null){
          navigation.navigate("Login");
        }else{
          console.log(JSON.parse(jsonValue));
          navigation.navigate("ListUser");
        }

    } catch(e) {
        // console.log(e);
    }
  }

  useEffect(() => {
    async function setupDatabase() {
      const createProductsTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullname TEXT NOT NULL,
          username TEXT NOT NULL UNIQUE,
          password REAL NOT NULL
        );  
        
      `;
      try {
        await db.exec(createProductsTableQuery);
        kuninAngData();
      } catch (e) {
        console.log(e);
      }
    }

    setupDatabase();
  }, []);

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <VStack space={3} justifyContent="center" flex={1}>
        <Center>
          <Heading>Setting up database...</Heading>
        </Center>
        <HStack space={8} justifyContent="center">
          <Spinner color="emerald.500" />
          <Spinner color="warning.500" />
          <Spinner color="indigo.500" />
          <Spinner color="cyan.500" />
        </HStack>
      </VStack>
    </Box>
  );
}
