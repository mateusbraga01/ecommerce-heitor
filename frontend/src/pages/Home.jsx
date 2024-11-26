import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Bem-vindo à nossa loja
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Encontre os melhores produtos pelos melhores preços
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700"
        >
          Ver Produtos
        </Link>
      </div>
    </div>
  );
};