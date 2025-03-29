import { useEffect } from 'react';
import registerNNPushToken from 'native-notify';

/**
 * Custom hook to register the device for push notifications using Native Notify.
 * @param appId - The app ID for Native Notify.
 * @param appToken - The app token for Native Notify.
 */
const useNativeNotify = (appId: number, appToken: string): void => {
  useEffect(() => {
    registerNNPushToken(appId, appToken);
  }, [appId, appToken]);
};

export default useNativeNotify;