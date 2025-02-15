import React, { useContext } from 'react';
import { ProductContext } from '../Utils/Context';

function Cart() {
  const { cart, removeFromCart, updateQuantity, showToast } = useContext(ProductContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-2xl font-bold text-gray-800">Total: ${total.toFixed(2)}</p>
              <button className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;