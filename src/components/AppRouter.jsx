import React from "react";
import { Routes, Route } from "react-router-dom";
import StatusBar from "./StatusBar";
import Favorites from "./Favorites";
import NotFound from "./NotFound";
import CurrencyConverter from "./CurrencyConverter";
import { ThemeProvider } from "./ThemeContext";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <StatusBar />
      <Routes>
        <Route path="/" element={<CurrencyConverter />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRouter;
