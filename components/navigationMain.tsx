import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import type { StackScreenProps } from "@react-navigation/stack";
import { HomeStack } from './types';
import MovementScreen from './Movement';

import { styles, loadFont } from './styles';

import AbcNav from './abcNav';
import LoginPage from './Login';
import QuitScreen from './Quit';

const Stack = createStackNavigator<HomeStack>();

function ListScreen({ navigation }: StackScreenProps<HomeStack, "Perfect Mix">){
  const items = ["Menu", "Movement Test"];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity style={[styles.btn, styles.btnAdjust]} onPress={()=>navigation.navigate(item, {name:item})}>
          <Text style={styles.subtitle}>{item}</Text>
          </TouchableOpacity>
      ))}
    </View>
  );
}

export function homeOptions() {
  return (
    <Stack.Navigator style={styles.container}
    screenOptions={{  
          animation: 'fade_from_bottom',
          headerShown: false,
      }}
    >
      <Stack.Screen name="Perfect Mix 🍸" component={ListScreen} />
      <Stack.Screen name="Menu" component={AbcNav} />
      <Stack.Screen name="Movement Test" component={MovementScreen} />
    </Stack.Navigator>
    )
}


