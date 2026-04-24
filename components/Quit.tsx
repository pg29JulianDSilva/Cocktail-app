import { Text, TouchableOpacity, View, BackHandler } from 'react-native';
import RNExitApp from '@logicwind/react-native-exit-app';
import { styles } from './styles';

export default function QuitScreen()
{
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure?</Text>
      <TouchableOpacity style={styles.btn} onPress={() => RNExitApp.exitApp()}>
        <Text style={styles.subtitle}>YES</Text>
      </TouchableOpacity>
    </View>
  )
}