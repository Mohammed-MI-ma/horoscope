import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

type Sexe = "male" | "female" | "other";

export default function UserProfileScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [timeOfBirth, setTimeOfBirth] = useState<Date | null>(null);
  const [sexe, setSexe] = useState<Sexe>("male");
  const [country, setCountry] = useState("");

  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onValidate = () => {
    const payload = {
      username,
      email,
      dob,
      timeOfBirth,
      sexe,
      country,
    };

    console.log("PROFILE DATA:", payload);
    // send to backend here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Profile</Text>

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDobPicker(true)}
      >
        <Text>
          {dob ? dob.toDateString() : "Select date of birth"}
        </Text>
      </TouchableOpacity>

      {showDobPicker && (
       <></>
      )}

      {/* Time of Birth (Optional) */}
      <Text style={styles.label}>Time of Birth (optional)</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>
          {timeOfBirth
            ? timeOfBirth.toLocaleTimeString()
            : "Select time of birth"}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
       <></>
      )}

      {/* Sexe */}
      <Text style={styles.label}>Sexe</Text>
      <View style={styles.pickerWrapper}>
     
      </View>

      {/* Country */}
      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Enter country"
      />

      {/* Validate Button */}
      <TouchableOpacity style={styles.button} onPress={onValidate}>
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: "center",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
