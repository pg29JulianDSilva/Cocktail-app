import React, {useState, useEffect, useRef} from 'react';
import { XYZ } from './types';
import { styles } from './styles';

import { 
  Text, 
  View,
  Image,
} from 'react-native';

import {
  Accelerometer,
} from "expo-sensors";


export default function MovementScreen(){
  const [accel, setAccel] = useState<XYZ>({x:0, y:0, z:0});
  const [active, setActive] = useState(true);

  const [time, setTime] = useState(0);

  const accelRef = useRef(accel);

  useEffect(() => {
    if(!active) return;
    Accelerometer.setUpdateInterval(50);
    const sA = Accelerometer.addListener(setAccel);
    return () => {sA.remove();};
  }, [active])

  const gForce = Math.sqrt(accel.x ** 2 + accel.y ** 2 + accel.z ** 2);

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

  return(
    <View style={styles.container}>
    <Text style={styles.normalText}>THIS IS A TEST SCREEN FOR THE SHAKING RELATED TO THE TIME YOU NEED TO SHAKE IT, IT IF YOU SHAKE IT </Text>
    <Image style={styles.image} source={require('../assets/nebel969-cocktail-shaker-4721378_1920 (1).png')} />
     <View><Text style={styles.subtitle}>G-Force {gForce.toFixed(2)}</Text></View>
     <Text style={styles.subtitle}>
      {gForce < 0.90 || gForce > 1.20 ? "Shaking it" : ""}
     </Text>
     <Text style={styles.subtitle}>
      {time}
     </Text>
    </View>
  )
}

