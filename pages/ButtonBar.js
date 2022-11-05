import React, {useEffect,useState} from "react";
import { NativeBaseProvider, useTheme } from "native-base";
import {Text} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SetupDB from "../pages/SetupDB";
import Myprofile from "../pages/Myprofile";
import Login from "../pages/Login";
import ListUser from "../pages/ListUser";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import QueryBox from "../pages/QueryBox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContext = React.createContext();

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => {
  const { colors } = useTheme();

  return {
    tabBarIcon: ({ focused, color, size }) => {
      const routeIcons = {
        AddUser: ["add", "add-outline"],
        ListUser: ["list", "list-outline"],
        EditUser: ["pencil", "pencil-outline"],
        Myprofile: ["person", "person-outline"],
        QueryBox: ["server", "server-outline"]
      };

      const index = focused ? 0 : 1;
      const name = route.name ? route.name : "";
      const icon = routeIcons[name][index];

      return <Ionicons name={icon} size={size} color={color} />;
    },
    tabBarActiveTintColor: colors["primary"]["500"],
    tabBarInactiveTintColor: "gray",
  };
};


export default function ButtonBar(){

    
  const [loginstat, setLoginstat] = useState(0);

  const kuninAngData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('session_status');
       console.log(jsonValue);
       if(jsonValue===null){
        setLoginstat(0);
      }else{
        setLoginstat(1);
      }

    } catch(e) {
    }
  }
  useEffect(() => {
    kuninAngData();
  });

    return(
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="SetupDB"
            screenOptions={screenOptions}
          >
            <Tab.Screen
              name="SetupDB"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={SetupDB}
            />
            <Tab.Screen
              name="Login"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={Login}
            />
            {loginstat>0
              ? <>
              <Tab.Screen
              name="ListUser"
              options={{ headerShown: false, }}
              component={ListUser}
            />
            <Tab.Screen
              name="AddUser"
              options={{ headerShown: false }}
              component={AddUser}
            />
            <Tab.Screen
              name="EditUser"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={EditUser}
            />
            <Tab.Screen
              name="Myprofile"
              options={{ headerShown: false}}
              component={Myprofile}
            />
            <Tab.Screen
              name="QueryBox"
              options={{ headerShown: false }}
              component={QueryBox}
            />
              </>
              : <>
              <Tab.Screen
              name="ListUser"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={ListUser}
            />
            <Tab.Screen
              name="AddUser"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={AddUser}
            />
            <Tab.Screen
              name="EditUser"
              options={{ headerShown: false, tabBarButton: (props) => false }}
              component={EditUser}
            />
            <Tab.Screen
              name="Myprofile"
              options={{ headerShown: false, tabBarButton: (props) => false}}
              component={Myprofile}
            />
            <Tab.Screen
              name="QueryBox"
              options={{ headerShown: false,tabBarButton: (props) => false }}
              component={QueryBox}
            />
              </>
            }
          </Tab.Navigator>
        </NavigationContainer>
    )
}