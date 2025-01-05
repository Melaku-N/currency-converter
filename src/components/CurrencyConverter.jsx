import React, { useState, useEffect } from "react";
import { useCurrency } from "./CurrencyContext";
import { useNavigate, useLocation } from "react-router-dom";

const CurrencyConverter = () => {
  const { baseCurrency, setBaseCurrency, rates, loading, error } =
    useCurrency();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const favorite = location.state?.favorite;

  useEffect(() => {
    if (favorite) {
      setAmount(favorite.amount);
      setBaseCurrency(favorite.baseCurrency);
      setSelectedCurrency(favorite.selectedCurrency);
      setConvertedAmount(favorite.convertedAmount);
    }
  }, [favorite, setBaseCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const convertCurrency = () => {
    if (!rates || !rates[selectedCurrency]) return;
    const converted = (amount * rates[selectedCurrency]).toFixed(2);
    setConvertedAmount(converted);
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, selectedCurrency, rates]);

  const addToFavorites = () => {
    const favoritePair = {
      amount,
      baseCurrency,
      selectedCurrency,
      convertedAmount,
    };

    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const isFavoriteExists = currentFavorites.some(
      (favorite) =>
        favorite.amount === favoritePair.amount &&
        favorite.baseCurrency === favoritePair.baseCurrency &&
        favorite.selectedCurrency === favoritePair.selectedCurrency
    );

    if (!isFavoriteExists) {
      const updatedFavorites = [...currentFavorites, favoritePair];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      alert(
        `${baseCurrency} to ${selectedCurrency} has been added to your favorites!`
      );
    } else {
      alert("This exchange is already in your favorites!");
    }
  };

  if (loading) return <div>Loading exchange rates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main">
      <div className="container">
        <h2>Currency Converter</h2>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="0"
          />
        </div>
        <div>
          <label>Base Currency:</label>
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            {rates &&
              Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Target Currency:</label>
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            {rates &&
              Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
        <div>
          {convertedAmount && (
            <h3>
              {amount} {baseCurrency} = {convertedAmount} {selectedCurrency}
            </h3>
          )}
        </div>
        <button onClick={addToFavorites}>Add to Favorites</button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
