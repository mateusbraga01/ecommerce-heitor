import React, { useState, useEffect } from 'react';
import api from '../services/api';
import OrderCard from '../components/OrderCard';
import { useAuth } from '../contexts/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Faça login para ver seus pedidos</h2>
        <Link to="/login" className="text-blue-600 hover:text-blue-800">
          Ir para login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-8">Meus Pedidos</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Você ainda não tem pedidos</p>
          <Link to="/products" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Começar a comprar
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
