import * as Notifications from 'expo-notifications';
import {SchedulableTriggerInputTypes} from 'expo-notifications';
import {Platform} from "react-native";

// Configuración del comportamiento de las notificaciones cuando la app está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface ScheduleNotificationOptions {
  /**
   * Fecha y hora para una notificación única. Si se proporciona `trigger`,
   * este campo se ignora.
   */
  date?: Date;
  title?: string;
  body?: string;
  sound?: boolean;
  /**
   * Trigger avanzado de Expo. Permite programaciones diarias, semanales,
   * mensuales, anuales, por calendario o por intervalo de tiempo.
   * Si se proporciona, se utilizará directamente y se ignorará `date`.
   */
  trigger?:
      | Notifications.DailyTriggerInput
      | Notifications.WeeklyTriggerInput
      | Notifications.MonthlyTriggerInput
      | Notifications.YearlyTriggerInput
      | Notifications.CalendarTriggerInput
      | Notifications.TimeIntervalTriggerInput;
  /**
   * Datos extra para adjuntar en la notificación, accesibles luego en los handlers.
   */
  data?: Record<string, any>;
}

export interface NotificationCallbacks {
  onSuccess?: (notificationId: string) => void;
  onError?: (error: Error) => void;
}


export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const {status: existingStatus} = await Notifications.requestPermissionsAsync();
    let finalStatus = existingStatus
    if (existingStatus !== Notifications.PermissionStatus.GRANTED) {
      const {status} = await Notifications.getPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'default',
      })
    }
    return true;
  } catch (error) {
    console.error('Error al solicitar permisos de notificaciones:', error);
    return false;
  }

}


export const scheduleNotification = async (
    options: ScheduleNotificationOptions,
    callbacks?: NotificationCallbacks
): Promise<string | null> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      const error = new Error('Permisos de notificación no concedidos');
      callbacks?.onError?.(error);
      return null
    }

    // Determinar el trigger según entrada del usuario
    let trigger:
        | Notifications.DailyTriggerInput
        | Notifications.WeeklyTriggerInput
        | Notifications.MonthlyTriggerInput
        | Notifications.YearlyTriggerInput
        | Notifications.CalendarTriggerInput
        | Notifications.TimeIntervalTriggerInput;

    if (options.trigger) {
      // Usar trigger avanzado proporcionado
      trigger = options.trigger;
    } else {
      // Programación única por fecha/hora
      if (!options.date) {
        const error = new Error('Debe proporcionar `date` o `trigger`.');
        callbacks?.onError?.(error);
        return null;
      }
      const now = new Date();
      if (options.date <= now) {
        const error = new Error('La fecha programada debe ser en el futuro');
        callbacks?.onError?.(error);
        return null;
      }
      const triggerTime = Math.floor((options.date.getTime() - now.getTime()) / 1000);

      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: triggerTime,
        repeats: false,
      };


    }

    const content: Notifications.NotificationContentInput = {
      title: options.title || 'Recordatorio de posteo',
      body: options.body || `Es hora de publicar tu post programado`,
      sound: options.sound !== false,
      // badge: badgeCount ? badgeCount + 1 : 1,
      data: options.data ?? {},
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: content,
      trigger: trigger
    })
    callbacks?.onSuccess?.(notificationId);
    return notificationId;
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Error desconocido al programar la notificación');
    callbacks?.onError?.(err);
    console.error('Error al programar la notificación:', error);
    return null;
  }
}