import { Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Image, Alert, Modal, Pressable, Platform } from 'react-native';
import { useState, useEffect } from "react";
import { FetchState, Index, Drink } from './types';
import { styles } from './styles';
import ShakingScreen from './ShakingScreen';
import DrinkScreen from './drink';
import {firestore, firebase} from './firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";

function CocktailFetch({ letter }: Index) {
  const [state, setState] = useState<FetchState<Drink[]>>({status: "idle"});
  const [modalVisible, setModalVisible] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [drink, setDrink] = useState<Drink | null>(null);
  const [userExsist, setUserExsist] = useState<Boolean>(false);
  const [drinksTried, setDrinksTried] = useState<number>(0);

  const DRINKING_KEY = "@class7:user"
  
  const fetchPosts = async () => {
    setState({ status: "loading"});
    try {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter.toLowerCase()}`);
      if(!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      const cocktails: Drink[] = data.drinks;
      setState({status: "success", data: cocktails});

    }catch (err) {
      setState({status: "error", message: (err as Error).message});
    }
  }

  useEffect(() => {
    fetchPosts();
    handleFavDrink();
  }, [letter]);

  const handleFavDrink = async () => {
    try {
      const currentUser = await AsyncStorage.getItem(DRINKING_KEY);
      const currentDrinkList = await firestore.collection("users").get();

      currentDrinkList.docs.map(currentCoctail => {
        if(currentCoctail.data.email === currentUser) setUserExsist(true);
      });

      if(!userExsist){
        await firestore.collection("users").add(
          {email: currentUser,
          numberOfDrinkstried: 0}
        )
      }else{
        currentDrinkList.docs.map(currentCoctail => {
        if(currentCoctail.data.email === currentUser) setDrinksTried(currentCoctail.data.numberOfDrinkstried);
      });
        
      }


    } catch(err){
      setState({status: "error", message: (err as Error).message});
    }
  }


  function handleSelection(sel: Drink) {
    setDrink(sel);
    setModalVisible(true);
    setDrinksTried(drinksTried+1);
  }
          
  if(state.status === "loading") return (
    <View>
      <ActivityIndicator size="large" color="#2E005C"/>
      <Text style={styles.normalText}>
        Looking for the drinks, don't get drunk meanwhile...
      </Text>
    </View>
  );

  if (state.status === "error") return (
    <View>
      <TouchableOpacity onPress={fetchPosts}>
        <Text style={styles.normalText}> Sorry, our bartender got drunk... please try later {state.message}</Text>
        <Text style={styles.normalText}>{letter}</Text>
      </TouchableOpacity>
    </View>
  );

  if (state.status == "success") return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Drink has been closed.');
            setShaking(!shaking);
          }}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              {shaking ?  (<ScrollView>
              <ShakingScreen data={drink} />
              <Pressable
                style={styles.btn}
                onPress={() => setShaking(!shaking)}>
                <Text style={styles.normalText}>{shaking ? "back to the drink" : "Practice the shake?"}</Text>
              </Pressable>
              <Pressable
                style={styles.btn}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.normalText}>Back to the menu</Text>
              </Pressable>
              </ScrollView>) : (<ScrollView>
              <DrinkScreen data={drink} />
              <Pressable
                style={styles.btn}
                onPress={() => setShaking(!shaking)}>
                <Text style={styles.normalText}>{shaking ? "back to the drink" : "Practice the shake?"}</Text>
              </Pressable>
              <Pressable
                style={styles.btn}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.normalText}>Back to the menu</Text>
              </Pressable>
              
              </ScrollView>)}
            </View>
          </View>
        </Modal>
        {state.data.map((cocktail) => (
              <Pressable key={cocktail.idDrink} style={[styles.btn, { flexDirection: "row", justifyContent: "space-evenly"}]} onPress={() => handleSelection(cocktail)}>
                <Text style={[styles.normalText, {maxWidth: 150}]}>{cocktail.strDrink}</Text>
                <Image source={{ uri: cocktail.strDrinkThumb}} style={styles.imageOpt} />
              </Pressable>
        ))}
      </View>

  )
}
  
export default function DrinksScreen({ route }: any){
  const letter = route?.name?.toLowerCase();

  if (!letter) return null; 

  return (
    <ScrollView style={styles.container} contentContainerStyle={Platform.OS === "Android" ? { paddingTop: 2600 } : { paddingTop: 2000 }}>
      <CocktailFetch letter={letter}/>
    </ScrollView>
  );
}


