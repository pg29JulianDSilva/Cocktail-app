import React, {useState, useEffect, useRef} from 'react';
import { XYZ } from './types';
import { styles } from './styles';
import {Drink, ALCOHOL, CARBONATED, ORGANIC} from './types';

import { 
  Text, 
  View,
  Image,
  Vibration,
  Platform,
} from 'react-native';

import {
  Accelerometer,
} from "expo-sensors";

enum ShakingTime {
  NONE = 0,
  SPECIAL = 5,
  SHAKING = 15,
  STRIRRING = 40
}

const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

export default function ShakingScreen({data}: {data: Drink}){
  const [accel, setAccel] = useState<XYZ>({x:0, y:0, z:0});
  const [active, setActive] = useState(true);

  const [time, setTime] = useState(0);
  const [requiredTime, setRequiredTime] = useState<number>(ShakingTime.STRIRRING);

  const shake = time >= requiredTime;

  useEffect(() => {
  const list: string[] = [];
  
  for (let x = 0; x < Object.keys(data).length; x++) {
    if (Object.keys(data)[x].includes("strIngridient")) {
      list.push(Object.values(data)[x]);
    }
  }

  let found = false;

  list.forEach(ingridient => {
    ORGANIC.forEach(organic => {
      if (ingridient.toLowerCase().includes(organic.toLowerCase())) { 
        setRequiredTime(ShakingTime.SHAKING);
        found = true;
      }
    });

    if (!found) {
      CARBONATED.forEach(carbonated => {
        if (ingridient.toLowerCase().includes(carbonated.toLowerCase())) { 
          setRequiredTime(ShakingTime.SPECIAL);
        }
      });
    }
  });

}, []);

    const accelRef = useRef(accel);

    useEffect(() => {
      if(!active) return;
      Accelerometer.setUpdateInterval(50);
      const sA = Accelerometer.addListener(setAccel);
      return () => {sA.remove();};
    }, [active])

    useEffect(() => {
      accelRef.current = accel;
    }, [accel]);

    useEffect(() => {
      const interval = setInterval(() => {
        const { x, y, z } = accelRef.current;
        const g = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

        if (g < 0.90 || g > 1.20) {
          setTime((t) => t + 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const isReady = () => Vibration.vibrate(1000);

    return(
      <View style={styles.container}>
      <Text style={styles.normalText}>The Timmer will show you the time you need to shake it and it will buzz when it is over.</Text>
      <Text style={styles.normalText}>Start whenever you want!</Text>
      <Image style={styles.image} source={require('../assets/nebel969-cocktail-shaker-4721378_1920 (1).png')} />
      <Text style={styles.subtitle}>
        {time}
      </Text>
      <Text style={styles.subtitle}>
      {shake ? "Your drink is ready, stop shaking it!": "" }
      {shake ? isReady(): null }
      </Text>
      <Separator />
      </View>
    )
  }

