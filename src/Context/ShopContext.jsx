import React, { createContext, useState } from 'react'
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);
const getDefualtCart =()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [cartItems, setCartItem] = useState(getDefualtCart());
    
    const addToCart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }
    const removeFromCart = (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }
    const getTotalCartAmount = ()=>{
        let total = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                total+=itemInfo.new_price * cartItems[item];
            }
        }
        return total;
    }
    const getTotalCartItems =()=>{
        let total = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                total+=cartItems[item];
            }
        }
        return total;
    }
    
    const contextValue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    return( 
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
    )
}
export default ShopContextProvider;