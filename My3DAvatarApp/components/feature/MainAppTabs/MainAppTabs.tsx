import LoginScreen from "@/views/LoginScreen/ui/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function MainAppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={LoginScreen} />
      <Tab.Screen name="Profile" component={LoginScreen} />
      <Tab.Screen name="Chat" component={LoginScreen} />
      <Tab.Screen name="Tarrot" component={LoginScreen} />
      <Tab.Screen name="Education" component={LoginScreen} />
    </Tab.Navigator>
  );
}
