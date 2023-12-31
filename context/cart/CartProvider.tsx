import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct, ShippingAddress } from '@/interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress;
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface Props {
    children: React.ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    // Efecto carga el carrito con aritculos guardados en cookies al iniciar
    useEffect(() => {
        // validacion con try catch por si no la cookie fue manipulada y no se puede parsear, se hace un reset a vacio
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            //  if para evidar doble dispatch cuanto esta en modo desarrollo
            if (cookieProducts[0]) {
                dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
                return;
            }
            // dispatch unicamente al is loaded para que tenga la bandera habilitada
            dispatch({ type: '[Cart] - Set Cart As Loaded' });


        } catch (error) {
            console.log('error');
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);

    // toma el adrees de los cookies y los agrega al state, en la primera caga
    useEffect(() => {
        // sei es la primera vez que usamos la aplicacio usa solo el  first name como valdacion pq  todos los campos son requeridos
        //y se guardan al mismop tiempo esto evita hacer el dispatch innecesariamente
        if (Cookie.get('firstName')) {
            const shippingAddress = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                address: Cookie.get('address') || '',
                address2: Cookie.get('address2') || '',
                zip: Cookie.get('zip') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || '',
            }

            dispatch({ type: '[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])

    // Guarda el carrito con los aritculos cookies
    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    // actualiza otros parametros cada que el state del carrito cabia

    useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE ?? 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);



    const addProductToCart = (product: ICartProduct) => {
        // TODO: esto se puede optimizar mucho mas 

        // BUSCA EL PRODUCTO EN EL CARRITO SI NO LO ENCUENTRA LO AGREGA (COMO NUEVO)
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        // BUSCA EL PRODUCTO EN EL CARRITO CON EL MISMMO ID Y MISMA TALLA SI NO LO ENCUENTRA LO AGREGA (COMO NUEVO)
        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        // BUSCA EL PRODUCTO  EN CARRITO CON EL MISMMO ID Y MISMA TALLA SI 
        // PRIMERO EVALUA SI NO TIENE EL MISMO ID, SI NO LO TIENE INMEDIAMATEMENTE LO RETORNA PORQUE NO ES EL MIMO ARTICULO NO SE ACUMULARA
        // SEGUNDO EVALUA SI NO TIENE LA MISMA TALLA, SI NO LO TIENE INMEDIAMATEMENTE LO RETORNA PORQUE NO SE ACUMULARA POR SO SER MISMA TALLA
        //SI NO CALLO EN LOS IF ANTERIORES QUIERE DECIR QUE TIENE MISMO ID Y MISMA TALLA POR LO TANTO LE SUMA A LA CANTIDAD PORQUE ES MISMO PRODUCTO
        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });
        // NO ES NECESCERARIO USAR SPREAD OPERATOR (...) PORQUE EL MAD YA HIZO UNA COPIA DEL ARREGLO
        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }


    const updateAddress = (address: ShippingAddress) => {
        // guarda en las cookies la direction y luego la pone en el store
        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }


    return (
        <CartContext.Provider value={{
            //    el state ya contiene todas las propiedades de cart state
            ...state,
            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress
        }}>
            {children}
        </CartContext.Provider>
    )
};