const ProductCard = ({ product, onAddToCart }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="/api/placeholder/400/300"
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold">
              R$ {product.price.toFixed(2)}
            </span>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stockQuantity === 0}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {product.stockQuantity === 0 ? 'Indisponível' : 'Adicionar'}
            </button>
          </div>
        </div>
      </div>
    );
  };