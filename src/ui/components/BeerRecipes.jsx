import React, { useEffect } from "react";
import { useStore } from "../../engine/config/store";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

// Engine
import { routes } from "../../engine/config/routers";
// Components
import { DeleteRecipes } from "./DeleteRecipes";

export function BeerRecipes() {
  const nav = useNavigate();
  // store.js
  // const beerRecipesLength = useStore((state) => state.beerRecipesLength);
  // const setBeerRecipesLength = useStore((state) => state.setBeerRecipesLength);

  const beerRecipes = useStore((state) => state.beerRecipes);
  const setBeerRecipes = useStore((state) => state.setBeerRecipes);

  const responseBeer = useStore((state) => state.responseBeer);
  const setBeerResponse = useStore((state) => state.setBeerResponse);

  const setChecked = useStore((state) => state.setChecked);

  const page = useStore((state) => state.page);
  const incPage = useStore((state) => state.incPage);

  const setBeerName = useStore((state) => state.setBeerName);
  const setRecipe = useStore((state) => state.setRecipe);

  const deleteRecipes = useStore((state) => state.deleteRecipes);
  // store.js;

  const heightRecipes = window.visualViewport.height / 15;

  useEffect(() => {
    window.addEventListener("scroll", scrlonig);
    return () => {
      window.removeEventListener("scroll", scrlonig);
    };
  });

  useEffect(() => {
    initState();
  }, []);

  useEffect(() => {
    for (let i = 0; i < beerRecipes.length; i++) {
      const checked = beerRecipes[i].checked;
      const divBeerRecipe = document.querySelectorAll(".beerRecipe");
      checked
        ? divBeerRecipe[i].classList.add("checked-recipe")
        : divBeerRecipe[i].classList.remove("checked-recipe");
    }
  }, []);
  const scrlonig = () => {
    if (
      scrollY + innerHeight === document.body.scrollHeight &&
      responseBeer.length
    ) {
      incPage();
      GetRecipes(page);
    }
  };
  const initState = () => {
    if (!beerRecipes.length) {
      incPage();
      GetRecipes(page);
    }
  };

  const PushToRecipe = (beerName) => {
    setBeerName(beerName);
    setRecipe();
    nav(routes.recipe);
  };

  const GetRecipes = async (page) => {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?page=${page}`
    );
    const recipes = await response.json();
    setBeerRecipes(recipes);
    setBeerResponse(recipes);
  };

  const onContextMenu = (e, index) => {
    e.preventDefault();
    function findElementByIndex(arr, index) {
      const foundElement = arr.find(
        (element, currentIndex) => currentIndex === index
      );
      return foundElement !== undefined ? foundElement : null;
    }
    const currentRecipe = findElementByIndex(beerRecipes, index);

    const checked = currentRecipe.checked ? false : true;
    checked
      ? e.target.classList.add("checked-recipe")
      : e.target.classList.remove("checked-recipe");

    setChecked(index, checked);
  };

  return (
    <Box>
      <DeleteRecipes
        onClick={deleteRecipes}
        className="root delete-recipes-button"
      />
      {beerRecipes.length
        ? beerRecipes.map((recipe, index) => (
            <Box
              className="beerRecipe"
              onClick={() => PushToRecipe(recipe.name)}
              onContextMenu={() => onContextMenu(window.event, index)}
              style={{
                minHeight: `${heightRecipes - 10}px`,
                borderRadius: "10px",
                margin: " 0 0 10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
              key={recipe + recipe.id + index}
            >
              {recipe.name}
            </Box>
          ))
        : null}
    </Box>
  );
}
