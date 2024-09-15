import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {globalCss} from '../../Utils/CSS';
import CustomButton from '../../components/CustomButton';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {loginClientAsync} from '../../Redux/UserSlices/UserAuth';
import {useDispatch} from 'react-redux';

const LogInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const SigninSchema = Yup.object().shape({
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
        style={[styles.image]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <View style={{paddingHorizontal: 20}}>
            <Text
              style={{
                fontSize: 50,
                color: '#202020',
                fontFamily: 'Raleway-ExtraBold',
                lineHeight: 60,
              }}>
              Log In {'\n'}Account{' '}
            </Text>
          </View>

          <View style={{paddingHorizontal: 20}}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SigninSchema}
              onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
                setisLoading(true);
                console.log('values ', values);

                const actionResult = await dispatch(
                  loginClientAsync({
                    email: values.email,
                    password: values.password,
                  }),
                );
                console.log('actionResult -', actionResult.payload);

                if (actionResult.payload.msg === 'Incorrect Email') {
                  // toast.error(actionResult.payload.msg);
                  //  setlogInEmailError(actionResult.payload.msg);
                  values.email = '';
                  Alert.alert(actionResult.payload.msg);
                  setisLoading(false);
                }

                if (actionResult.payload.msg === 'Password Wrong') {
                  // toast.error(actionResult.payload.msg);
                  //  setlogInPasswordError(actionResult.payload.msg);
                  values.password = '';
                  Alert.alert(actionResult.payload.msg);
                  setisLoading(false);
                }

                if (actionResult.payload.msg === 'Logged In Successfull') {
                  values.email = '';
                  values.password = '';
                  Alert.alert(actionResult.payload.msg);

                  const decoded = decodeJWT(actionResult.payload.token);
                  console.log('decoded ', decoded);

                  //  toast.success(actionResult.payload.msg);
                  //  localStorage.setItem(
                  //    'clientLoggedToken',
                  //    actionResult.payload.token,
                  //  );
                  //  window.location.replace('/account');
                  navigation.navigate('LogInScreen');
                  setisLoading(false);
                }

                setSubmitting(false);
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
                        {borderWidth: 1, borderColor: '#202020'},
                      ]}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Your Email"
                      placeholderTextColor={'#202020'}
                      keyboardType="email-address"
                    />

                    {errors.email && touched.email ? (
                      <Text style={globalCss.validationText}>
                        {errors.email}
                      </Text>
                    ) : null}
                  </View>

                  <View style={{marginBottom: 10}}>
                    <TextInput
                      style={[
                        globalCss.textInput,
                        {borderWidth: 1, borderColor: '#202020'},
                      ]}
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
                      Don't Have an Account ?
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '900',
                        color: '#0d6efd',
                        textDecorationLine: 'underline',
                        fontFamily: 'Nunito-Regular',
                      }}
                      onPress={() => navigation.navigate('SignUpScreen')}>
                      Sign Up
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
                      title="Log In"
                      onPress={handleSubmit}
                      width={'100%'}
                      height={50}
                      backgroundColor={GLOBALCOLOR.bluePrimary}
                      textColor={GLOBALCOLOR.white2}
                      fontFamily="Nunito-Regular" // Make sure the font is linked and available
                      fontSize={18}
                      titleWeight={500}
                      indicatorIsLoading={isLoading}
                      indicatorColor={'#fff'}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight / 2,
    flex: 1,
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
