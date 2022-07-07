/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: '/'
        },
      },
      TerrainPage: '/terrainpage',
      Quizz: {
        screens: {
          Step1: '/quizz/step1',
          Step2: '/quizz/step2',
          Step3: '/quizz/step3',
          Step4: '/quizz/step4'
        },
      },
      Terrains: {
        screens: {
          TerrainPage: '/terrain/{uuid}',
          Add: {
            screens: {
              Add: '/terrain/add',
              Temp: '/terrain/add/temp',
              Picture: '/terrain/add/picture',
              PictureValidation: '/terrain/add/pictureValidation',
              Surface: '/terrain/add/surface',
              Number: '/terrain/add/number',
              Final: '/terrain/add/final',
            }
          }
        }
      },
      Auth: {
        screens: {
          Login: '/auth/login',
          Register: '/auth/register'
        }
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
