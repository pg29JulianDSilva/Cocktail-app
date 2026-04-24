import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { homeOptions } from './navigationMain';

import { styles } from './styles';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <NavigationContainer style={styles.container}>
        {homeOptions()}
      </NavigationContainer>
    </View>
  );
}
