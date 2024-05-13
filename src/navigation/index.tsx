import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, SplashScreen, ScheduleScreen, TodoScreen } from "../pages";

export type RootStackParamList = {
  StackScreens: NavigatorScreenParams<StackNavigation>;
};

export type StackNavigation = {
  HomeScreen: undefined;
  SplashScreen: undefined;
  ScheduleScreen: undefined;
  TodoScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const StackNavigationRoute = createNativeStackNavigator<StackNavigation>();

const StackNavigator = () => {
  return (
    <StackNavigationRoute.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigationRoute.Screen name="SplashScreen" component={SplashScreen} />
      <StackNavigationRoute.Screen name="HomeScreen" component={HomeScreen} />
      <StackNavigationRoute.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <StackNavigationRoute.Screen name="TodoScreen" component={TodoScreen} />
    </StackNavigationRoute.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="StackScreens" component={StackNavigator} />
    </RootStack.Navigator>
  );
};
