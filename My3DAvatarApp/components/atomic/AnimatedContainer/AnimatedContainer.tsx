import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { Easing } from "react-native-reanimated";

interface StaggeredAnimatedContainerProps extends ViewProps {
  children: React.ReactNode[];
  fromY?: number;       // starting vertical offset
  duration?: number;    // animation duration per child
  delay?: number;       // delay before first child animates
  stagger?: number;     // delay between children
  style?: any;
}

const StaggeredAnimatedContainer: FC<StaggeredAnimatedContainerProps> = ({
  children,
  fromY = 20,
  duration = 400,
  delay = 0,
  stagger = 100,
  style,
  ...props
}) => {
  return (
    <AnimatePresence>
      <View style={style} {...props}>
        {React.Children.map(children, (child, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: fromY }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: fromY / 2 }}
            transition={{
              type: "timing",
              duration,
              delay: delay + index * stagger,
              easing: Easing.out(Easing.cubic), // smooth fade + slide
            }}
          >
            {child}
          </MotiView>
        ))}
      </View>
    </AnimatePresence>
  );
};

export default StaggeredAnimatedContainer;
