import { View, 
         Text, 
         TouchableOpacity,
         TextInput,
         Switch } from "react-native"; 
import { useState, createContext, useReducer } from 'react';
import { styles } from './styles';

import { auth } from './firebase';
import HomeScreen from './HomePage';

import { User } from './types';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [logged, setLogged] = useState(false);
  const [adult, setAdult] = useState(false);

  const DRINKING_KEY = "@class7:user"
  const handleEmailAuth = async () => {

    setError("");
    setLoading(true);

    try {
      if(email != "" && password != "" && email.includes("@")){
        if (isRegistering) {
            await auth.createUserWithEmailAndPassword(email, password);
            await AsyncStorage.setItem(DRINKING_KEY, email);
        } else {
            await auth.signInWithEmailAndPassword(email, password);
            await AsyncStorage.setItem(DRINKING_KEY, email);
        }
        setError("");
        setLogged(true);

      }else{
        setError("The Spaces arew empty or wrongly format");
      }
    } catch (err) {
      if (isRegistering) {
          setError("You cannot register right now, please try later");
        } else {
          setError("Wrong username or password");
        }
        setLogged(false);
    } finally {
        setLoading(false);
   
    }
  };

  const handleSignOut = async () => {

    setError("");
    setLoading(true);

    try {
        auth.signOut();
        await AsyncStorage.removeItem(DRINKING_KEY);
        setEmail("");
        setPassword("");
    } catch (err) {
      setError("Something went wrong");
    } finally {
        setLoading(false);
        setLogged(false);
    }
  };


  const logginIn = () => {
    setIsRegistering(!isRegistering);
  }

  return(
    <>{logged ? (
      <View style={styles.container}>
      <HomeScreen />
      <TouchableOpacity onPress={handleSignOut} style={styles.btn}>
          <Text style={styles.subtitle}>LogOut</Text>
        </TouchableOpacity>
      </View>
     ) : (
    <View style={[styles.container, {margin: 30}]}>
        <View style={styles.divider}></View>
        <TextInput placeholder="email" placeholderTextColor="#C0C0C0" style={[styles.normalText, styles.input]} defaultValue={email} onChangeText={setEmail}/>
        <TextInput placeholder="password" placeholderTextColor="#C0C0C0" secureTextEntry={true} style={[styles.normalText, styles.input]} defaultValue={password} onChangeText={setPassword}/>
        <TouchableOpacity style={[styles.btn, adult ? null : {backgroundColor: "#100117"}]} onPress={handleEmailAuth} disabled={!adult}>
          <Text style={styles.subtitle}>{isRegistering ? "Register" : "Log in"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logginIn}>
          <Text style={styles.subtitle}>{isRegistering ? "Already have an account? Access to Log in here!" : "No account yet, wanna log in?"}</Text>
        </TouchableOpacity>
        <View style={[styles.container, {backgroundColor: "#290142", borderRadius: 10, margin: 10}]}>
        <Text style={styles.title}>Are you at least 19+ years old?</Text>
        <Switch value={adult} onValueChange={()=> setAdult(!adult)} style={{alignSelf: "center"}}></Switch>
        <Text style={[styles.normalText, {fontSize: 10}]}>By activating this and loggin in you legally accept to be an adult in your country or region. This app does not promote the market of alcohol to minors</Text>
      </View>
        {error ? <Text style={[styles.normalText,{color: 'red'}]}>{error}</Text> : null}
        {logged ? <>
          <Text style={[styles.normalText,{color: 'green'}]}>User {email} is register</Text> 
        </>
        : null}
    </View>
    )}
    </>
  )
}

