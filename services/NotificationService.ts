import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

console.log('🟦 [NOUR-DEBUG] NotificationService module loaded');

let _handlerSet = false;
function ensureNotificationHandler() {
  if (_handlerSet || Platform.OS === 'web') return;
  try {
    _handlerSet = true;
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
    console.log('🟦 [NOUR-DEBUG] NotificationHandler set OK');
  } catch (e: any) {
    console.log('🔴 [NOUR-DEBUG] setNotificationHandler failed:', e?.message);
  }
}

const EVENING_NOTIF_ID_KEY = 'nour_evening_notif_id';
const EVENING_HOUR = 20;
const EVENING_MINUTE = 0;

export const NotificationService = {
  /** Request permissions. Returns true if granted. */
  async requestPermissions(): Promise<boolean> {
    console.log('🟦 [NOUR-DEBUG] requestPermissions called');
    ensureNotificationHandler();
    if (Platform.OS === 'web') return false;
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log('🟦 [NOUR-DEBUG] notification permission status:', status);
      return status === 'granted';
    } catch (e: any) {
      console.log('🔴 [NOUR-DEBUG] requestPermissions failed:', e?.message);
      return false;
    }
  },

  /**
   * Schedule (or reschedule) the daily 20h evening check-in.
   * Idempotent: cancels existing before rescheduling.
   */
  async scheduleEveningCheckin(): Promise<void> {
    if (Platform.OS === 'web') return;
    try {
      // Cancel previous to avoid duplicates
      await NotificationService.cancelEveningCheckin();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🌙 Défi du soir',
          body: 'Avez-vous relevé votre défi spirituel aujourd\'hui ?',
          data: { type: 'evening_checkin' },
          sound: false,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: EVENING_HOUR,
          minute: EVENING_MINUTE,
        },
      });
    } catch {
      // Notifications not available (Expo Go without dev client, or permission denied)
    }
  },

  async cancelEveningCheckin(): Promise<void> {
    if (Platform.OS === 'web') return;
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      for (const n of scheduled) {
        if ((n.content.data as any)?.type === 'evening_checkin') {
          await Notifications.cancelScheduledNotificationAsync(n.identifier);
        }
      }
    } catch {}
  },
};
