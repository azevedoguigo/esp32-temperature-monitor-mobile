import { LinearGradient } from "expo-linear-gradient";
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
      <LinearGradient colors={["#2563EB", "#1E40AF"]} className="rounded-full p-4">
        <Text>
          <View 
            className="flex items-center justify-center bg-black rounded-full w-52 h-52"
          >
            <Text className="text-zinc-200 text-4xl">
              { temperature ? temperature : "--" } ºC
            </Text>
            <Text className="text-zinc-200 text-lg mt-3">Temperatura ambiente</Text>
          </View>
        </Text>
      </LinearGradient>
    </View>
  );
}
