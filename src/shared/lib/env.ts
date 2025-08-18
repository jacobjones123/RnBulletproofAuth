// platform aware base url
import { Platform } from 'react-native';

const host =
  Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

export const API_URL = host;
