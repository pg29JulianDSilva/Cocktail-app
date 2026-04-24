import { StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { useFonts, TiltNeon_400Regular } from '@expo-google-fonts/tilt-neon';
import * as SplashScreen from 'expo-splash-screen';

const { width } = Dimensions.get('window');
const SCREENSPACE = width / 1.5;

SplashScreen.preventAutoHideAsync();

export function loadFont(){
  const [fontsLoaded] = useFonts({
  TiltNeon_400Regular,
  });

  return fontsLoaded;
}

export var styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#49007A',
    padding: 0,
  },
  containerscroll: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#49007A',
    padding: 0,
  },
  title: {
    margin: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'TiltNeon_400Regular',
    color: "white"
  },
  subtitle: {
    margin: 24,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'TiltNeon_400Regular',
    color: "white"
  },
  normalText : {
    margin: 15,
    padding: 15,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'TiltNeon_400Regular',
    borderRadius: 25,
    fontStyle: "Italic",
    color: "white"
  },
  detailsText:{
    margin: 3,
    paddingHorizontal: 30,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'TiltNeon_400Regular',
    borderRadius: 25,
    fontStyle: "Italic",
    color: "white"
  },
  btn: {
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#410052',
    borderRadius: 15,
  },
  btnAdjust: {
    paddingHorizontal: 3,
  }
  ,
  options : {
    flex: 1,
    flexDirection: "column",
    fontSize: 14,
  },
  input : {
    backgroundColor: '#190024',
    color: "#C7C7C7",
  },
  //For the movement stuff
  sectionTitle: {
    fontSize: 13, 
    fontWeight: "700", 
    color: "#555",
    marginBottom: 10, 
    letterSpacing: 0.4
  },
  pillRow: {
    flexDirection: "row",
    gap: 8
  },
  pill: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    gap: 2
  },
  pillKey: {
    fontSize: 11,
    fontWeight: "700"
  },
  pillVal: {
    fontSize: 14,
    fontWeight: "600"
  },
  image: {
    width: SCREENSPACE / 2,
    height: SCREENSPACE / 2,
    alignSelf: 'center'
  },
  imageOpt: {
    width: SCREENSPACE / 4,
    height: SCREENSPACE / 4,
    margin: 5,
    borderRadius: 15,
  },
  divider: {
    height: 60
  },
  //for the modal
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#0B0014', 
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});