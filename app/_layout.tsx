import { useEffect, Component, ReactNode, ErrorInfo, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProfileProvider } from '@/context/UserProfileContext';
import { I18nProvider } from '@/context/I18nContext';
import { NightModeProvider } from '@/context/NightModeContext';
import { StoreService } from '@/services/StoreService';
import { NotificationService } from '@/services/NotificationService';

try { SplashScreen.preventAutoHideAsync(); } catch {}

// ── Error Boundary ─────────────────────────────────────────────────────────────
interface EBState { hasError: boolean; error?: Error }

class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('🔴 [Charif] Crash:', error?.message, info?.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#0A1628', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <Text style={{ color: '#C9A84C', fontSize: 28, marginBottom: 16 }}>Charif</Text>
          <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center' }}>
            {this.state.error?.message ?? 'Erreur de chargement'}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  // Never block more than 4 seconds on fonts
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) setReady(true);
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  useEffect(() => {
    StoreService.configure().catch(() => {});
    if (Platform.OS !== 'web') {
      NotificationService.requestPermissions().then((granted) => {
        if (granted) NotificationService.scheduleEveningCheckin();
      }).catch(() => {});
    }
  }, []);

  if (!ready) return null;

  return (
    <ErrorBoundary>
      <I18nProvider>
        <UserProfileProvider>
          <ThemeProvider>
            <NightModeProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
                <Stack.Screen name="allah-names" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="islamic-thinkers" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="surahs" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="azkar" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="support" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </NightModeProvider>
          </ThemeProvider>
        </UserProfileProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}
