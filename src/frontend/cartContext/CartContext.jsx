import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({children}) {
    const [cart, setCart] = useState([]);

    const addToCart = (produit) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === produit.id);
            if(existing){
                return prev.map((item) => 
                item.id === produit.id ? {...item, quantity: item.quantity +1} : item
            );
            }
            return [...prev, {...produit, quantity: 1}];
        });
    };
    const removeFromCart = (id) => setCart((prev) => prev.filter((p)=> p.id !== id));
    const clearCart = () => setCart([]);

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}