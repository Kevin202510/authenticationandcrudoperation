import React, { useState, useContext } from "react";
import {
  Box,
  Heading,
  VStack,
  TextArea,
  ScrollView,
  HStack,
  Button,
} from "native-base";
import { StatusBar } from "react-native";
import { GlobalContext } from "../App";

export default function QueryBox() {
  const [query, setQuery] = useState("");
  const { db } = useContext(GlobalContext);

  const runQuery = async () => {
    console.log("Clicked Run Query button.");

    try {
      let result = await db.run(query);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const clearQuery = () => {
    setQuery("");
  };

  return (
    <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView bgColor="white">
        <Box p="3">
          <Heading m="3" numberOfLines={1} ellipsizeMode="tail">
            Enter Your Query
          </Heading>
          <VStack w="100%" p="3" space="5">
            <TextArea
              w="auto"
              fontSize="lg"
              h="60%"
              numberOfLines={20}
              bgColor="white"
              value={query}
              onChangeText={setQuery}
              placeholder="Enter query."
            />
            <HStack justifyContent="flex-end" space={1}>
              <Button size="lg" w="70px" onPress={clearQuery}>
                Clear
              </Button>
              <Button size="lg" w="70px" onPress={runQuery}>
                Run
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
