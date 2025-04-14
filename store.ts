import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
}

interface OrdersStore {
  count: number;
  setCount: (count: number) => void;
}

interface AuthState {
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

const MAX_STRIPE_AMOUNT = 999999.99; // Maximum amount in PKR
const STRIPE_CURRENCY_MULTIPLIER = 100; // Convert to paisa

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product?._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId
          ),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const total = get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
        // Return the amount in PKR (not in paisa)
        return Math.min(total, MAX_STRIPE_AMOUNT);
      },
      getSubtotalPrice: () => {
        const subtotal = get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price - discount;
          return total + discountedPrice * item.quantity;
        }, 0);
        // Return the amount in PKR (not in paisa)
        return Math.min(subtotal, MAX_STRIPE_AMOUNT);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    { name: "cart-store" }
  )
);

export const useOrdersStore = create<OrdersStore>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: "auth-store" }
  )
);

export default useCartStore;
