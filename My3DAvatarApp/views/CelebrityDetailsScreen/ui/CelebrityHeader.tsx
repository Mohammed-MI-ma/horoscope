import React, { memo } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { styles } from "../CelebrityDetailsScreen.styles";
import { useAppFont } from "@/hooks/useAppFont";
import Gemini from "@/assets/svg/gemini.svg";
import { primaryShades } from "@/constants/theme";
import SkiaTest from "@/components/atomic/SkiaTest/SkiaTest";
import { ZodiacScratchCard } from "@/components/atomic/FakeScratchReveal/FakeScratchReveal";
import HeaderBack from "@/components/atomic/HeaderBack/HeaderBack.ui";
import { Button } from "native-base";
import PopCorn from "@/assets/svg/popcorn.svg"; // adjust path
import Dots from "@/assets/svg/tabler_dots.svg"; // adjust path

type Props = {
  width: number;
  height: number;
  imageUrl: string;
};
// ------------------------
// ContentSection component
// ------------------------
const ContentSection = memo(() => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Biography</Text>
      <Text style={styles.sectionText}>
        This is a biography section that scrolls below the header.
      </Text>
    </View>
  );
});
ContentSection.displayName = "ContentSection";

// ------------------------
// CelebrityHeader component
// ------------------------

const CelebrityHeaderComponent = ({ width, height, imageUrl }: Props) => {
  const fontFamily = useAppFont("bold");
  const fontFamilyR = useAppFont();

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={[styles.header, { width, height }]}
      resizeMode="cover"
    >
      <View style={styles.headerOverlay}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            height: 60,
          }}
        >
          <Dots width={30} height={30} />
          <View style={[{ justifyContent: "center", alignItems: "center" }]}>
            <Text style={[styles.headerText, { fontFamily: fontFamily }]}>
              الشاب خالد
            </Text>
            <Text style={[{ fontFamily: fontFamilyR, color: "white" }]}>
              @4540540times requested
            </Text>
          </View>

          <HeaderBack />
        </View>

        {/*<View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              elevation: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Gemini width={30} height={30} />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily,

                  paddingHorizontal: 10,
                }}
              >
                العقرب
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily,

                  paddingHorizontal: 10,
                }}
              >
                العقرب
              </Text>
            </View>
          </View>
          <ZodiacScratchCard
            width={200}
            height={70}
            brushSize={40}
            overlayColor="#b1a9a9ff"
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: primaryShades[600],
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                paddingHorizontal: 20,
                borderWidth: 0.5,
                borderColor: "white",
                overflow: "hidden",
                elevation: 30,
                width: 200,
                height: 70,
              }}
            >
              <Gemini
                width={70}
                height={70}
                style={{ position: "absolute", bottom: 0, left: 0 }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamilyR,
                    color: "white",
                  }}
                >
                  من مواليد برج
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: fontFamily,
                    color: "white",
                  }}
                >
                  العقرب
                </Text>
              </View>
            </View>
          </ZodiacScratchCard>
        </View>*/}
      </View>
      <View style={{ position: "absolute" }}>
        <Image
          source={{ uri: imageUrl }}
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 25,
              marginTop: 30,
            },
          ]}
        ></Image>
        <PopCorn
          width={50}
          height={50}
          style={{
            position: "absolute",
            bottom: 0,
            transform: [{ rotate: "18deg" }, { translateX: 10 }],
          }}
        />
      </View>
    </ImageBackground>
  );
};
CelebrityHeaderComponent.displayName = "CelebrityHeaderComponent";

// Memoized export
export const CelebrityHeader = memo(CelebrityHeaderComponent);

// ------------------------
// ScrollContent component
// ------------------------
export const ScrollContent = memo(() => {
  const profileImageUrl =
    "https://image.tmdb.org/t/p/w500/9o0uBCFg7ridSREaXLvReWzggUz.jpg";

  return (
    <>
      <CelebrityHeader
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT / 3}
        imageUrl={profileImageUrl}
      />

      <ContentSection />
    </>
  );
});
ScrollContent.displayName = "ScrollContent";
