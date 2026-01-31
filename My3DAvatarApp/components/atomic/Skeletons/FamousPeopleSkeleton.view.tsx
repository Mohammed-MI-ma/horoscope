import React from "react";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { styles } from "./FamousPeopleSkeleton.styles";
import { ITEM_SIZE, OVERLAP } from "./FamousPeopleSkeleton.constants";

interface Props {
  items: readonly unknown[];
  colors: readonly string[][];
}

export const FamousPeopleSkeletonView = React.memo(
  ({ items, colors }: Props) => {
    return (
      <View style={styles.container}>
        {items.map((_, i) => (
          <View
            key={i}
            style={[
              styles.itemWrapper,
              i !== 0 && { marginLeft: OVERLAP },
            ]}
          >
            <Skeleton
              width={ITEM_SIZE}
              height={ITEM_SIZE}
              radius={50}
              colors={colors[i % colors.length]}
            />
          </View>
        ))}
      </View>
    );
  }
);

FamousPeopleSkeletonView.displayName = "FamousPeopleSkeletonView";
