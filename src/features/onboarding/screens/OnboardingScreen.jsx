import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AppIntroSlider from "react-native-app-intro-slider";
import { LinearGradient } from "expo-linear-gradient";

import bgImg1 from "@assets/images/onboardingimg1.jpg";
import bgImg2 from "@assets/images/onboardingimg3.jpg";
import bgImg3 from "@assets/images/onboardingimg4.png";

import colors from "@theme/colors";

import AppButton from "@shared/components/ui/AppButton";

import AsyncStorage from "@react-native-async-storage/async-storage";

import GradientButton from "@shared/components/ui/GradientButton";

import { useDispatch, useSelector } from "react-redux";

import { onBoardingStyle } from "./onBoardingStyle";
import { checkFirstLaunch } from "../../../store/slices/appSlice";

const slides = [
  {
    key: "one",
    title: "Build Your IPL Dream Squad",
    text: "Enter a live auction. Bid smart. Secure your players before others do",
    image: bgImg1,
    // backgroundColor: "",
  },
  {
    key: "two",
    title: "Build Your IPL Dream Squad",
    text: "Enter a live auction. Bid smart. Secure your players before others do",
    image: bgImg1,
    // backgroundColor: "",
  },
];

export default function OnboardingScreen({ navigation }) {
  const isFirstLaunch = useSelector((state) => state.app.isFirstLaunch);

  const dispatch = useDispatch();

  const sliderRef = useRef(null);

  const handleNext = async (index) => {
    if (index < slides.length - 1) {
      sliderRef.current.goToSlide(index + 1, true);
    } else {
      // Instead of setIsFirstLaunch

      await dispatch(checkFirstLaunch());
    }
  };

  const handleSkipFn = async () => {
    // Instead of setIsFirstLaunch
    await dispatch(checkFirstLaunch());
  };
  const renderItem = ({ item, index }) => {
    return (
      <>
        <StatusBar style="light" />
        <ImageBackground
          source={item.image}
          style={onBoardingStyle.backgroundImg}
          resizeMode="cover" // 'cover', 'contain', or 'stretch'
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,1)"]} // top transparent → bottom dark
            style={[
              onBoardingStyle.gradient,
              index === 0 ? styles.firstSlide : styles.normalSlide,
            ]}
          />
          {index !== 0 ? (
            <View style={onBoardingStyle.skipContainer}>
              <TouchableOpacity onPress={handleSkipFn}>
                <Text style={onBoardingStyle.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={[
              onBoardingStyle.textContainer,
              index === 0 ? styles.firstSlideTxtCont : null,
            ]}
          >
            <Text style={onBoardingStyle.heading}>{item.title}</Text>
            <Text style={onBoardingStyle.text}>{item.text}</Text>

            <GradientButton
              style={onBoardingStyle.button}
              title={index === slides.length - 1 ? "Get Started" : "Next"}
              onPress={() => handleNext(index)}
            />
          </View>
        </ImageBackground>
      </>
    );
  };

  const onDone = () => {
    navigation.replace("MainApp");
  };

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={false}
      showNextButton={false}
      showDoneButton={false}
      dotStyle={{ display: "none" }}
      activeDotStyle={{ display: "none" }}
    />
  );
}

const styles = StyleSheet.create({
  firstSlide: {
    bottom: 260,
    height: "50%",
  },
  normalSlide: {
    bottom: 0,
  },

  firstSlideTxtCont: {
    backgroundColor: "rgba(0,0,0,1)",
  },
});
