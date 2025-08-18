// simple text input wrapper
import React from 'react';
import { TextInput, View } from 'react-native';
import { InputStyles } from './InputStyles';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  testID?: string;
};

export const Input: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  testID,
}) => {
  return (
    <View style={InputStyles.wrap}>
      <TextInput
        testID={testID}
        accessibilityLabel={testID}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={InputStyles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />
    </View>
  );
};
