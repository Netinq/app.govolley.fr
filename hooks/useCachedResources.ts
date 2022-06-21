import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect, useState } from 'react';
import * as Store from 'expo-secure-store'
import { AuthContext } from "../components/Context";

export default function useCachedResources() {
  
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { logout } = useContext(AuthContext);
  
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const userToken = await Store.getItemAsync('jwt')
        let headers = new Headers();
        headers.append("app-token", "LKauPZ7PSJ3Ze2NQpQGMgkjqPcesnjDR");
        headers.append("user-token", userToken || "");
        headers.append("Content-Type", "application/json");
      
        const options = {
          method: 'GET',
          headers: headers,
        }
      
        fetch("https://dev.govolley.fr/auth/checkToken", options)
          .then(response => response.json())
          .then(async (result) => {
            if (result.error) {
              logout()
            }
          })
          .catch(error => console.log('error', error))
        
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'franklin-gothic': require('../assets/fonts/FranklinGothic.ttf'),
          'franklin-gothic-medium': require('../assets/fonts/FranklinGothicMedium.ttf'),
          'calibri': require('../assets/fonts/CalibriRegular.ttf'),
          'calibri-bold': require('../assets/fonts/CalibriBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
