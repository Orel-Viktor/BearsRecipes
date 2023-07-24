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

  const page = useStore((state) => state.page);
  const incPage = useStore((state) => state.incPage);

  const setBeerName = useStore((state) => state.setBeerName);
  const setRecipe = useStore((state) => state.setRecipe);

  // store.js;
  const heightRecipes = window.visualViewport.height / 15;

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

  const checkRecipe = (event) => {
    console.log(event);
    if (event === 2) {
      console.log(" правая конпка миши");
    }
  };

  return (
    <div>
      {beerRecipes.length
        ? beerRecipes.map((recipe, id) => (
            <div
              onClick={(() => PushToRecipe(recipe.name), checkRecipe())}
              style={{
                minHeight: `${heightRecipes}px`,
              }}
              key={recipe + id}
            >
              {recipe.name}
            </div>
          ))
        : null}
    </div>
  );
}
