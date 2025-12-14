import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";

export default function LogoutButton() {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // optionally navigate to login or reset state
      // navigationRef.navigate("LoginScreen");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} color="#ff4d4d" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});
