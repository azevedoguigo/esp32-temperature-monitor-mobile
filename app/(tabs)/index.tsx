import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [temperature, setTemperature] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const websocket = new WebSocket("ws://192.168.0.108:8080/get-temperature");

    websocket.onopen = () => {
      console.log("Opened websocket connection!");
      setIsConnected(true);
    };

    websocket.onmessage = (e) => {
      setTemperature(e.data);
    };

    websocket.onclose = () => {
      console.log("Closed websocket connection!");
      setIsConnected(false);
    };
  }, []);

  return (
    <View className="flex justify-center items-center h-full">
      <Text>{ temperature }</Text>
    </View>
  );
}
