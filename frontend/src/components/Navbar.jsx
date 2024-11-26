import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center text-xl font-bold">
              E-Commerce
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/products" className="text-gray-700 hover:text-gray-900">
                Produtos
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="text-gray-700 hover:text-gray-900">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-gray-900">
                  Meus Pedidos
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};