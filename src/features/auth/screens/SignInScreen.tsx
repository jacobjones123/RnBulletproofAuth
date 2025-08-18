// signin screen shell
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { SignInForm } from '../components/SignInForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { testIDs } from '../../../shared/constants/testIDs';

type Props = NativeStackScreenProps<any, 'SignIn'>;

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const { login, isLoading, error } = useAuth();

  const onSubmit = (email: string, password: string) => {
    login(
      { email, password },
      {
        onSuccess: () => {
          navigation.replace('Home');
        },
      },
    );
  };

  return (
    <View
      style={styles.container}
      testID={testIDs.screenSignIn}
      accessibilityLabel={testIDs.screenSignIn}
    >
      <Text style={styles.title}>Welcome</Text>
      <SignInForm
        onSubmit={onSubmit}
        loading={isLoading}
        error={error ? error.message : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
});
