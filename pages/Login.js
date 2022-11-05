import React, { useState, useContext, useEffect } from "react";
import {Text,StyleSheet,View,Image, TextInput} from 'react-native';
import {
    Button,
  } from "native-base";
import Icon from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../App";
import { AsyncStorage } from 'react-native';

export default function Login() {

    const italaAngData = async (status) => {
        try {
          await AsyncStorage.setItem('session_status', status)
        } catch (e) {
          // saving error
        }
      }

    const kuninAngData = async () => {
        try {
          const value = await AsyncStorage.getItem('session_status')
          if(value !== null) {
            return false;
          }else{
            return true;
          }
        } catch(e) {
          // error reading value
        }
      }

    const burahinAngAsyncStorage = async() => {
        AsyncStorage.clear();
        alert("Logout Sucessfull");
    }

    const { db } = useContext(GlobalContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    const getdata = async () =>{

        useEffect(() => {
            // if(kuninAngData());
            alert(kuninAngData());
        });

        const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

        try {
            let items = await db.exec(sql);
            if(items.length>0){
                alert("Login Successfully");
                italaAngData("active");
                // navigation.navigate("ListUser");
            }else{
                alert("Login Failed");
            }
            
        } catch (e) {
            alert(e);
        }
    }

    return (
        <View style={{backgroundColor:"#FFF",height:"100%"}}>
                 <Image source ={require('../assets/favicon.png')}
                    style={{width:"100%",height:"43%"}}
                />
                <Text
                 style={{
                     fontSize:30,
                     alignSelf:"center",
                 }}
                >Save the world</Text>

                <Text
                style={{
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:5,
                    opacity:0.4
                }}
                >
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
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
                    <Icon name="mail" color="#00716F" size={24}/>
                    <TextInput 
                        placeholder="Email"
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
                    <Icon name="mail" color="#00716F" size={24}/>
                    <TextInput 
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={{paddingHorizontal:10}}
                    />
                </View>

                <Button style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#00716F",
                    paddingVertical:10,
                    borderRadius:23
                }} onPress={getdata}>
                Save
              </Button>

              <Button style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#00716F",
                    paddingVertical:10,
                    borderRadius:23
                }} onPress={burahinAngAsyncStorage}>
                Logout
              </Button>
          </View>
    )
}