import React from "react";
import Chat from "@/assets/svg/chat.svg";
import Education from "@/assets/svg/education.svg";
import Love from "@/assets/svg/guidance_heart.svg";
import Solar from "@/assets/svg/solar_planet-broken.svg";
import Tarrot from "@/assets/svg/taroot.svg";
import { NavigationBottomTab } from "../NavigationBottomTab/NavigationBottomTab";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store";

interface Props {
  currentRoute: string;
  handleTabPress: (route: string) => void;
}

export const AppBottomTab: React.FC<Props> = ({
  currentRoute,
  handleTabPress,
}) => {
  if (currentRoute === "MainApp") return null;

  return (
    <NavigationBottomTab
      tabs={[
        {
          name: "Home",
          Icon: Solar,
          label: "اليوم",
          onPress: () => {
            console.log("Go Home");
            handleTabPress("OnBoardingScreen");
          },
        },
        {
          name: "Profile",
          label: "التوافق",
          Icon: Love,
          onPress: () => console.log("Go Profile"),
        },
        {
          name: "Chat",
          label: "الدردشة",
          Icon: Chat,
          onPress: () => console.log("Go Chat"),
        },
        {
          name: "Tarrot",
          label: "التاروت",
          Icon: Tarrot,
          onPress: () => console.log("Go Tarrot"),
        },
        {
          name: "Education",
          label: "التعليم",
          Icon: Education,
          onPress: () => console.log("Go Education"),
        },
      ]}
    />
  );
};
