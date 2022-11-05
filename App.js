import React from "react";
import { NativeBaseProvider, useTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SetupDB from "./pages/SetupDB";
import Login from "./pages/Login";
import ListUser from "./pages/ListUser";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import QueryBox from "./pages/QueryBox";
import DBConnection from "./utils/DBConnection";

export const GlobalContext = React.createContext();

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => {
  const { colors } = useTheme();

  return {
    tabBarIcon: ({ focused, color, size }) => {
      const routeIcons = {
        AddUser: ["add", "add-outline"],
        ListUser: ["list", "list-outline"],
        EditUser: ["server", "server-outline"],
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

export default function App() {
  const globals = {
    db: new DBConnection("authandcruds"),
  };

  return (
    <NativeBaseProvider>
      <GlobalContext.Provider value={globals}>
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
            <Tab.Screen
              name="ListUser"
              options={{ headerShown: false }}
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
              name="QueryBox"
              options={{ headerShown: false }}
              component={QueryBox}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GlobalContext.Provider>
    </NativeBaseProvider>
  );
}
