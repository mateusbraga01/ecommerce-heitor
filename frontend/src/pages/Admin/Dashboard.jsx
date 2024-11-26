import React, { useState, useEffect } from 'react';
import api from 'src/services/api';
import { useAuth } from 'src/contexts/AuthContext';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    try {
      const [ordersResponse, productsResponse] = await Promise.all([
        api.get('/orders'),
        api.get('/products')
      ]);
      setOrders(ordersResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      loadData();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do pedido');
    }
  };

  const updateProduct = async (productId, data) => {
    try {
      await api.put(`/products/${productId}`, data);
      loadData();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto');
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold">Acesso Restrito</h2>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-8">Dashboard Admin</h2>
      
      {/* Seção de Produtos */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Gerenciar Produtos</h3>
        <div className="bg-white shadow overflow-hidden rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stockQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        const newStock = prompt('Novo estoque:', product.stockQuantity);
                        if (newStock) {
                          updateProduct(product.id, {
                            stockQuantity: parseInt(newStock)
                          });
                        }
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Atualizar Estoque
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seção de Pedidos */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Pedidos Recentes</h3>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white shadow overflow-hidden rounded-md p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-medium">Pedido #{order.id}</h4>
                  <p className="text-sm text-gray-500">
                    Cliente: {order.User.name}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="border rounded-md px-3 py-1"
                >
                  <option value="pending_payment">Aguardando Pagamento</option>
                  <option value="processing">Processando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                </select>
              </div>
              <div className="border-t pt-4">
                <p className="font-medium">Total: R$ {order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};