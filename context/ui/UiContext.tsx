import { createContext } from 'react';

//solamente la definicion del contex y como sera el context que recivira como parametro

interface ContextProps {
    isMenuOpen: boolean;
    toggleSideMenu: () => void;
}


export const UiContext = createContext({} as ContextProps );