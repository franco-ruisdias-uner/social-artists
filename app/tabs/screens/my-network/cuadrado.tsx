import {StyleSheet, View} from 'react-native'

import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

const COLORS = ['#b58df1', '#fa7f7c', '#ffe780', '#82cab2'];
export default function Cuadrado() {
  const colorIndex = useSharedValue(1);
  const altura = useSharedValue(100);
  const position = useSharedValue(100);

  const tapGesture = Gesture.Tap()
      .numberOfTaps(1)
      .onEnd(() => {
        if (colorIndex.value > COLORS.length) {
          colorIndex.value = colorIndex.value % 1 === 0 ? 1 : colorIndex.value % 1;
        }

        const nextIndex = Math.ceil(colorIndex.value + 1);
        colorIndex.value = withTiming(nextIndex, {duration: 100});
        // altura.value = withTiming(altura.value + 100, {duration: 100});
        position.value = withTiming(position.value + 100, {duration: 100});
      })
      .onStart(() => {
        console.log('Tap started')
      })

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
        colorIndex.value,
        [0, ...COLORS.map((_, i) => i + 1), COLORS.length + 1],
        [COLORS[COLORS.length - 1], ...COLORS, COLORS[0]]
    ),
    height: altura.value,
    top:position.value
  }));

  return (
      <GestureDetector gesture={tapGesture}>
        <Animated.View style={[styles.box, animatedStyle]}>

        </Animated.View>
      </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 200,
    borderRadius: 20,
    backgroundColor: COLORS[0],
  },
});