import { useBackHandler } from "@/hooks/useBackHandler";
import { LoginScreenProps } from "@/types/Account.types";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
  };

  // 🔥 Intercept physical back button
  useBackHandler(() => {
    triggerExit();
    return true; // stop default navigation
  });

  const triggerExit = () => {
    setVisible(false);

    // Wait for exit animation to finish
    setTimeout(() => {
      navigation.goBack();
    }, 100); // match exit animation duration
  };
  return (
    <AnimatePresence>
      {visible && (
        <MotiView
          key="screen"
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.75 }}
          transition={{ duration: 100 }}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      )}
    </AnimatePresence>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    height: 48,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
