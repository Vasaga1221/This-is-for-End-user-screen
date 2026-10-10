import React, { useState } from 'react';

interface ReactNativeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReactNativeExportModal: React.FC<ReactNativeExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'app' | 'screens' | 'setup'>('app');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedFile(label);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const appTsxCode = `/**
 * Aura Salon — Cross-Platform React Native App (iOS & Android)
 * Designed for Expo SDK 51+ & React Navigation v6
 */
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Screens
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { BookingScreen } from './screens/BookingScreen';
import { PassScreen } from './screens/PassScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: 'rgba(30, 20, 36, 0.1)',
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#1E1424',
        tabBarInactiveTintColor: 'rgba(30, 20, 36, 0.45)',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="spa" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={CatalogScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={PassScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={CatalogScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-outline" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={AuthScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#fff9ef' : undefined}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#fff9ef' },
            animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
          }}
        >
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Catalog" component={CatalogScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Pass" component={PassScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}`;

  const screensCode = `/**
 * React Native Cross-Platform Screens Example
 * Full implementation supporting both iOS & Android
 */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';

export function BookingSummaryCard({ service, total, onConfirm }) {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>MAISON DE BEAUTÉ LUXE</Text>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.meta}>150m (2.5 hrs) • Master Art Director Aarav Mehta</Text>
      
      <View style={styles.divider} />
      
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Grand Total (Incl. GST)</Text>
        <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
      </View>

      <TouchableOpacity style={styles.ctaButton} onPress={onConfirm} activeOpacity={0.88}>
        <Text style={styles.ctaText}>Confirm & Book via Instant UPI ›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(30, 20, 36, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#1E1424',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  kicker: {
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: 'rgba(30, 20, 36, 0.5)',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1424',
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
    color: 'rgba(30, 20, 36, 0.7)',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(30, 20, 36, 0.08)',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 13,
    color: '#1E1424',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 18,
    color: '#1E1424',
    fontWeight: '700',
  },
  ctaButton: {
    backgroundColor: '#1E1424',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});`;

  const setupCode = `# 1. Create a fresh TypeScript Expo app
npx create-expo-app AuraSalon --template blank-typescript

# 2. Navigate to project
cd AuraSalon

# 3. Install core cross-platform navigation & UI packages
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install @expo/vector-icons expo-font expo-status-bar

# 4. Optional: Add Google Fonts Playfair Display & DM Sans
npx expo install @expo-google-fonts/playfair-display @expo-google-fonts/dm-sans

# 5. Start development server (supports iOS Simulator, Android Emulator, and Expo Go physical device)
npx expo start

# Press 'i' to open iOS Simulator (macOS)
# Press 'a' to open Android Emulator / Connected Android Device
# Scan QR with Expo Go on your iPhone or Android phone!`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#19111e] border border-stone-700 text-stone-100 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-[#150d1a]">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
              RN
            </span>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                React Native Architecture (iOS & Android)
              </h2>
              <p className="text-xs text-stone-400">
                Production-ready cross-platform codebase matching the 5 screens
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 pt-3 pb-2 bg-[#120a17] border-b border-stone-800 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('app')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'app'
                ? 'bg-[#C59B7D] text-[#1E1424]'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            App.tsx (Navigation & Root)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('screens')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'screens'
                ? 'bg-[#C59B7D] text-[#1E1424]'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Components & Styles (iOS/Android)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('setup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'setup'
                ? 'bg-[#C59B7D] text-[#1E1424]'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Setup Guide & CLI Commands
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 flex-1 overflow-y-auto custom-scrollbar font-mono text-xs">
          {activeTab === 'app' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-400">App.tsx — Navigation Container & Tabs</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(appTsxCode, 'App.tsx')}
                  className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-sans font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">content_copy</span>
                  <span>{copiedFile === 'App.tsx' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="bg-black/60 p-4 rounded-xl border border-stone-800 text-emerald-400 overflow-x-auto leading-relaxed">
                {appTsxCode}
              </pre>
            </div>
          )}

          {activeTab === 'screens' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-400">Card & Screen Patterns with Platform.select()</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(screensCode, 'Screens')}
                  className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-sans font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">content_copy</span>
                  <span>{copiedFile === 'Screens' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="bg-black/60 p-4 rounded-xl border border-stone-800 text-amber-200 overflow-x-auto leading-relaxed">
                {screensCode}
              </pre>
            </div>
          )}

          {activeTab === 'setup' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-400">Terminal Commands for iOS & Android Execution</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(setupCode, 'Setup')}
                  className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-sans font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">content_copy</span>
                  <span>{copiedFile === 'Setup' ? 'Copied!' : 'Copy Commands'}</span>
                </button>
              </div>
              <pre className="bg-black/60 p-4 rounded-xl border border-stone-800 text-sky-300 overflow-x-auto leading-relaxed">
                {setupCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#150d1a] flex justify-between items-center">
          <div className="flex items-center gap-2 text-stone-400 text-xs font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Supports iOS (Metal, Safe Area) & Android (Material 3, Edge-to-Edge)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-sans font-semibold cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
