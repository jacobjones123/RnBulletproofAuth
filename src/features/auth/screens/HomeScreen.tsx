// simple home after login
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { testIDs } from '../../../shared/constants/testIDs';

export const HomeScreen: React.FC = () => {
  return (
    <View
      style={styles.container}
      testID={testIDs.screenHome}
      accessibilityLabel={testIDs.screenHome}
    >
      <Text testID={testIDs.welcomeText} style={styles.title}>
        You are signed in 🎉
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: { fontSize: 22, fontWeight: '600' },
});
