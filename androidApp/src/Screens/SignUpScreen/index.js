import {StyleSheet, Text, View, ImageBackground, TextInput} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {globalCss} from '../../Utils/CSS';
import CustomButton from '../../components/CustomButton';
import {GLOBALCOLOR} from '../../Utils/globalColor';

const SignUpScreen = ({navigation}) => {
  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(15, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <View
      style={[
        globalCss.colBetweenCenter,
        {
          flex: 1,
          backgroundColor: '#fff',
          paddingBottom: 30,
        },
      ]}>
      <ImageBackground
        source={require('../../assets/icons/BubblesGroupSignUpScreen.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={{marginTop: '50%', paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 50,
              color: '#202020',
              fontFamily: 'Raleway-ExtraBold',
              lineHeight: 60,
            }}>
            Create{'\n'}Account{' '}
          </Text>
        </View>
      </ImageBackground>

      <View style={{paddingHorizontal: 20}}>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, {setSubmitting}) => {
            // same shape as initial values
            // const actionResult = await dispatch(
            //   createUserAsync({
            //     fullName: values.fullName,
            //     email: values.email,
            //     password: values.password,
            //   }),
            // );
            // if (
            //   actionResult.payload.success === false &&
            //   actionResult.payload.msg === 'User Already Exist'
            // ) {
            //   Alert.alert(actionResult.payload.msg);
            //   values.email = '';
            // }
            // if (
            //   actionResult.payload.success === true &&
            //   actionResult.payload.msg === 'Sign Up Successful'
            // ) {
            //   Alert.alert(actionResult.payload.msg);
            //   navigation.navigate('SignInScreen');
            // }
            // setSubmitting(false);
            // console.log(values);
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <View>
              <View style={{marginBottom: 10}}>
                <TextInput
                  style={[
                    globalCss.textInput,
                    {placeholderTextColor: 'red', color: 'green'},
                  ]}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  placeholder="Full Name"
                  placeholderTextColor={'#202020'}
                  keyboardType="default"
                />

                {errors.fullName && touched.fullName ? (
                  <Text style={globalCss.validationText}>
                    {errors.fullName}
                  </Text>
                ) : null}
              </View>

              <View style={{marginBottom: 10}}>
                <TextInput
                  style={[globalCss.textInput]}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Your Email"
                  placeholderTextColor={'#202020'}
                  keyboardType="email-address"
                />

                {errors.email && touched.email ? (
                  <Text style={globalCss.validationText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={{marginBottom: 10}}>
                <TextInput
                  style={[globalCss.textInput]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  placeholderTextColor={'#202020'}
                  keyboardType="default"
                  secureTextEntry={true}
                />

                {errors.password && touched.password ? (
                  <Text style={globalCss.validationText}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>

              {/* <Button
                color={'#2f2cd8'}
                onPress={handleSubmit}
                title="Sign Up"
                disabled={isSubmitting}
              /> */}

              <View style={[globalCss.rowBetweenCenter, {marginTop: 20}]}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '900',
                    color: '#7184ad',
                    fontFamily: 'Nunito-Regular',
                  }}>
                    
                  Already Have an Account ?
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '900',
                    color: '#0d6efd',
                    textDecorationLine: 'underline',
                    fontFamily: 'Nunito-Regular',
                  }}
                  onPress={() => navigation.navigate('LogInScreen')}>
                  Sign In
                </Text>
              </View>

              <View style={[globalCss.rowBetweenCenter, {marginTop: 20}]}>
                <View style={globalCss.flexRow}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Nunito-Regular',
                      fontWeight: '900',
                      color: '#7184ad',
                    }}>
                    Skip To Home Tab
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '900',
                      color: `${GLOBALCOLOR.blueDark}`,
                      textDecorationLine: 'underline',
                      marginLeft: 10,
                      fontFamily: 'Nunito-Regular',
                    }}
                    onPress={() => navigation.navigate('HomeScreen')}>
                    Click Here
                  </Text>
                </View>

                {/* <Text>
                  <ActivityIndicator
                    animating={usersRedux?.isLoading}
                    color={'#131129'}
                    size={'small'}
                  />
                </Text> */}
              </View>

              <View style={{marginTop: 20}}>
                <CustomButton
                  title="Sign Up"
                  onPress={() => Alert.alert('Cancel Button Pressed!')}
                  width={'100%'}
                  height={50}
                  backgroundColor={GLOBALCOLOR.bluePrimary}
                  textColor={GLOBALCOLOR.white2}
                  fontFamily="Nunito-Regular" // Make sure the font is linked and available
                  fontSize={18}
                  titleWeight={500}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight / 2,
    // justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    // textAlign: 'center',
    // backgroundColor: '#000000c0',
  },
});
