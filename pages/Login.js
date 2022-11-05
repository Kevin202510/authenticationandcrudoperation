import React, { useState, useContext, useEffect } from "react";
import {Text,View,Image, TextInput} from 'react-native';
import {Button} from "native-base";
import Icon from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {

    const italaAngData = async (status) => {
        try {
          await AsyncStorage.setItem('session_status', status)
        } catch (e) {
          // saving error
        }
      }

    const { db } = useContext(GlobalContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    const getdata = async () =>{

        const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

        try {
            let items = await db.exec(sql);
            if(items.length>0){
                alert("Login Successfully");
                const jsonValue = JSON.stringify(items)
                italaAngData(jsonValue);
                setUsername("");
                setPassword("");
                navigation.navigate("ListUser");
            }else{
                alert("Login Failed");
            }
            
        } catch (e) {
            alert(e);
        }
    }

    return (
        <View style={{backgroundColor:"#FFF",height:"100%"}}>
                 <Image source ={require('../assets/innovatech.gif')}
                    style={{width:"100%",height:"40%"}}
                />
                <Text
                 style={{
                     fontSize:30,
                     marginTop:20,
                     alignSelf:"center",
                 }}
                >InnovaTech</Text>

                <Text
                style={{
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:5,
                    opacity:0.4
                }}
                >
                    Innovation Through Science and Technology 
                </Text>

                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:50,
                    paddingHorizontal:10,
                    borderColor:"#00716F",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                    <Icon name="user" color="#00716F" size={24}/>
                    <TextInput 
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={{paddingHorizontal:10}}
                    />
                </View>
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#00716F",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                    <Icon name="lock" color="#00716F" size={24}/>
                    <TextInput 
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={{paddingHorizontal:10}}
                    />
                </View>

                <Button 
                style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#00716F",
                    paddingVertical:10,
                    borderRadius:23
                }} onPress={getdata}>
                Login
              </Button>
          </View>
    )
}