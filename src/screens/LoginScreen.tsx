import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Keyboard,
} from 'react-native';
import { useTheme } from '@/hooks';
import { Colors, FontSize } from '@/theme/Variables';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '@/components';

export default function LoginScreen() {
  const { Images, Layout } = useTheme();
  const refUsername = useRef<any>(null);
  const refPassword = useRef<any>(null);
  const [secure, setSecure] = useState(true);
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const handleChangeForm = (name: keyof typeof formState, value: any) => {
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const topBoxPosition = useRef(new Animated.Value(200)).current;

  // @ts-ignore
  const onSubmitLogin = formLogin => {
    return;
  };

  const keyboardWillShow = useCallback(() => {
    return Animated.timing(topBoxPosition, {
      toValue: 70,
      useNativeDriver: false,
      duration: 300,
    }).start();
  }, [topBoxPosition]);

  const keyboardWillHide = useCallback(() => {
    return Animated.timing(topBoxPosition, {
      toValue: 200,
      useNativeDriver: false,
      duration: 300,
    }).start();
  }, [topBoxPosition]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardWillShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardWillHide,
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [keyboardWillHide, keyboardWillShow]);

  return (
    <View>
      <ImageBackground style={Layout.fullSize} source={Images.background} />
      <KeyboardAvoidingView
        style={[Layout.fullSize, { position: 'absolute' }]}
        behavior={'padding'}
      >
        <Image
          style={[
            Layout.fullWidth,
            {
              position: 'absolute',
              top: 20,
              left: 0,
              right: 0,
              height: 100,
            },
          ]}
          source={Images.logo.logoDetail}
          resizeMode={'contain'}
        />
        <Animated.View
          style={[
            Layout.colCenter,
            {
              position: 'absolute',
              right: 20,
              left: 20,
              top: topBoxPosition,
              backgroundColor: Colors.white,
              padding: 40,
              borderRadius: 16,
            },
          ]}
        >
          <View style={Layout.colCenter}>
            <Text style={styles.textLogin}>Đăng Nhập</Text>
            <Text style={styles.textSubLogin}>Xin chào Blameo-er!</Text>
          </View>

          <View style={[Layout.fullWidth, { marginTop: 28 }]}>
            <View>
              <Text style={styles.textSubLogin}>
                Email <Text style={{ color: Colors.globalRed }}>*</Text>
              </Text>
              <TextInput
                style={[Layout.fullWidth, styles.textInput]}
                onChangeText={text => handleChangeForm('username', text)}
                value={formState.username}
                placeholder={'Vui lòng nhập email'}
                returnKeyType="next"
                onSubmitEditing={() => refUsername.current?.focus()}
                selectionColor={Colors.subText}
              />
            </View>

            <View style={[Layout.fullWidth, styles.inputWrap]}>
              <Text style={[styles.textSubLogin, { marginTop: 24 }]}>
                Mật khẩu
              </Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => handleChangeForm('password', text)}
                  value={formState.password}
                  placeholder={'Vui lòng nhập mật khẩu'}
                  returnKeyType="done"
                  onSubmitEditing={() => refPassword.current?.focus()}
                  secureTextEntry={secure}
                  selectionColor={Colors.subText}
                />
                <TouchableOpacity
                  style={styles.btnSecure}
                  onPress={() => setSecure(!secure)}
                >
                  {secure ? (
                    <Image
                      style={styles.eyeBtnStyle}
                      source={Images.icons.eyeInVisible}
                    />
                  ) : (
                    <Image
                      style={styles.eyeBtnStyle}
                      source={Images.icons.eyeInVisible}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Button
              stylesBtn={[Layout.fullWidth, styles.btnStyles]}
              textLoading={'Đang xác thực'}
              onPress={() => onSubmitLogin(formState)}
            >
              <Text style={styles.textLoginBtn}>Đăng nhập</Text>
            </Button>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  textLogin: {
    fontSize: FontSize.fontXXXII,
    fontWeight: 'bold',
  },
  textSubLogin: {
    color: Colors.subText,
    marginTop: 12,
    fontSize: FontSize.fontXIV,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 30,
    backgroundColor: 'red',
  },
  textInput: {
    fontSize: FontSize.fontXVI,
    fontWeight: '700',
    height: 32,
    borderBottomWidth: 2,
    borderBottomColor: Colors.divider,
  },
  textError: {
    color: Colors.globalRed,
    textAlign: 'left',
    width: '100%',
    marginTop: -20,
  },
  inputWrap: {
    position: 'relative',
  },
  eyeBtnStyle: {
    width: 24,
    height: 24,
  },
  btnSecure: {
    position: 'absolute',
    right: 0,
  },
  btnStyles: {
    height: 56,
    fontSize: 20,
    fontWeight: 700,
    marginTop: 24,
    backgroundColor: Colors.mainColor,
  },
  textLoginBtn: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
