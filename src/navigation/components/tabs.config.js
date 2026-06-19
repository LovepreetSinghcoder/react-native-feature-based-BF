import HomeScreen from "@features/home/screens/HomeScreen";
import ProfileScreen from "@features/profile/screens/ProfileScreen";

export const TAB_SCREENS = [
  {
    name: "Home",
    component: HomeScreen,
    icon: "home",
  },
  // {
  //   name: "Leagues",
  //   component: LeaguesScreen,
  //   icon: "trophy",
  // },
  // {
  //   name: "Rooms",
  //   component: RoomsScreen,
  //   icon: "layers",
  // },
  // {
  //   name: "Squad",
  //   component: RoomsScreen,
  //   icon: "layers",
  // },
  {
    name: "Profile",
    component: ProfileScreen,
    icon: "person",
  },
];
