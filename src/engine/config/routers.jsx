// Core
import React from "react";
// Components
import { Main } from "../../ui/pages/Main";
import { BeerRecipe } from "../../ui/pages/Recipe";

export const routes = {
  home: "/BeersRecipes/",
  recipe: "/BeerRecipes/Recipe",
};

export const pages = [
  {
    path: routes.home,
    element: <Main />,
  },
  {
    path: routes.recipe,
    element: <BeerRecipe />,
  },
];
