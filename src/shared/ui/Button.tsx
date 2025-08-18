import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { ButtonStyles } from './ButtonStyles';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  loading,
  testID,
}) => {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={testID}
      style={[ButtonStyles.btn, isDisabled && ButtonStyles.btnDisabled]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={ButtonStyles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
