import { View, StatusBar } from 'react-native';

import { styles, loadFont } from './components/styles';
import LoginPage from './components/Login'; 

import * as ScreenOrientation from 'expo-screen-orientation';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}


export default function App() {

   loadFont();
   changeScreenOrientation();
   
  return (
    <View style={[styles.container, {marginTop: StatusBar.currentHeight,}]}>
    <LoginPage />
    </View>
  );
}


