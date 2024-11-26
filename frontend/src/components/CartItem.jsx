const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
      <div className="flex items-center py-4 border-b">
        <img
          src="/api/placeholder/100/100"
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold">{item.product.name}</h3>
          <p className="text-gray-600">R$ {item.product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            className="p-1 rounded-md hover:bg-gray-100"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            className="p-1 rounded-md hover:bg-gray-100"
            disabled={item.quantity >= item.product.stockQuantity}
          >
            +
          </button>
          <button
            onClick={() => onRemove(item.product.id)}
            className="ml-4 text-red-600 hover:text-red-800"
          >
            Remover
          </button>
        </div>
      </div>
    );
  };