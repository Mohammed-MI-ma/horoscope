import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useRTL } from "@/contexts/RTLContext";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

//_Components
import BackgroundGradient from "@/components/feature/BackgroundGradient/BackgroundGradient";
import CelebritySearch from "@/components/feature/CelebritySearch/CelebritySearch";
import { NotificationsDropDown } from "@/components/atomic/NotificationsDropDown/NotificationsDropDown";
import { FamousPeopleWithSunIn } from "@/components/atomic/FamousPeopleWithSunIn/FamousPeopleWithSunIn";
import AnimatedContainer from "@/components/atomic/AnimatedContainer/AnimatedContainer";
import UserInfos from "@/components/feature/UserInfos/UserInfos";
import PressableMoti from "@/components/atomic/PressableMoti/PressableMoti";
import CardGridItem, {
  CardItem,
} from "@/components/atomic/CardGridItem/CardGridItem";
import { DarkModeToggle } from "@/components/atomic/DarkModeToggle/DarkModeToggle";

import { useAppFont } from "@/hooks/useAppFont";
import { MotiView } from "moti";

import { useThemeColors } from "@/constants/themeUtils";
import { AssetsProvider, useAssets } from "@/contexts/AssetsContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { welcome_Assets } from "@/images";
import { useFeaturedZodiacCelebrities } from "@/hooks/useFeaturedZodiacCelebrities";
import COIN from "@/assets/svg/reshot-icon-euro-coin-R37EAGHK9Z.svg";
import { Button } from "native-base";

//__Types
import { OnBoardingScreenProps } from "@/types/types";

//__Styling
import { GetTipsButton } from "@/components/feature/GetTipsButton/GetTipsButtonContoller";
import Logo from "@/components/atomic/Logo/Logo";
import LogoutButton from "@/components/feature/LogoutButton/LogoutButton";
import { useDispatch } from "react-redux";

function OnBoardingScreenContent({ navigation }: OnBoardingScreenProps) {
  const NUM_COLUMNS = 2;
  const CARD_MARGIN = 10;
  const { t }: { t: TFunction } = useTranslation();
  const { isRtl } = useRTL();
  const dispatch = useDispatch();
  const fontFamily = useAppFont();
  const boldFont = useAppFont("bold");
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const CARD_SIZE =
    (windowWidth - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  const { textColor } = useThemeColors();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, isError, refetch } = useFeaturedZodiacCelebrities();
  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch(); // calls the API once
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const { loadedAssets } = useAssets() as {
    loadedAssets: typeof welcome_Assets;
  };

  const cards: CardItem[] = [
    {
      id: "card1",
      label: t("insights.relationship.title"),
      subtitle: t("insights.relationship.subtitle"),
      delay: 0,
      imageUri: loadedAssets.love,
    },
    {
      id: "card2",
      label: t("insights.emotional_needs.title"),
      subtitle: t("insights.emotional_needs.subtitle"),
      delay: 100,
      imageUri: loadedAssets.loveto,
    },
    {
      id: "card3",
      label: t("insights.how_others_see_you.title"),
      subtitle: t("insights.how_others_see_you.subtitle"),
      delay: 200,
      imageUri: loadedAssets.sitting,
    },
    {
      id: "card4",
      label: t("insights.emotional_needs.title"),
      subtitle: t("insights.emotional_needs.subtitle"),
      delay: 300,
    },
  ];

  const handleSeeMore = () => {
    navigation.navigate("WishlistScreen");
  };

  return (
    <MotiView
      from={{ opacity: 0.75 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 350 }}
      style={{ flex: 1 }}
    >
        <BackgroundGradient>
          {/* Header */}

          <View
            style={{
              backgroundColor: "#ffffff0a",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,0.12)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
                marginHorizontal: 10,
              }}
            >
              <Logo loadedAssets={loadedAssets} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <GetTipsButton onPress={() => {}} />
                <DarkModeToggle />
                <NotificationsDropDown />
                <LogoutButton />
              </View>
            </View>
            <CelebritySearch onSelect={() => {}} />
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 10,
                borderRadius: 5,
                padding: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                // Shadow for iOS
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                // Shadow for Android
                elevation: 3,
              }}
            >
              <View
                style={{
                  flex: 3,
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamily,
                    marginBottom: 4,
                    color: "#333",
                  }}
                >
                  اشترِ العملات <COIN width={20} height={20} />
                  الآن واستمتع بالمميزات الحصرية!
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    color: "#555",
                    marginBottom: 4,
                    fontFamily: fontFamily,
                  }}
                >
                  كل عملة تمنحك طرقًا أكثر لتجربة التطبيق والاستفادة من المزايا
                  الخاصة
                </Text>
                <Button
                
                >
                  Buy
                </Button>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingRight: 10,
                }}
              >
                <Image
                  source={require("@/assets/images/undraw_credit-card_t6qm.png")}
                  style={{
                    width: 70,
                    height: 70,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            refreshing={refreshing} // <-- add this
            onRefresh={onRefresh} // <-- add this
            numColumns={NUM_COLUMNS}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <CardGridItem
                item={item}
                size={CARD_SIZE}
                loadedAssets={loadedAssets}
                onPress={(id) => console.log("Pressed:", id)}
                delay={item?.delay + 1000}
              />
            )}
            ListHeaderComponent={
              <>
                {/* Floating planet */}
                <Image
                  source={{ uri: loadedAssets.planet1 }}
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                    position: "absolute",
                    top: windowHeight / 2,
                    left: -100,
                    transform: [{ translateY: 40 }],
                  }}
                />
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <AnimatedContainer
                    fromY={-100}
                    duration={600}
                    stagger={150}
                    delay={50}
                  >
                    {/* Title */}
                    <UserInfos navigation={navigation} />
                    <View style={{ width: "100%" }}>
                      <FamousPeopleWithSunIn
                        cards={data ?? []}
                        isLoading={isLoading || refreshing}
                        isError={isError}
                        refetch={refetch}
                      />
                    </View>
                  </AnimatedContainer>

                  <AnimatedContainer
                    fromY={100}
                    duration={600}
                    stagger={150}
                    delay={50}
                  >
                    <Text
                      style={{
                        color: textColor,
                        fontSize: 25,
                        fontFamily: boldFont,
                        textAlign: "center",
                        marginBottom: 12,
                        marginTop: 40,
                      }}
                    >
                      {t("whatWouldYouLike")}
                    </Text>
                    {/* See more */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Image
                        source={{ uri: loadedAssets.logo }}
                        style={{ width: 50, height: 20 }}
                        resizeMode="contain"
                      />

                      <PressableMoti onPress={handleSeeMore}>
                        <Text
                          style={{
                            fontFamily: boldFont,
                            color: textColor,
                            fontSize: 12,
                            textDecorationLine: "underline",
                          }}
                        >
                          {t("see_more")}
                        </Text>
                      </PressableMoti>
                    </View>
                    <View></View>
                  </AnimatedContainer>
                </View>
              </>
            }
          />
        </BackgroundGradient>
    </MotiView>
  );
}

/* ────────────────────────────────────── */

export default function OnBoardingScreen(props: OnBoardingScreenProps) {
  return (
    <AssetsProvider
      assetsToLoad={welcome_Assets}
      fallback={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ marginTop: 12, color: "white" }}>
            Loading assets...
          </Text>
        </View>
      }
    >
      <OnBoardingScreenContent {...props} />
    </AssetsProvider>
  );
}
