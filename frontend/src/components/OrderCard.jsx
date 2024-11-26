const OrderCard = ({ order }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {order.status === 'pending_payment' && 'Aguardando Pagamento'}
            {order.status === 'processing' && 'Processando'}
            {order.status === 'shipped' && 'Enviado'}
            {order.status === 'delivered' && 'Entregue'}
          </span>
        </div>
        
        <div className="space-y-2">
          {order.Products.map((product) => (
            <div key={product.id} className="flex justify-between items-center">
              <span>{product.name}</span>
              <span className="text-gray-600">
                {product.OrderItem.quantity}x R$ {product.OrderItem.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-lg font-bold">
              R$ {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  };