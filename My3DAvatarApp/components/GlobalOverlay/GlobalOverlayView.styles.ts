import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  /* ---------------------------------------------
     ROOT OVERLAY
     --------------------------------------------- */

  overlay: {
    ...StyleSheet.absoluteFillObject,

    // Ensures overlay is above everything
    zIndex: 10000,
    elevation: 10000,

    // Prevent accidental layout passes
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  /* ---------------------------------------------
     SAFE AREA CONTAINER
     --------------------------------------------- */

  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    // Prevent touches from passing through
    pointerEvents: "box-none",
  },

  /* ---------------------------------------------
     CARD (LOCKED STATE)
     --------------------------------------------- */

  card: {
    maxWidth: 420,
    width: "100%",

    borderRadius: 24,

    backgroundColor: "#000",

    alignItems: "center",

    paddingVertical: 32,
    paddingHorizontal: 24,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },

    // Elevation (Android)
    elevation: 12,
  },

  /* ---------------------------------------------
     TEXT
     --------------------------------------------- */

  lockIcon: {
    fontSize: 48,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: Platform.select({
      ios: "700",
      android: "bold",
    }),
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },

  text: {
    fontSize: 14,
    lineHeight: 20,
    color: "#CFCFCF",
    textAlign: "center",
  },

  /* ---------------------------------------------
     ASSETS FALLBACK
     --------------------------------------------- */

  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  fallbackText: {
    marginTop: 12,
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.85,
  },
});
