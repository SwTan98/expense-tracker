import { TextInputComponent } from "react-native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login: undefined;
};

export type LoginStackParamList = {
  LoginScreen: undefined,
  RegisterScreen: undefined,
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ItemScreen: undefined;
  EntryScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
};

export type Item = {
  id: string,
  category: string,
  desc: string,
  amount: number,
  type: string,
};