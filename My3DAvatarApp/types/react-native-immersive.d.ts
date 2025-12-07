declare module 'react-native-immersive' {
  interface Immersive {
    fullLayout: (enabled: boolean) => void;
    setBarMode: (mode: 'BottomSticky' | 'LeanBack' | 'Sticky') => void;
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
  }

  const Immersive: Immersive;
  export default Immersive;
}
