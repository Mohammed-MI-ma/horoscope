import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  tab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 10, color: '#ffffffff' },
  activeLabel: { color: '#4caf50', fontWeight: 'bold' },
});
