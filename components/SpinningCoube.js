import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  interpolate,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const SIZE = 100.0;

const handleRotation = (progress) => {
  "worklet";
  return `${progress.value * 4 * Math.PI}rad`;
};
export default function SpinningCoube() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      touchX.value = event.translationX;
      touchY.value = event.translationY;
      console.log(event);
    },
    onEnd: () => {
      touchX.value = withSpring(0);
      touchY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: touchX.value }],
    };
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: interpolate(progress.value, [1, 0.5], [0, SIZE / 4]),
      transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
      width: interpolate(touchX.value, [-100, 0, 100], [100, 1, 100], "clamp"),
    };
  }, [progress]);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { height: SIZE, width: 1, backgroundColor: "blue" },
          reanimatedStyle,
        ]}
      ></Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.circle, animatedStyle]}></Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 40,
    width: 100,
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: 50,
  },
});
