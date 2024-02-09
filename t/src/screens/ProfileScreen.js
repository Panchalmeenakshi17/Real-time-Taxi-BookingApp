import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomIcon from '../components/CustomIcon'

const ProfileScreen = () => {
  return (
   <>
   <View style={{ marginTop:30, flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('TabNavigator')}}>
        <CustomIcon name="left"  size={25} marginTop={6} marginLeft={8} color="black"/>
      </TouchableOpacity>
      <Text style={{ fontFamily: 'Montserrat-SemiBold', marginLeft:'33%', fontSize: 21, flexDirection: 'row',  }}>
        Profile
      </Text>

    </View>
<View>
      <TouchableOpacity style={{ flexDirection:'row', justifyContent:'center', backgroundColor:'#ffffff00', borderRadius:150,marginLeft:'33%',marginTop:'2%', height:140, width:140, borderColor:'black'}}>
      <Image
        source={require('../assets/app_images/p.jpg')}
        style={styles.backgroundImage}
      />
      </TouchableOpacity>
        </View>
        <View>
          
        </View>

   </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  backgroundImage:{
    width:'80%',
    height:'80%',
    alignContent:'center',
     
      },

})