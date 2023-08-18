import { FC, ReactNode, useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UiContext } from './UiContext';


export interface UiState {
    isMenuOpen: boolean;
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}


interface Props{
    children: ReactNode
}

// la logica del componente wrapper, las funciones que podra exportar para hacer el cambio de state

export const UiProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }


    return (
        <UiContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
        }}>
            { children }
        </UiContext.Provider>
    )
};