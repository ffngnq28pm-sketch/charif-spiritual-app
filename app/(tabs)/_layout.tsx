import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Sun, BookOpen, Heart, Settings, Moon, Compass, GraduationCap, Clock } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';

export default function TabLayout() {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: 'transparent' }],
        tabBarActiveTintColor: colors.textAccent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarBackground: () => <View style={[styles.tabBarBg, { backgroundColor: colors.bgTabBar, borderTopColor: 'rgba(255,255,255,0.06)' }]} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabToday,
          tabBarIcon: ({ color, size }) => <Sun size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: t.tabLibrary,
          tabBarIcon: ({ color, size }) => <BookOpen size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ramadan"
        options={{
          title: t.tabRamadan,
          tabBarIcon: ({ color, size }) => (
            <Moon size={size - 2} color={color} fill={color === colors.textAccent ? color : 'transparent'} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Pratique',
          tabBarIcon: ({ color, size }) => <Compass size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t.tabFavorites,
          tabBarIcon: ({ color, size }) => <Heart size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Savoir',
          tabBarIcon: ({ color, size }) => <GraduationCap size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="salat"
        options={{
          title: 'Salat',
          tabBarIcon: ({ color, size }) => <Clock size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.tabSettings,
          tabBarIcon: ({ color, size }) => <Settings size={size - 2} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    paddingBottom: 16,
    paddingTop: 10,
  },
  tabBarBg: {
    flex: 1,
    borderTopWidth: 1,
  },
  tabLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    letterSpacing: 0.3,
  },
});
