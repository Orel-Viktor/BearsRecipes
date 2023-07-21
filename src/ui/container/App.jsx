import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Config
import { pages } from "../../engine/config/routers";

// Components
import { Layout } from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {pages.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
