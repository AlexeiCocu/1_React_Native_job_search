import React from 'react'
import {View, Text, TouchableOpacity, Linking} from 'react-native'

import styles from './footer.style'
import Image from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedImage";
import icons from "../../../constants/icons";

const Footer = ({url}) => {
  return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.likeBtn}>
              <Image
                  source={icons.heartOutline}
                  resizeMode='contain'
                  style={styles.likeBtnImage}
              />
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => Linking.openURL(url)}
          >
              <Text style={styles.applyBtnText}>Apply for job</Text>
          </TouchableOpacity>
      </View>
  )
}

export default Footer