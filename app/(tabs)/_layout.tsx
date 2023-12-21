import * as React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home Page",
          tabBarIcon: ({ color }) => <AntDesign name="home" size={28} color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => <AntDesign name="infocirlce" size={25} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <AntDesign name="login" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
