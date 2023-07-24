import React, { useEffect } from "react";
import { useStore } from "../../engine/config/store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../engine/config/routers";
// import { useInView } from "react-intersection-observer";

export function BeerRecipes() {
  const nav = useNavigate();
  // store.js
  const beerRecipes = useStore((state) => state.beerRecipes);
  const setBeerRecipes = useStore((state) => state.setBeerRecipes);
  const responseBeer = useStore((state) => state.responseBeer);
  const setBeerResponse = useStore((state) => state.setBeerResponse);
  const setChecked = useStore((state) => state.setChecked);

  const page = useStore((state) => state.page);
  const incPage = useStore((state) => state.incPage);

  const setBeerName = useStore((state) => state.setBeerName);
  const setRecipe = useStore((state) => state.setRecipe);

  // store.js;
  const heightRecipes = window.visualViewport.height / 15;
  console.log(beerRecipes);

  // Observer
  // const { ref, inView } = useInView({
  //   threshold: 1,
  // });

  useEffect(() => {
    window.addEventListener("scroll", scrlonig);
    return () => {
      window.removeEventListener("scroll", scrlonig);
    };
  });

  useEffect(() => {
    initState();
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
    !e.target.classList.contains("checked-recipe")
      ? e.target.classList.add("checked-recipe")
      : e.target.classList.remove("checked-recipe");

    function findElementByIndex(arr, index) {
      const foundElement = arr.find(
        (element, currentIndex) => currentIndex === index
      );
      return foundElement !== undefined ? foundElement : null;
    }
    const currentRecipe = findElementByIndex(beerRecipes, index);

    console.log(currentRecipe);
    const checked = currentRecipe.checked ? false : true;
    console.log(checked);
    setChecked(index, checked);
  };

  return (
    <div>
      {beerRecipes.length
        ? beerRecipes.map((recipe, index) => (
            <div
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
              key={recipe + recipe.id}
            >
              {recipe.name}
            </div>
          ))
        : null}
    </div>
  );
}
