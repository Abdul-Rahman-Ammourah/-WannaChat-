import { useState,useEffect } from "react"
import { View,Text,StyleSheet } from "react-native"
import tipsData from "../Assets/Tips/tips.json"

export default function TipsDisplayer() {
    const [randomTip,setRandomTip] = useState('')

    useEffect(()=>{
        const getRandomTip = () => {
            const tips = tipsData.securityTips;
            const randomIndex = Math.floor(Math.random() * tips.length);
            setRandomTip(tips[randomIndex]);
          };
      
          // Get a random tip when the component mounts
          getRandomTip();
      
          // Optional: Update the tip every few seconds (e.g., every 5 seconds)
          const interval = setInterval(getRandomTip, 3500);
      
          // Cleanup interval on component unmount
          return () => clearInterval(interval);
    },[])

    return (
        <View style={styles.container}>
            <Text  style={styles.Text}>{randomTip}</Text>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 15,
    },
    Text: {
      fontSize: 12,
      textAlign: 'center',
      margin: 10,
      
    },
  })