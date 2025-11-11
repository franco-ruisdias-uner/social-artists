import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect, useMemo, useRef, useState} from 'react';
import {baseStyles} from '@utils/base-styles';
import {sizes} from '@utils/sizes';
import LineDivider from '@components/LineDivider';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import Button from '@components/Button';

const TIME_ZONE = 'America/Argentina/Buenos_Aires';

interface Props {
  hidden: boolean,
  onScheduledDate: (date: Date) => void
}

export default function ScheduleSheet(props: Props) {
  const {hidden, onScheduledDate} = props;
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false)
  const [timePicked, setTimePicked] = useState<Date>(new Date())
  const bottomSheetRef = useRef<BottomSheet>(null);


  const formatTime = (dateTime: Date) => {
    return dateTime.toLocaleTimeString('es-AR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  }

  const calcularHora = (minutos: number): Date => {
    const now = new Date();
    return new Date(now.getTime() + minutos * 60 * 1000);
  }

  const dentroDeUnaHora = useMemo(() => {
    return calcularHora(60);
  }, []);

  const dentroDeMediaHora = useMemo(() => {
    return calcularHora(30);
  }, []);


  const handleShowPicker = () => {
    bottomSheetRef.current?.snapToIndex(1);
    setShowTimePicker(true);
  };

  const onScheduleTimePressed = (minutes: number) => {
    switch (minutes) {
      case 30:
        setTimePicked(dentroDeMediaHora);
        onScheduledDate(dentroDeMediaHora);
        break;
      case 60:
        setTimePicked(dentroDeUnaHora);
        onScheduledDate(dentroDeUnaHora);
        break;
      default:
        return;
    }

  }

  const onConfirmCustomTimePressed = () => {
    onScheduledDate(timePicked);
  }

  const handleOnTimePicked = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setTimePicked(date);
    }
  }

  useEffect(() => {
    if (!hidden && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0)
    }
  }, [hidden, bottomSheetRef])

  return (
      <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          snapPoints={['22%', '55%']}
          enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.bottomSheetContentContainer}>
          <View style={styles.itemContainer}>
            <Text style={[baseStyles.textBase, {fontWeight: 700}]}>Programar posteo</Text>
          </View>
          <LineDivider/>
          <View style={[styles.itemContainer]}>
            <Pressable
                onPress={() => onScheduleTimePressed(30)}
                style={({pressed}) => [
                  {opacity: pressed ? 0.5 : 1.0}
                ]}>
              <Text style={[baseStyles.textBase, styles.innerText]}>Dentro de media hora
                ({formatTime(dentroDeMediaHora)})</Text>
            </Pressable>
            <LineDivider innerDivider/>
            <Pressable
                onPress={() => onScheduleTimePressed(60)}
                style={({pressed}) => [
                  {opacity: pressed ? 0.5 : 1.0}
                ]}>
              <Text style={[baseStyles.textBase, styles.innerText, {paddingBottom: 0}]}>Dentro de una hora
                ({formatTime(dentroDeUnaHora)})</Text>
            </Pressable>
          </View>
          <LineDivider/>
          <Pressable
              onPress={handleShowPicker}
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1.0}
              ]}>
            <View style={styles.itemContainer}>
              <Text style={[baseStyles.textBase, styles.personalizedTime]}>Hora personalizada</Text>
            </View>
          </Pressable>
          <View style={[styles.dateTimePickerContainer]}>
            <DateTimePicker
                testID="dateTimePicker"
                value={timePicked}
                mode={'datetime'}
                display='spinner'
                minimumDate={new Date()}
                timeZoneName={TIME_ZONE}
                locale='es-AR'
                onChange={handleOnTimePicked}
            />
            <Button title='Programar posteo' onPress={onConfirmCustomTimePressed}/>
          </View>
        </BottomSheetView>
      </BottomSheet>
  )
}

const styles = StyleSheet.create({
  bottomSheetContentContainer: {
    flex: 1,
  },
  itemContainer: {
    paddingHorizontal: sizes.defaultPadding.horizontal,
    paddingBottom: sizes.defaultPadding.vertical
  },
  innerText: {
    fontSize: 14,
    paddingVertical: sizes.defaultPadding.vertical
  },
  personalizedTime: {
    fontWeight: 400, marginTop: sizes.defaultMargin.vertical
  },
  dateTimePickerContainer: {
    alignItems: 'center',
    paddingBottom: 8
  }
});