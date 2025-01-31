import React, { useState } from 'react';
import axios from 'axios';

const AddStockForm = ({ setStocks }) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleAddStock = async (event) => {
    event.preventDefault();

    const newStock = {
      name,
      ticker,
      quantity: parseInt(quantity),
      buyPrice: parseFloat(buyPrice),
    };

    try {
      const response = await axios.post('http://localhost:8080/api/stocks', newStock);
      setStocks(prevStocks => [...prevStocks, response.data]);
      setName('');
      setTicker('');
      setQuantity('');
      setBuyPrice('');
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <form onSubmit={handleAddStock}>
      <div>
        <label>Stock Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ticker:</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Buy Price:</label>
        <input
          type="number"
          step="0.01"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default AddStockForm;
