import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalCss} from '../../Utils/CSS';

const SideBar = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F1F2F6'}}>
      <View
        style={[
          styles.dFlex,
          {
            alignItems: 'flex-start',
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 20,
            marginTop: '20%',
          },
        ]}>
        <View
          style={[
            ,
            {display: 'flex', flexDirection: 'column', marginBottom: 20},
          ]}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
              marginBottom: 5,
            }}>
            Ajay Pratap Singh
          </Text>

          <Text style={{fontSize: 13, color: 'black', fontWeight: '500'}}>
            ( Mern Stack & React Native Developer )
          </Text>
        </View>

        <View
          style={[
            ,
            {display: 'flex', flexDirection: 'column', marginBottom: 20},
          ]}>
          <Text style={{fontSize: 13, color: 'black', fontWeight: '400'}}>
            Email -
          </Text>

          <Text style={{fontSize: 15, color: 'black', fontWeight: '600'}}>
            apsinghjobs@gmail.com
          </Text>
        </View>

        <View
          style={[
            ,
            {display: 'flex', flexDirection: 'column', marginBottom: 20},
          ]}>
          <Text style={{fontSize: 13, color: 'black', fontWeight: '400'}}>
            Contact No -
          </Text>

          <Text style={{fontSize: 15, color: 'black', fontWeight: '600'}}>
            +91 7742219565
          </Text>
        </View>

        <View
          style={[
            ,
            {display: 'flex', flexDirection: 'column', marginBottom: 20},
          ]}>
          <Text style={{fontSize: 13, color: 'black', fontWeight: '400'}}>
            website -
          </Text>

          <Text style={{fontSize: 15, color: 'black', fontWeight: '600'}}>
            ajaypratapsingh.online
          </Text>

          <Text
            style={{fontSize: 15, color: 'black', fontWeight: '600'}}></Text>
        </View>

        <View
          style={[
            ,
            {display: 'flex', flexDirection: 'column', marginBottom: 20},
          ]}>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontWeight: '400',
              marginBottom: 10,
            }}>
            Contact us For any kind of Works -
          </Text>

          <Text style={styles.text}>- WebApp Development</Text>

          <Text style={styles.text}>- Android Development</Text>

          <Text style={styles.text}>- IOS Development</Text>

          <Text style={styles.text}>- Website Designing</Text>

          <Text style={styles.text}>- Rest Apis Development</Text>

          <Text style={styles.text}>- Mobile App Ui Development</Text>
        </View>

        <View
          style={[
            ,
            {display: 'flex', flexDirection: 'column', marginBottom: 20},
          ]}>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontWeight: '400',
              marginBottom: 10,
            }}>
            Technologies
          </Text>

          <Text style={styles.text}>- Html , Css , Bootstrap</Text>

          <Text style={styles.text}>- Js , React Js , React Native</Text>

          <Text style={styles.text}>- Redux , Redux Persist</Text>

          <Text style={styles.text}>- Express Js , Node Js</Text>

          <Text style={styles.text}>- Swagger , Sentry</Text>
        </View>

        <View
          style={[
            ,
            {display: 'flex', flexDirection: 'column', marginBottom: 20},
          ]}>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontWeight: '400',
              marginBottom: 10,
            }}>
            Profiles
          </Text>

          <View style={globalCss.flexRow}>
            <View>
              <AntDesign name="linkedin-square" color={'#000'} size={20} />
            </View>
            <Text style={styles.text}> apsingh03 </Text>
          </View>

          <View style={[globalCss.flexRow, {marginTop: 10}]}>
            <View>
              <AntDesign name="github" color={'#000'} size={20} />
            </View>
            <Text style={styles.text}> apsingh03 </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  rootCss: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },

  dFlexBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dFlex: {
    display: 'flex',
    flexDirection: 'row',
  },

  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
  },
});
