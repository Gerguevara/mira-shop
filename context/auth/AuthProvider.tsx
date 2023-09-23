import { FC, useReducer, useEffect } from 'react';

import Cookies from 'js-cookie';

import { IUser } from '../../interfaces';
import { authReducer } from './authReducer';
import { tesloApi } from '@/api';
import axios from 'axios';
import { AuthContext } from './Authcontext';
import { useRouter } from 'next/router';
import { useSession, signOut  } from 'next-auth/react';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();
    //context desde nextAuth
    const { data, status } = useSession();

    useEffect(() => {
        // si la session esta activa con el  provider de next auth y ya no esta pendiendien o unAuthorize hace el dispatch de login
        //para poner la informacion del usuario en el estado
        if (status === 'authenticated') {
            console.log( data );
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }
    }, [status, data])

    // useEffect(() => {
    //     checkToken();
    // }, [])

    const checkToken = async () => {

        if (!Cookies.get('token')) return;

        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }



    const loginUser = async (email: string, password: string): Promise<boolean> => {

        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            //determina si hay un error de axios y si es asi cre un custon response error, pero primero verifica si el error
            // ha dido por axios, no por la peticion
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        // Cookies.remove('token');
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        // router.reload();
        signOut();

    }




    return (
        <AuthContext.Provider value={{
            ...state,
            // Methods
            loginUser,
            registerUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
};