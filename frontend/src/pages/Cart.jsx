import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const items = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));

      await api.post('/orders', { items });
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800"
        >
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-8">Carrinho de Compras</h2>
      
      <div className="space-y-4">
        {cartItems.map(item => (
          <CartItem
            key={item.product.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold">
            R$ {total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};    