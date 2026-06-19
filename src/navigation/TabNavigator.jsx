import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import FloatingTabBar from "@navigation/components/FloatingTabBar";
import TabBarIcon from "@navigation/components/TabBarIcon";
import { TAB_SCREENS } from "@navigation/components/tabs.config";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const renderIcon = useCallback(
    (icon) =>
      ({ color, size }) => <TabBarIcon name={icon} color={color} size={size} />,
    [],
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
        freezeOnBlur: true, // improves performance
      }}>
      {TAB_SCREENS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: renderIcon(tab.icon),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
