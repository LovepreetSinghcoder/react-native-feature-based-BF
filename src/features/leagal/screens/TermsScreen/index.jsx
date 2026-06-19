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

const TermsScreen = ({ navigation }) => {
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
          title={"Terms of Use "}
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
          {`LeagueX Terms of Use 
Last Updated : May 2026

This App is owned and operated by LeagueX. LeagueX provides cricket games to users, where users are invited to build and act as owners of virtual squads (constituted of real players participating in the Indian Premier League ("IPL")) that compete against virtual squads of other users ("Game(s)").

The terms 'LeagueX', or 'us' or 'we' (unless the context of use suggests otherwise) refer to the LeagueX in its capacity as the owner of this App and the operator of the Game. The term 'you' or 'user(s)' refers to the user or viewer of our App and participants in the Games.

By browsing, viewing or using the App or participating in the Games provided thereon you consent to and agree to comply with these terms and conditions of use ("Terms" or "Terms of Use").

LeagueX provides the Games subject to the notices, terms, and conditions set forth in these Terms of Use. In addition, when you participate in any of the Games, you will be subject to any more specific rules, guidelines, policies, terms, and conditions that are brought to your attention in the course of playing such specific Game, each of which will be deemed to be incorporated into these Terms of Use by reference. The LeagueX reserves the right to change or modify the App, the Games, the contents thereof and these Terms of Use at any time. All modifications will be posted on the App and will become effective immediately upon such posting to the App. Please review these Terms of Use regularly to remain informed of any updates and changes.

ACCESSING OR OTHERWISE USING THE APP OR REGISTERING FOR THE GAMES INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS IN THESE TERMS, AS MODIFIED FROM TIME TO TIME. THEREFORE, PLEASE READ THESE TERMS CAREFULLY BEFORE PROCEEDING.


Would you like me to summarize the key points or translate this text into another language?

1. Registration
A. You may participate in the Game on the App after registering and creating an account with the App. The App and services offered thereon are available to the residents of India. Any person located outside India is not permitted to register on the App, access or use the services offered thereon or provide personal information to us.

B. Additionally, by registering you are confirming that you have read and agree to these Terms of Use.

C. The information sought at the time of registration may include your mobile number, full name, email, date of birth, country of residence, state of residence and address. You hereby consent to provide us with such information and agree/accept that we may transfer such information from your country or jurisdiction to other countries or jurisdictions around the world in accordance with applicable law in India, including the Digital Personal Data Protection Act, 2023.

D. You agree to provide true, accurate and current information for the purpose of creating the account at the time of registration and agree to maintain the accuracy and truth of such information during the course of using the App  and/or participating in the Games. Users further agree to update and keep updated their user account information at all times.

2. App Content
A. All materials, including illustrations, marks, statements, opinions, written content, views, photographs, player profiles, products, images, artwork, designs, text, graphics, logos. button icons, images, flash animations, links, audio and video clips and software which is hosted by third party (collectively, "Content") are protected by copyrights, trademarks and other intellectual property rights that are owned and controlled by us, or by other parties that have licensed their material to us. Except where otherwise agreed in writing with the LeagueX in writing, material on the App and Games is solely for your personal, non-commercial use. You must not copy, reproduce, republish, upload, post, transmit or distribute such material in any way, including by e-mail or other electronic means, whether directly or indirectly, and you must not assist any other person to do so without the prior written consent of the LeagueX, modification of the materials, use of the materials on any other web site or networked computer environment or use of the materials for any purpose other than personal, non-commercial use is a violation of these Terms as well as copyrights, trademarks and other proprietary rights, and is prohibited. To clarify, any use for which you receive any remuneration, whether monetary or otherwise, is a commercial use for the purposes of this clause.

B. This App may contain user generated content provided by third parties, including (without limitation) other users. Responsibility for such content is solely that of the authors/contributors/posters and such content is not endorsed in any manner by the LeagueX. The LeagueX shall not be responsible for or liable in any manner whatsoever for the content provided by such authors/contributors/posters in any section of this App. Further, the accuracy of the content has not been verified by the
LeagueX and we provide no warranties with respect to the same. If you seek to rely on any third party or user generated representation of information contained on this App, any such reliance shall be at your own risk.

C. The user is responsible for any content, picture, logo, emblem or other materials posted or transmitted to the App in the course of availing the Games. You hereby grant us a worldwide, royalty free, irrevocable, non-exclusive, transferable, assignable and sub-licensable license to use any content posted by you or published by the LeagueX, in any part of the world, or to be used for any reason by the LeagueX, including for the creation of derivative works that might include such content, consistent with these Terms, and you are not entitled to any payment or other compensation for such use.

3. Provision of Games
A. The LeagueX enables users to build and act as owners of virtual squads (constituted of real players from IPL franchisees) that compete against virtual squads of other users, with points attributed to the virtual players and, in aggregate, to the virtual squads on the basis of the performance of the real players in matches of the IPL.

B. THE GAMES ARE PROVIDED TO USERS FOR FREE WITHOUT THE PAYMENT OF ANY FEE OR CHARGE FOR PARTICIPATION.

C. LeagueX reserves the right, to be exercised at its sole and absolute discretion, to :
i. Deactivate or delete a user's account and all related information and files on the account;
ii. Suspend, terminate or otherwise restrict a user's access to all or any part of the App or the Games;
iii. Change, alter or amend the terms, format or conditions of the Games or the whole of or any part of the App or the Games.

D. Squad Selection for all Formats of the Game
i. Users may draft virtual squads composed of 11 players from the pool of real-world players made available for selection on this App and the format of the Game and such virtual squads shall be attached to their user account. The selection and drafting of the virtual squad of each user shall be subject to the constraints set out below. Each player made available for selection and drafting into the virtual squad will be attributed a price, categorized on the basis of (1) nationality (either as an 'overseas' or 'Indian' player), (2) playing role (either as a 'batter', 'all-rounder, 'wicketkeeper' or 'bowler', (3) engagement with an IPL, franchisee.
ii. The attribution of a price to each player made available for selection, and/or the classification of such player into a particular role based category, and/or any other attributes or classifications of the player, is subject to the sole and absolute discretion of the LeagueX, and the LeagueX reserves the right to alter, modify or change the price or classification of each player, and/or remove such player from the roster of available players for selection from time to time at its sole and absolute discretion.
iii. For the purposes of the selection and drafting or a virtual squad, each user shall be provided with a total of 1000 credits. When drafting a virtual squad, the user must operate within this budget and must draft 11 players to form the virtual squad. The squad selection process must also ensure compliance with the following stipulations :
1. For LeagueX 
a. 3 (minimum) to 6 (maximum) players classified as 'batters';
b. 1 (minimum) to 4 (maximum) players classified as 'all-rounders';
c. 1 (minimum) to 4 (maximum) players classified as 'wicket-keepers';
d. 3 (minimum) to 6 (maximum) players classified as 'bowlers'.
iv. Overseas Limit
1. For LeagueX, no virtual squad can contain more than 4 'overseas' players, at any given time.
v. Franchisee Spread no virtual squad can contain more than 7 players from a single IPL franchisee (team), at any given time.
vi. Additionally, users can designate a player within their virtual squads as a 'Captain', and the points attributed to such players at the end of each matchday of the 'LeagueX' shall be doubled. A user must also designate a player as a 'Vice-Captain', and the user will receive 1.5 times the points attributed to such player at the end of each matchday. Subject to these Terms, users may change or designate another player within their virtual squad as the 'Captain' & 'Vice-Captain' at any time prior to the commencement of a matchday or match of the LeagueX game. Any changes to the designated Captain or Vice-Captain made during the course of any matchday/match will only take effect for the next matchday.
vii. The user can edit his/her virtual team till the start of the official start time of the match.
viii. In the event of more than one virtual squad having the same cumulative score at the conclusion of the LeagueX, the winner will be decided on the basis of points collected  by the 'Captain' of the competing virtual squads. If the virtual squads have the same 'Captain' (or the 'Captains' have the same points), then the virtual squad with the 'Vice-Captain' having higher score shall be declared a winner. In the event of virtual squads having the same 'Captain' and 'Vice-Captain' (or the 'Captain' and the 'Vice-Captain' have the same points), the winner will be the virtual squad that was submitted first.
ix. Boosters - Users will have the option to use the following six (6) boosters Except Wildcard and Free Hit, all other boosters can be used twice :
1. Triple Captain : The captain now receives triple points instead of the regular double for a match.
2. Wildcard : Allows unlimited transfers within a 1000-credit budget for a match.
3. Double Power : The entire team receives double points for a match.
4. Free Hit : Enjoy unlimited transfers with no budget restrictions for a match. After the match, your team reverts to the previous line up.
5. Overseas Stars : All overseas players playing in the current team receive double points for a match.
6. Indian Warriors : All Indian players playing in the current team receive double points for a match.
7. Batting Blitz : All batsmen now receive double points instead of the regular single for a match.
8. All-Rounder : All-Rounders now receive double points instead of the regular single for a match.
9. Game Changer : You can now select 2 Captains, each receives two points for a match.

E. LeagueX (Season Long)
i.
a. The LeagueX Game format runs for the duration of the IPL, with points attributed to each player selected in the virtual squad on the basis of their performance in each match of the IPL. For participation in the LeagueX Game format, each user account shall be permitted to draft one squad alone.
b. At the end of the LeagueX, the winner will be determined on the basis of the accumulated points of each participating virtual squad, with the winning virtual squad being the virtual squad that accumulates the most number of points relative to the other participating users' virtual squads.
c. The LeagueX format of the Game will be offered by the LeagueX in the following League, wherein each participating user's virtual squad will be automatically placed into the Global League - which shall comprise the virtual squads of all participating users (of the LeagueX format).
d. Restrictions on transfers : 
In this format of the Game, users may substitute players within their virtual squads, within the constraints set out as follows :
I. Before the user joins the LeagueX Game, the user can make unlimited changes to their virtual squad.
II. Users joining the LeagueX Game before Match 1 can make 200 transfers until Match 70, which is the end of the league stage.
III. Users joining at any given point of time throughout the tournament will get 200 transfers until match 70.
IV. After the commencement of match 70 and before the commencement of 'Qualifier 1', users can again make unlimited transfers and changes.
V. After the commencement of 'Qualifier 1' and before the commencement of the 'Final', users can make 10 transfers.
VI. A user can make unlimited "Captain" and "Vice-Captain" changes throughout the duration of the LeagueX.
VII. It is clarified that while a user is permitted to make transfers and replacements during the course of any match of the IPL, all such transfers and replacements shall only take effect for the next match. Only transfers or replacements that take place before the commencement of the match will take effect for such a match.
e. In case of any abandonment of a match for any reason, the following consequences follow :
1. If a match is abandoned before it begins,
a. If a match is abandoned anytime, the system will behave as if the match has ended.
b. Transfers and Booster deducted for the abandoned match will not be refunded.
c. If a match has gone live and points are accrued, points received until the match has been abandoned will be retained.
f.If a match is abandoned after it begins,
I. if a match is abandoned anytime, the system will behave as if the match has ended.
II. Transfers and Booster deducted for the abandoned match will not be refunded.
III. If a match gone live and points are accrued, points received until the match has been abandoned will be retained.

F. In addition, users may elect to participate in invitational "Private Leagues', as set out herein below :
The private league Game format is available to participating users of the LeagueX Game and this format shall run for the duration of the IPL season.

ii. In this format, any user can create a private league, the private league shall be allotted a unique room code which may be obtained from any member of the league. Other users may participate in such private leagues by entering the unique room code.
iii. All rules and stipulations as to squad selection, duration and substitution, as applicable to the LeagueX Game format, shall be applicable to each private league created in this format. The user, acting through such user's account, shall not be entitled or permitted to draft a new virtual squad for participation in any league under this format of the Game, and shall use the same virtual squad as drafted and attached to such user's account for participation in the LeagueX Game format.
iv. It is clarified that no user shall be entitled to claim or demand any fee or charge for participation in any league created by such user or where such user participates, and no person shall be entitled to any prize or payment for participating in and/or being declared the winner of any such league.
v. A user can create and join into a maximum of 20 such Private Leagues. Participation in more than 20 such leagues shall be automatically prohibited.
vi. The creator of the private league or administrator of the league has the option to remove users who have joined the league. Though, the admin can only remove users from the league before they have started accumulating points post joining the league In the event the administrator of the league decides to leave the league, the next user who has joined the league will automatically be appointed as the administrator.

4. Rewards & Achievements 
A. The Platform is intended solely for entertainment, social interaction, and skill-based sports engagement among users. Participation in any game format, leaderboard, league, or other activity made available through the Platform is strictly for non-commercial and non-monetary purposes. The Platform does not offer, facilitate, or distribute any cash prizes, monetary rewards, betting winnings, entry-fee based payouts, or any form of financial compensation to users for participation, rankings, performance, or victories achieved within the Platform.

B. Users may create, join, and participate in public or private leagues for the purpose of friendly competition, score tracking, statistical comparison, and leaderboard rankings only. Any points, rankings, achievements, or recognitions displayed on the Platform are purely symbolic, carry no monetary value, and may not be redeemed, transferred, exchanged, or converted into cash, or any real-world benefit.

C. The Platform does not support or promote gambling, wagering, betting, or paid-entry contests of any nature. Users are prohibited from independently collecting entry fees, staking money, or offering monetary incentives in connection with any league, or activity conducted through the Platform.

D. The Platform reserves the right, at its sole discretion and without prior notice, to introduce, modify, suspend, restrict, or discontinue any gameplay feature, leaderboard system, league format, virtual recognition mechanism, or contest-related functionality at any time.

5. Warranty and Liability Disclaimer
A. The LeagueX is constantly endeavouring to improve the quality of the Games provided to you on the App. Due to this, the form and nature of Games provided may change from time to time without any prior notice to you. The LeagueX  reserves the right to introduce and initiate new features, functionalities, components to the App and Games and/or change, alter, modify, suspend, discontinue or remove the existing ones without any prior notice to you. Further, LeagueX is entitled to discontinue (either permanently or temporarily) one or more of the formats of the Games provided or terminate the App without any prior notice to you.

B. The LeagueX may also prescribe certain limits on the use of the App and/or Games or storage of content at its sole and absolute discretion without any prior notice to you while at all times complying with the LeagueX's Privacy Policy. In consideration for LeagueX granting you access to and use of the App and Games, you agree that LeagueX and its third-party service providers may place such advertising on the Games or in connection with the display of content or information from the Games, whether submitted by them or others.

C. The App, all the materials and services, included on or otherwise made available to you through this App and the Games is provided by the LeagueX on an "as is" and "as available" basis without any representation or warranties, express or implied except otherwise specified in writing. Without prejudice to the foregoing paragraph, the LeagueX does not warrant that :
i. This App and Games will be constantly available, or available at all, or
ii. The information on this App is complete, true, accurate or not misleading.

D. User agrees that the LeagueX shall not be responsible to the user where the user is unable to participate in the Game or make changes or substitutions where the App or Games become in-operational or are not accessible by the user for whatever reason.

E. The LeagueX, to the fullest extent permitted by law, disclaims all warranties, whether express or implied, including the warranty of merchantability, fitness for particular purpose and non-infringement. The LeagueX makes no warranties about the accuracy, reliability. completeness, or timeliness of the App, Games, Content, services, software, text, graphics and links.

F. The LeagueX does not warrant (1) that this App, information, content, materials, or Games included on or otherwise made available to you through this App, its servers, or electronic communication sent from by LeagueX are free of viruses or other harmful components or (2) that the same will be available to you uninterrupted, timely or error free or (3) that defects will be corrected.

G. The LeagueX shall not be liable for any injury, loss, claim, loss of data, or loss of opportunity, general damages or any direct, indirect, special, incidental, consequential exemplary or punitive damages of any kind whatsoever arising out of or in connection with your access to, or use of, or inability to access or use, the App and the Games hosted on the App. You further agree to indemnify us and our service providers against any claims in respect of any such matter. Without limiting the generality of the foregoing, you specifically acknowledge, agree and accept that the LeagueX and its partners shall not be liable to you for :
i. the defamatory, undesirable or illegal conduct of any other users accessing or using the Games on the App;
ii. any loss whatsoever arising from the use, abuse or misuse of your user account or any feature of our Games on the App;
iii. any technical failures, breakdowns, defects, delays, interruptions, improper or manipulated data transmission, data loss or corruption or communications infrastructure failure, viruses or any other adverse technological occurrences arising in connection with your access to or use of our Games on the App;
iv. the accuracy, completeness of any information services provided on the App;
v. any delay or failure on our part to intimate you where we may have concerns about your activities.

H. Nothing on this App constitutes, or is meant to constitute, advice or opinion of any kind.

6. Accuracy of Information
A. No representation is made, or warranty given as to the completeness or accuracy of any information on this App and/or the Games. The LeagueX makes no representations about the accuracy, reliability, completeness, or timelines of the App or the content. The use of the App and the content is at your own risk. The LeagueX makes no commitment to correct or update this information.

B. The computation and updation of virtual points at the end of each match or round of the IPL, shall be done by the LeagueX. However, the LeagueX does not warrant or make any representations concerning the accuracy or completeness of the tabulation of virtual points (including with respect to the tabulation of the scores with respect to each user's virtual squad) and shall not be responsible or liable for any inaccuracies in the tabulated virtual points and scores or for the declaration of winning users pursuant to any inaccurate or incomplete scores. You agree not to make any claim or raise any complaint against the LeagueX in this respect.

7. Indemnification
A. You represent, warrant and covenant (a) that no materials of any kind provided or uploaded by you to the App and/or the Games will (i) violate, plagiarise, or infringe upon the rights of any third party, including copyright, trademark, privacy or other personal or proprietary rights; or (ii) contain abusive, grossly harmful, harassing, pedophilic, blasphemous, pornographic, racially or ethnically objectionable, disparaging, defamatory, obscene, salacious, lascivious material, material relating or encouraging money laundering or gambling or otherwise unlawful material or (iii) otherwise violate these Terms of Use; and (b) that you (i) are not and will not use the App or participate in the Games for any illegal purpose; or (ii) have not and will not levy any charge or collect a fee from any person to facilitate their participation in the Games, or any part thereof.

B. You hereby agree to indemnify, defend and hold harmless the LeagueX and all of the LeagueX's officers, directors, owners, agents, information providers, affiliates, licensors and licensees, subcontractors and service providers (collectively, the "Indemnified Parties") from and against any and all liability and costs, including, without limitation, reasonable advocate's fees, incurred by the Indemnified Parties in connection with any claim arising out of any breach by you of these Terms or the foregoing representations, warranties and covenants. You shall cooperate as fully required in the defense of any such claim. The LeagueX reserves the right, at its own expense, to assume the exclusive defense and control of any matter subject to indemnification by you.

8. Breach and Termination
A. The LeagueX retains the right to deny access to the App and/or the Games to anyone who it believes has violated any of these Terms of Use or does not accept these Terms of Use.

B. In the event of breach of any of the Terms being evidenced or reasonably ascertained from our investigation or if there is reasonable belief, in our sole and absolute discretion, that your continued access to the App is illegal, or detrimental to the interests of the LeagueX, our other users or the general public or that your intentional actions, either directly or indirectly, caused a malfunction or disruption of the App or Games or any associated infrastructure, we may in our sole discretion take any or all of the following actions :
i. Restrict Games between users suspected of colluding or cheating;
ii. Permanently or temporarily suspend your user account on the App and disqualify you from all Games you have been entered into;
iii. Demand damages for breach and take appropriate civil action to recover such damages; and/or Initiate prosecution for violations that amount to offences in law.

C. Additionally, in the event of committing material breach hereof, we reserve the right to bar you from future registration on the App and/or for the purpose of participating in the Games.

D. The decision of the App on the action to be taken as a consequence of breach shall be final and binding on you. Any action taken by the App shall be without prejudice to our other rights and remedies available in law or equity.

9. Infringement of Copyright
In good faith, if you have reason to believe that any work copyrighted by you has been reproduced, embedded, or linked without any authorization on this App or within any Game, in a manner that constitutes an infringement of your copyright, please compile the following information and email to :  contact.support2023@gmail.com.
a. A clear identification of the copyrighted work allegedly infringed;
b. A clear identification of the allegedly infringing material on the App (with specific URL, reference);
c. Your contact details: name, address, e-mail address and phone number;
d. A statement that you believe, in good faith, that the use of the copyrighted material allegedly infringed on the App is not authorized by your agent or the law;
e. Your signature or a signature of your authorized agent.

10. Applicable Law
This App, including the Content (including content provided by the user) and information contained herein, shall be governed by the laws of the Republic of India and the courts of Chennai, India shall retain exclusive jurisdiction to entertain any proceedings in relation to any disputes arising out of the same. As such, the laws of India shall govern the legal notices, Privacy Policy and Games available on this App.

11. Information Gathered and Tracked
Information submitted on the App is stored in a database. Specifically, we store the name, e-mail address and contact number supplied by users/visitors to our App who wish to receive certain free services from the LeagueX, including but not limited to fixture lists and squad updates. We also use such information to send out occasional promotional materials, including alerts on new Games or services available. The use, collection and disclosure of any Information submitted on the App shall be subject to the privacy policy of the App (accessible here) ("Privacy Policy"). The Platform is intended solely for individuals who are eighteen (18) years of age or older. By accessing or using the Platform, users represent and warrant that they are at least 18 years of age and legally competent to enter into a binding agreement under applicable law. Users below the age of 18 years are strictly prohibited from registering, accessing, or participating in any activity available on the Platform. The Platform reserves the right to suspend or terminate any account found to be associated with a user below the age of 18 years.

12. Sub-Contractors
The LeagueX may engage one or more third party service providers and contractors for the development and operation of the Games and the tabulation of results. In such a case, the LeagueX may share the information submitted on the App to such third-party service providers and shall ensure that such third-party service providers are subject to restrictions concerning data protection and non-disclosure (in relation to any personally identifiable information so transmitted) of a standard not less than as provided in the Privacy Policy. The user hereby consents to the transmission and disclosure of such information to such third parties.

13. Complaints and Grievances
A. If you have a complaint or concern relating to the Games on the App, you should contact the customer support team using the following email address contact.support2023@gmail.com. Complaints should be made as soon as practicable after circumstances arise that cause you to have a complaint.

B. You accept that any complaints and disputes are and remain confidential both whilst a resolution is sought and afterwards You agree that you shall not disclose the existence, nature or any detail of any complaint or dispute to any third party.

C. The customer support team will make efforts to resolve complaints within a reasonable time period. LeagueX's decision on complaints shall be final and binding on you.
`}
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default TermsScreen;
