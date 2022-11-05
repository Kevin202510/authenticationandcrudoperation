import React, { useState, useContext } from "react";
import { StatusBar } from "react-native";
import {Box,
    Heading,
    VStack,
    Input,
    Center,
    Text,
    ScrollView,
    HStack,
    Button
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../App";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Myprofile() {
    
    const [users, setUsers] = useState([]);
    const { db } = useContext(GlobalContext);
    const navigation = useNavigation();

    const burahinAngAsyncStorage = async() => {
        await AsyncStorage.removeItem('session_status');
        alert("Logout Sucessfull");
        navigation.navigate('Login');
    }

    const [ids, setIds] = useState("");

    const getUsers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('session_status');
       console.log(JSON.parse(jsonValue)[0].id);
        setIds(JSON.parse(jsonValue)[0].id);

    } catch(e) {
    }
        const sql = `SELECT * FROM users where id = '${ids}'`;
    
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
    
    const ListUserDetail = ({ users }) => {
    return (
        <Box>
        <Text
          onPress={() => editUser(users)}
          w="100%"
          p="3"
          textAlign="center"
          flex="1" 
          flexWrap="wrap"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
        Fullname :   
          {users.fullname}
        </Text>

        <Text
          w="100%"
          p="3"
          textAlign="center"
          flex="1" 
          flexWrap="wrap"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
        Username :
          {users.username}
        </Text>

        <Text
          w="100%"
          p="3"
          textAlign="center"
          flex="1" 
          flexWrap="wrap"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
        Password :
          {users.password}
        </Text>
        
        </Box>
    );
    };

    return(
        <Box flex={1} marginTop={StatusBar.currentHeight + "px"}>
      <ScrollView bgColor="white">
        <Box p="3">
          <Heading m="3" numberOfLines={1} ellipsizeMode="tail">
            My Profile
          </Heading>
          <VStack w="100%" p="3" space="5">
          {users.length ? (
                users.map((users) => (
                  <ListUserDetail users={users} />
                ))
              ) : (
                <Center>
                  <Text>No users found.</Text>
                </Center>
              )}
            <HStack justifyContent="flex-end">
              <Button size="lg" onPress={burahinAngAsyncStorage}>
                Sign Out
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
    )
}