

import { ProductionQuantityLimits } from '@mui/icons-material';
import { ICartProduct } from '../../interfaces';
import { CartState } from './CartProvider';


type CartActionType =
   | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
   | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
   | { type: '[Cart] - Change cart quantity', payload: ICartProduct }
   | { type: '[Cart] - Remove product in cart', payload: ICartProduct }
   | { type: '[Cart] - Set Cart As Loaded' }
   | {
      type: '[Cart] - Update order summary',
      payload: {
         numberOfItems: number;
         subTotal: number;
         tax: number;
         total: number;
      }
   }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

   switch (action.type) {
      case '[Cart] - LoadCart from cookies | storage':
         return {
            ...state,
            isLoaded: true,
            cart: [...action.payload]
         }


      case '[Cart] - Update products in cart':
         return {
            ...state,
            cart: [...action.payload]
         }


      case '[Cart] - Change cart quantity':
         return {
            ...state,
            cart: state.cart.map(product => {
               //No es es el mismo producto dejemoslo tal cual y retornemoslo al state
               if (product._id !== action.payload._id) return product;
               // es el mismo pero con diferente  dejemoslo tal cual y se devuelve al state
               if (product.size !== action.payload.size) return product;
               // es el mismo  producto lo modifica y lo retorna,( casi siempre de cantidad) y se retorna al state
               return action.payload;
            })
         }


      case '[Cart] - Remove product in cart':
         // [para remover del carrito el producto debe coincidir con el mimos id y size]
         return {
            ...state,
            cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
         }

      case '[Cart] - Update order summary':
         return {
            ...state,
            ...action.payload
         }
      case '[Cart] - Set Cart As Loaded':
         return {
            ...state,
            isLoaded: true,
         }

      default:
         return state;
   }

}