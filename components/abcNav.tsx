import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useScrollToTop } from '@react-navigation/native';
import DrinksScreen from './drinkSummary';
import { Text } from 'react-native';
import {  useRef } from 'react';


const Tab = createMaterialTopTabNavigator();


export default function AbcNav() {
  const item = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "W", "Y", "Z"];

  const top = useRef(null);

  useScrollToTop(top);

  return(
      <Tab.Navigator
      ref={top}
      screenOptions={{
          tabBarStyle: {
              backgroundColor: '#360632',
            },
            tabBarShowLabel: false,
          headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'TiltNeon_400Regular',
            },
            headerTitleAlign: 'center',
            tabBarScrollEnabled: true,
        }}
      >
        {item.map((item) => (
          <Tab.Screen name={item} component={DrinksScreen}
          options={{
            tabBarIcon: () => (
              <Text style={{fontSize: 20, color: "#fff"}}>
                {item}
              </Text>
            ),
          }}
          initialParams={{ user: "hello"}}
          />
        )
        )}
      </Tab.Navigator>
  )
}
