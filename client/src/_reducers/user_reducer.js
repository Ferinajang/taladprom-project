import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEM_USER,
    REMOVE_CART_ITEM_USER,
    ADD_ORDER_TO_USER,
    GET_ORDER_LIST_USER
} from '../_actions/types';
 

export default function(state={},action){

    switch (action.type) {
      case REGISTER_USER:
        return { ...state, register: action.payload };
      case LOGIN_USER:
        return { ...state, loginSucces: action.payload };
      case AUTH_USER:
        console.log(action);
        return { ...state, userData: action.payload };
      case LOGOUT_USER:
        return { ...state };
      case ADD_TO_CART_USER:
        return {
          ...state,
          userData: {
            ...state.userData,
            cart: action.payload,
          },
        };
        case ADD_ORDER_TO_USER:
          return {
            ...state,
            userData: {
              ...state.userData,
              orderUser: action.payload,
            },
          };
        case REMOVE_CART_ITEM_USER:
          return {
              ...state,
              cartDetail: action.payload.cartDetail,
              userData: {
              ...state.userData,
                  cart: action.payload.cart
              }
        }
      case GET_CART_ITEM_USER:
        return{
          ...state,
          cartDetail:action.payload
        };
        case GET_ORDER_LIST_USER:
        return{
          ...state,
          orderDetail:action.payload
        };
      default:
        return state;
    }
}