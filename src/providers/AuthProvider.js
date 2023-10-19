import { useReducer } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthReducer } from '../reducers/AuthReducer';
import { eShopApiUrl } from '../config/eShopApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { types } from '../types/types';

const initialState = {
  user: null,
  isLogged: false,
  isLoading: true,
  errorMessage: '',
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //   LOGIN DE USUARIO
  const login = async (email, password) => {
    try {
      const { data } = await eShopApiUrl.post('auth/login', {
        email,
        password,
      });

      await AsyncStorage.setItem('tokenAuth', data.token);
      dispatch({
        //type: types.auth.login,
        type: types.auth.login,
        payload: {
          user: data,
        },
      });
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data.errores[0];
      dispatch({
        //type: types.auth.logout,
        type: types.auth.error,
        payload: {
          errorMessage: msg,
        },
      });
    }
  };

  //   REVALIDAR TOKEN
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenAuth');

      if (!token) {
        dispatch({
          type: types.auth.logout,
        });
      }
      const { data } = await eShopApiUrl.get('auth/revalidatetoken');
      console.log(data);

      dispatch({
        type: types.auth.login,
        payload: {
          user: data,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.auth.logout,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};
