import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import styles from "./styles";
import ScreenWrapper from "@layout/ScreenWrapper";
import TopSpacing from "@layout/TopSpacing";
import Header from "@layout/Header";
import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";

const PrivacyScreen = ({ navigation }) => {
  const navigateToBack = () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      <TopSpacing />
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        <Header
          title={"Privacy Policy"}
          leftIcons={
            <Pressable
              onPress={navigateToBack}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}>
              <Ionicons name="arrow-back" size={18} color={colors.white} />
            </Pressable>
          }
        />
        <Text style={styles.termsText}>
          {`

Last Updated : May 2026

At the LeagueX in India, we are committed to respecting the privacy rights of the visitors to our App.

Your privacy is important to us and we aim for our App to be a safe and enjoyable environment for our audience. We respect and safeguard the personally identifiable information ("Personal Information") we receive and collect from you on our App and in the course of our other interactions online.

This Privacy Policy ("Privacy Policy") explains :
what information we may collect about you online;
the use and role of cookies and similar technologies on our App;
how we will protect and use information we collect about and from you;
the circumstances in which we might disclose your details to anyone else;
when we may use your details to contact you, and
how you can be sure the information we hold about you is accurate and current.

INFORMATION GATHERED
In general, you can visit our App without revealing your identity or any Personal Information about yourself. However, you may not be able to access certain areas or services that require registration or need you to reveal your identity and/or other information about you.

Information that we collect from you will vary depending upon the activity you seek to engage in and may include your name, email address, phone number, mobile number, home or other physical address, and date of birth information. In addition, we may collect demographic information such as gender, information about your computer, hardware, software, platform, media, Internet Protocol (IP) address and connection, information about online activity such as feature usage, click paths, and other data that you may provide in surveys or online profiles. We may combine demographic information with Personal Information to tailor our offerings or App to your preferences or interests.

PERSONAL INFORMATION
Personal Information means any information that may be used to identify you and that is not otherwise publicly available, including, but not limited to, your first and last name, home or other physical address, email address, phone number or other contact information.

We may collect Personal Information from you when you register for any of our services or otherwise voluntarily provide such information. If you wish to subscribe to our newsletter(s) and other marketing materials, we will use your name and email address to send the newsletter and materials to you.

COOKIES AND OTHER TRACKING TECHNOLOGIES
Our App may use cookies, device identifiers, analytics tools, and similar tracking technologies to enhance functionality, improve user experience, maintain security, analyze usage patterns, and optimize App performance. These technologies may  collect and process certain technical and usage-related information, including but not limited to device type, operating system, application version, Internet Protocol (IP) address, device identifiers, network information, approximate geographic location, gameplay activity, feature usage statistics, session activity, crash reports, and dates and times of App access.

Some tracking technologies may help the App remember user preferences, maintain login sessions, personalize user experience, and improve overall service quality. Users may manage certain tracking permissions and device settings through their mobile device or operating system settings. However, disabling certain permissions or tracking technologies may affect the availability, performance, or functionality of specific features of the App. Information collected through such technologies may be used for operational, analytical, security, troubleshooting, and performance-related purposes in accordance with the App's Privacy Policy.
CHILDREN
Our services are intended for users aged 18 years or older. We do not knowingly collect personal data from individuals under 18 without appropriate consent. If such data is identified, it will be deleted promptly.

USES OF PERSONAL INFORMATION
We may use Personal Information and other information received and collected from you to provide the services you have requested, including services that display customised content and to contact you upon your request and when otherwise necessary. We may also use Personal Information for auditing, research and analysis, and to operate and improve our services. In certain circumstances, we may share aggregated non-personal information with third parties. When we use third parties to assist us in processing your Personal Information, we require that they comply with our Privacy Policy and any other appropriate confidentiality and security measures. We may also share such information with third parties in limited circumstances, including when complying with legal process, preventing fraud or imminent harm, and ensuring the security of our network and services

Where we propose to use your Personal Information for any other uses, we will ensure that we notify you first. You will also be given the opportunity to withhold or withdraw your consent for use other than as listed above.

CONFIDENTIALITY AND SECURITY
We will keep confidential and protect your Personal Information except where disclosure is required or permitted by law.

We follow generally accepted industry standards to protect the Personal Information submitted to us, both during transmission and, once we receive it, for storage and disposal When you enter sensitive information on our registration or order forms, we encrypt that information using secure socket layer (SSL) technology. All information we gather is securely stored within databases controlled by us. The databases are stored on servers secured behind a firewall, access to the servers is password-protected and is strictly limited. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. We limit access to Personal Information to employees/personnel who we believe reasonably need to come into contact with that information to provide products or services to you or in order to do their jobs.

Third parties provide certain services available on our App and on our behalf. We may provide information, including Personal Information, to third-party service providers to help us deliver our products, information, and services efficiently and effectively. Service providers are also an important means by which we maintain our App and mailing lists. We will take reasonable steps to ensure that these third-party service providers are obligated to protect Personal Information on our behalf through confidentiality agreements and otherwise. We do not intend to transfer Personal Information without your consent to third parties who are not bound to act on our behalf unless such transfer is legally required. Similarly, it is against our policy to sell Personal Information collected online without consent.

If you choose to provide us with your Personal Information, we may transfer that Personal Information from your country or jurisdiction to other countries or jurisdictions around the world. Your Personal Information may be collected and stored on servers located in the territory of India and such other countries as we may disclose from time to time.

THIRD PARTY WEBSITES
If you click on a link to a third-party site or otherwise leave our App, you will go to a website that is outside the purview of our control. Because we cannot control the activities of third parties, we cannot accept responsibility for any use of your Personal Information by such third parties, and we cannot guarantee that they will adhere to the same privacy and security practices as we do. The use of Personal Information by such websites shall be governed by the privacy policies provided therein Therefore, if you visit a third-party website that is linked to our website, you should consult that website's privacy policy before providing any Personal Information.



CONTACTING YOU
We may contact you using the Personal Information you have given us :
in relation to the functioning of any service you have signed up for in order to ensure that we can deliver the services to you;
where you have opted to receive further correspondence;
to invite you to participate in surveys about our services (participation is always voluntary); and
to provide information about our upcoming or new events, products and services, where you have specifically agreed to receive such information.

CHANGE OF CONTROL
In the event that ownership or control of our App was to change, your Personal Information may be transferred. If such a transfer results in a material change in the use of your Personal Information, we will provide notice about the choices you have to decline to permit such a transfer.

ACCURACY
To the extent that you do provide us with Personal Information, we wish to maintain accurate and current Personal Information. Where we collect Personal Information from you on our App, should you need to update or correct that Personal Information, please contact us and we will make reasonable efforts to incorporate the changes in your Personal Information that we hold as soon as practicable.

CONTACT US
If you have any questions, complaints, comments, concerns, feedback or grievances regarding this Privacy Policy or wish to obtain the information we currently hold on you, you can contact us by emailing us at contact.support2023@gmail.com. We will use our best efforts to respond to you or send you the information requested.

CONSENT; AMENDMENTS; & LAW
By using this App, you consent to the terms of this Privacy Policy and to our use and management of Personal Information for the purposes and in the manner herein provided. Should this Privacy Policy change, we intend to take every reasonable step to ensure that these changes are brought to your attention by posting all changes prominently on our App for a reasonable period of time. Your visit and any dispute over privacy are subject to this Privacy Policy. The said Policy shall be governed by and construed in accordance with the laws of the Republic of India. Further, it is irrevocably and unconditionally agreed that the courts of Chennai, India shall have exclusive jurisdiction to entertain any proceedings in relation to any disputes arising out of the same.

LeagueX GAME
With respect to the LeagueX Game offered through the App and any associated mobile application (together, the "LeagueX Game"). please note that the following supplementary terms shall be applicable to any Personal Information submitted thereon.

The LeagueX takes your privacy rights seriously, and in the context of the LeagueX Game, these supplementary terms provide the broad procedure followed by LeagueX to gather, use, store, disclose and manage your personal data. Through these supplementary terms, we would like to explain :
What Personal Information we may collect about you,
How we may use or share this information,
How long we will keep your Personal Information,
Your choices and rights in relation to your Personal Information with us.

These supplementary terms apply to any person who registers with and/or plays, avails any service or participates in any promotion through the LeagueX Game or otherwise accesses the LeagueX Game. These supplementary terms apply in addition to and shall supersede, in case of any conflict, the general terms of this Privacy Policy, the Terms and Conditions governing your usage and access of the App, the LeagueX Game Terms of Use, and any other terms applicable in relation to your access or use of the LeagueX Game or any part thereof. The LeagueX Game, the App and services offered thereon are not available to anyone outside India and any person located outside India is not permitted to provide personal information to us.



Personal Information we may collect about you
For registering and creating an account with the LeagueX Game, we may ask you for the following information about yourself :
Email Address
Full Name
Mobile Number
Date of Birth
State of Residence
Address

In the course of accessing or participating in the LeagueX Game, we may access technical information about your device and mode of access, including :
Nature of Device of access (computer, mobile, etc.)
Internet Protocol Address
Nature of mode of access (broadband, mobile internet, etc.)
Device ID (Serial Number, IMEI Number, etc.)
Device Information (make, manufacturer, memory, etc.)

How may we use or share this information?
The Personal Information and other information collected in the course of your access, registration and/or usage of the LeagueX Game will be available to the LeagueX for collection, use, storage and sharing, and may be used by the LeagueX for the following purposes :

Providing, improving and developing our services :
You consent to the use, storage, processing, disclosure of your Personal Information by us for enabling your access and participation in the LeagueX Game, verifying user accounts, maintaining the accounts of users, completing transactions of the users, for analyzing user behavior and other related requirements, as well as to enable you to participate in any promotion on the LeagueX Game or otherwise access and use the services offered through the LeagueX Game.
We may also use software applications for App traffic analysis, to gather relevant statistics, for advertising purposes and for determining the efficacy and popularity of the LeagueX Game offered through the App.

You consent to the use of your Personal Information for tracking your performance in the LeagueX Game, as well as for calculating, maintaining, and publishing game results and leaderboard rankings. LeagueX may also use aggregated non-personal information for analytical, statistical, operational, and service improvement purposes.

We may also use your Personal Information to deal with your requests, enquiries and complaints in relation to the LeagueX Game, and to improve our services and promotions offered through the LeagueX Game, and to better your experience of the same

Sharing Data :
We may be required to share information received from you, with our employees, agents, service providers and regulatory authorities. We restrict access of personal information to these above-mentioned parties and only allow access to your data on a need-to-know basis in order to process it for providing our services or otherwise if requested by regulatory authorities.

We may also use your name, photographs, login credentials and the state from where you are participating when announcing the results of the LeagueX Game on the App.

Communication :
When you provide your email address on the LeagueX Game, you agree to receive email communication from the LeagueX to send out communications relating to the LeagueX Game. We may contact you through different channels of communication about our service, the services provided by the LeagueX's commercial partners and any other matters that we think may interest you.

We may also share your information with our personnel, commercial partners and service providers for the purpose of enabling your participation in the LeagueX Game and for the purposes set out above.

How long will we keep your Personal Information?
We will hold and keep your Personal Information for as long as needed to complete your usage of the LeagueX Game, and as necessary and appropriate for legal compliance, or to exercise our rights or remedies under law or contract, or for the purposes of our defense in any proceedings instituted against us.

We may retain your Personal Information for historic reference and record of your performance in the contest(s) and promotion(s) (if any) offered through the LeagueX Game.

Your choices and rights in relation to your Personal Information shared with us
You can choose not to share your Personal Information with us, but in such case, we may be unable to provide you with access to the relevant page or part of the LeagueX Game or the service requested by you.

When you submit your Personal Information or otherwise register an account, access the services or participate in any contest or promotion on the LeagueX Game, you hereby consent to the collection, use, storage and sharing of such information for the purposes set out in this Privacy Policy.

Should you have any query on the collection or usage of your Personal Information or wish to correct or update any information that we have on you, please communicate the same to us at : contact.support2023@gmail.com, and we will make good faith efforts to respond to your query or request within a reasonable period of time, provided that such response or action does not : (i) require us to disclose any Personal Information of another user or adversely affect the rights or wellbeing of any other user; (ii) involve disclosure of any confidential, proprietary or sensitive information pertaining to us or any other commercial partners/service providers of the LeagueX, or (iii) adversely affect our rights, remedies or interests or, (iv) violate any applicable law or rights of third parties.
After submitting your Personal Information, you may withdraw your consent for the use, storage, collection, disclosure of your Personal Information, in the manner set forth in this Privacy Policy, by communicating such withdrawal to us at : contact.support2023@gmail.com.

In case of withdrawal, we may be unable to provide you with the services requested by you or permit you to continue to access the LeagueX Game or your account thereon, or participate in any contest, promotion or service for which such Personal Information was collected.

Upon withdrawal of consent, we agree to cease any further usage of your Personal Information, and (if requested in the withdrawal communication) delete any records of your Personal Information, unless such processing is necessary to comply with any legal obligations or to exercise our rights or remedies under law or contract, or for the purposes of our defense in any proceedings instituted against us. The aforesaid reservation shall be available to and shall permit the processing of your Personal Information by the LeagueX or any other LeagueX commercial partner or service provider with whom we share your Personal Information as contemplated by this Privacy Policy.

Additionally, upon your withdrawal of consent and/or submission of a request of deletion of Personal Information, we (or our service provider(s) acting under our instructions) may retain such records of your Personal Information as are necessary for maintaining a historical record of your access and usage of any services, performance in any contest(s) or promotions pursuant to such participation through the LeagueX Game, or which are necessary or appropriate for legal compliance or to exercise our rights or remedies under law or contract, or for the purposes of our defense in any proceedings instituted against us.


`}
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PrivacyScreen;
