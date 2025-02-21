'use client';

import { Product } from '@prisma/client';
import { createContext, ReactNode, useState } from 'react';

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  totalQuantity: 0,
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (previewProduct) => previewProduct.id === product.id,
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    
    setProducts((previewProducts) => {
      return previewProducts.map((previewProduct) => {
        if (previewProduct.id === product.id) {
          return {
            ...previewProduct,
            quantity: previewProduct.quantity + product.quantity,
          };
        }
        return previewProduct;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((previewProducts) => {
      return previewProducts.map((previewProduct) => {
        if (previewProduct.id !== productId) {
          return previewProduct;
        }
        if (previewProduct.quantity === 1) {
          return previewProduct;
        }
        return { ...previewProduct, quantity: previewProduct.quantity - 1 };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((previewProducts) => {
      return previewProducts.map((previewProduct) => {
        if (previewProduct.id !== productId) {
          return previewProduct;
        }
        return { ...previewProduct, quantity: previewProduct.quantity + 1 };
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((previewProducts) =>
      previewProducts.filter((previewProduct) => previewProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        total,
        totalQuantity,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
