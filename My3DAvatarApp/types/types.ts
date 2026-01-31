// navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  ProfileDetails: { cardId: string }; // cardId ici est string, adapte si besoin
};
export interface OnBoardingScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}