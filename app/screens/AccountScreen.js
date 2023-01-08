import React, {useEffect} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { Button } from "../../components"; 
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { useNavigation } from '@react-navigation/native';
import {Audio} from 'expo-av'

import { auth } from "../../firebase";
import { db } from "../../firebase";
import * as firebase from 'firebase';

import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class AccountScreen extends React.Component {
  useNavigationInClass = () => {
    const navigation = useNavigation();
    return navigation;
  }

  handleSignOut = async () => {
    const navigation = this.useNavigationInClass();

    auth
      .signOut()
      .then(() => {
        // playSound();
        navigation.replace("Welcome");      
      })
      .catch((error) => alert(error.message));
  }

  state = {
    hasGalleyPermission: null,
    image: null,
  }
  
  componentDidMount() {
    this.checkPermission();
  }

  checkPermission = async () => {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState({ hasGalleryPermission: galleryStatus.status === 'granted' }); 
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality:1,
    });

    if (!result.canceled){
      this.setState({ image: result.assets[0].uri })

    }
  }

  render() {

    const { hasGalleryPermission, image } = this.state;

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: "25%" }}
            >

              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>

                {/* signOut Icon */}
                <TouchableOpacity 
                    activeOpacity={0.5}
                    style = {{position: "absolute", left: 315, bottom: 20,}}
                    onPress = {this.handleSignOut}>
                <Image
                    source={require('../assets/imgs/signOutIcon.png')}
                    style={styles.signOutIcon}
                  />

                </TouchableOpacity>


                 <Text style = {styles.signOutText}> Sign out</Text> 

            {/* if user log in with guest account */}

                {auth.currentUser.isAnonymous ? (
                  <Image
                    source={Images.ProfilePicture}
                    style={styles.avatar}
                  />
                  ):(

                    <TouchableOpacity activeOpacity={0.9} onPress={this.pickImage}>
                      <Image
                      defaultSource={Images.ProfilePicture}
                      source={{uri: image}}
                      style={styles.avatar} 
                      />

                      <Image
                        source={require('../assets/imgs/camera_icon.png')}
                        style={styles.camera_icon} 
                      />

                    </TouchableOpacity>

                  )}

                  {hasGalleryPermission === false && <Text> No access to Internal Storage</Text>}
                
                </Block>

                {/* username display */}

                <Block flex>
                  <Block middle style={styles.nameInfo}>
                  {auth.currentUser.isAnonymous && (
                    <Text bold size={28} color="#32325D">
                      Guest
                    </Text>
                  )}

                  {!auth.currentUser.isAnonymous && (
                    <Text bold size={28} color="#32325D">
                      {auth.currentUser.displayName}
                    </Text>
                  )}
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Unknown
                    </Text>
                  </Block>


                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.INFO }}
                    >
                      CONNECT
                    </Button>
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                    >
                      MESSAGE
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        2K
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>
                        Orders
                      </Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        10
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>
                        Photos
                      </Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        89
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>
                        Comments
                      </Text>
                    </Block>
                  </Block>
                </Block>


                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    </Text>
                    <Button
                      color="transparent"
                      textStyle={{
                        color: "#233DD2",
                        fontWeight: "500",
                        fontSize: 16,
                      }}
                    >
                      Show more
                    </Button>
                  </Block>

                  <Block row space="between">
                    <Text
                      bold
                      size={16}
                      color="#525F7F"
                      style={{ marginTop: 12 }}
                    >
                      Album
                    </Text>
                    <Button
                      small
                      color="transparent"
                      textStyle={{
                        color: "#5E72E4",
                        fontSize: 12,
                        marginLeft: 24,
                      }}
                    >
                      View all
                    </Button>
                  </Block>
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))}
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },

  camera_icon: {
    position: "absolute",
    width: 30,
    height: 30,
    left: 75,
    bottom: -5,
  },

  signOutIcon: {
    width: 30,
    height: 30,

  },
  signOutText: {
    color: "black",
    position: "absolute",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.05,
    left: 300,
    bottom: 2,
  },

  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
});

export default AccountScreen;
