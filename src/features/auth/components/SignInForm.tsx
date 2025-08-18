// controlled form for email/password
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { testIDs } from '../../../shared/constants/testIDs';

type Props = {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
  error?: string | null;
};

export const SignInForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => onSubmit(email, password);

  return (
    <View>
      <Input
        testID={testIDs.emailInput}
        value={email}
        onChangeText={setEmail}
        placeholder="email@example.com"
        keyboardType="email-address"
      />
      <Input
        testID={testIDs.passwordInput}
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry
      />
      {Boolean(error) && <Text style={styles.err}>{error}</Text>}
      <Button
        testID={testIDs.submitButton}
        title="Sign in"
        onPress={handlePress}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  err: { color: '#DC2626', marginBottom: 12 },
});
