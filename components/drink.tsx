import { Text, View, ScrollView, Image } from 'react-native';
import { Drink } from './types';
import { styles } from './styles';


export default function DrinkScreen({data}: {data: Drink}){
  if(data === null) return null;
  
  return (
    <ScrollView style={[styles.container, {borderRadius: 25}]}>
      <View>
        <Text style={styles.title}>{data.strDrink}</Text>
        <Image source={{ uri: data.strDrinkThumb}} style={[styles.image, {borderRadius: 25}]} />
      </View>
      <View>
      <Text style={styles.subtitle}>How to prepare: </Text>
        <Text style={styles.normalText}>{data.strInstructions}</Text>
        <Text style={styles.subtitle}>Additional Data</Text>
        {Object.entries(data).map(([key, value]) => 
          key !== "idDrink" 
          && key !== "strDrink" 
          && key !== "strDrinkThumb" 
          && key !== "strInstructions"
          && key !== "strInstructionsES"
          && key !== "strInstructionsDE"
          && key !== "strInstructionsFR"
          && key !== "strInstructionsIT"
          && key !== "strInstructionsZH-HANS"
          && key !== "strInstructionsZH-HANT"
          && key !== "strCreativeCommonsConfirmed"  
          && key !== "dateModified"  
          && value !== null ? (<Text style={styles.detailsText}>{key.slice(3)}: {value}</Text>) : null
        )}
        <Text style={styles.subtitle}>Last updated</Text>
        <Text style={styles.normalText}>{data.dateModified}</Text>
      </View>
    </ScrollView>
  );
}

