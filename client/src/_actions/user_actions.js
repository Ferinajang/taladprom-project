import axios from 'axios';
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
    
} from './types';
import { USER_SERVER } from '../components/Config.js';



export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    console.log("redu")
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response =>  response.data);
    console.log("back");
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(_id) {
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
        .then(response => response.data);
    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

export function addOrderToUser(order) {
    const request = axios.post(`${USER_SERVER}/addOrderToUser`,order)
        .then(response => response.data);
    return {
        type: ADD_ORDER_TO_USER,
        payload: request
    }
}

export function getOrderList(orderList,orderUser) {
    console.log("get action");
    const request = axios.get(`/api/order/order_by_id?id=${orderList}&type=array`)
        .then(response => {
            orderUser.forEach(orderList => {
            response.data.forEach((orderDetail,i)=>{
                if(orderList.id === orderDetail._id){
                    response.data[i].quantity = orderList.quantity;
                }
            })
        })
        return response.data;
    });
    return {
        type: GET_ORDER_LIST_USER,
        payload: request
    }
}


export function getCartItem(cartItem,userCart) {
    const request = axios.get(`/api/product/product_by_id?id=${cartItem}&type=array`)
        .then(response => {userCart.forEach(cartItem => {
            response.data.forEach((productDetail,i)=>{
                if(cartItem.id === productDetail._id){
                    response.data[i].quantity = cartItem.quantity;
                }
            })
            
        })
        return response.data;
    }); 
        //cart Detail in redux

    return {
        type: GET_CART_ITEM_USER,
        payload: request
    }
}

export function removeCartItem(id) {
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}


