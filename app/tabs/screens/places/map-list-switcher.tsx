import {Pressable, StyleSheet, Text, View} from "react-native";
import {materialColors} from "@utils/colors";
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {sizes} from "@utils/sizes";
import {mapListType} from "@utils/enums";


interface Props {
  typeSelected: mapListType,
  onTypeChanged: (type: mapListType) => void;
}

const PILLS = [{type: mapListType.MAP, label: 'Mapa'}, {type: mapListType.LIST, label: 'Lista'}]

export default function MapListSwitcher(props: Props) {
  const {typeSelected, onTypeChanged} = props;
  const insets = useSafeAreaInsets()


  const onHandlePillPressed = (pillType: mapListType) => {
    onTypeChanged(pillType);
  }

  return (
      <View style={[styles.container, {height: insets.top + 50}]}>
        <View style={[styles.innerContainer, {marginTop: insets.top}]}>
          {
            PILLS.map((pill) => (
                <Pressable key={pill.type} onPress={() => onHandlePillPressed(pill.type)}>
                  <View style={[styles.pill, typeSelected === pill.type && styles.pillSelected]}>
                    <Text
                        style={[styles.textPill, typeSelected === pill.type && styles.textPillSelected]}>{pill.label}</Text>
                  </View>
                </Pressable>
            ))
          }
        </View>

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,

    backgroundColor: `${materialColors.schemes.light.surfaceContainerLow}CC`,
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

    borderColor: materialColors.schemes.light.primary,
    borderWidth: 1,
    borderRadius: 20,
  },
  pill: {
    paddingHorizontal: sizes.defaultPadding.horizontal,
    paddingVertical: 4,
  },
  pillSelected: {
    opacity: 1,
    backgroundColor: materialColors.schemes.light.primary,
    borderRadius: 20,
  },
  textPill: {
    color: materialColors.schemes.light.primary,
  },
  textPillSelected: {
    color: materialColors.schemes.light.onPrimary,
  }
})