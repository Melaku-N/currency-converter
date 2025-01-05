import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "./CurrencyContext";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { rates } = useCurrency();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteClick = (favorite) => {
    navigate("/", { state: { favorite } });
  };

  const removeFromFavorites = (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="container">
      <h2>Favorites</h2>
      <div>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((favorite, index) => {
              const exchangeRate = rates[favorite.selectedCurrency];
              return (
                <li key={index}>
                  1 {favorite.baseCurrency} = {(1 * exchangeRate).toFixed(2)}{" "}
                  {favorite.selectedCurrency}
                  <button onClick={() => removeFromFavorites(index)}>
                    Remove
                  </button>
                  <button onClick={() => handleFavoriteClick(favorite)}>
                    Go to Converter
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
