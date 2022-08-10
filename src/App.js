import "tailwindcss/base.css";
import "./styles/globalStyles.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "pages/home";
import { Prediction } from "pages/prediction";
import tw from "twin.macro";

export function App() {

  const Container = tw.div``;

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/prediction' element={<Prediction />} />
      </Routes>
    </Container>
  );
}