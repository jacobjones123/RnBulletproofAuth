import { StyleSheet } from 'react-native';

export const ButtonStyles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.6 },
  title: { color: 'white', fontSize: 16, fontWeight: '600' },
});
