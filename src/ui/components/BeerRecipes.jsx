import React, { useEffect } from "react";
import { useStore } from "../../engine/config/store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../engine/config/routers";
import { useInView } from "react-intersection-observer";

export function BeerRecipes() {
  const nav = useNavigate();
  // store.js
  const beerRecipes = useStore((state) => state.beerRecipes);
  const getBeerRecipes = useStore((state) => state.setBeerRecipes);

  const page = useStore((state) => state.page);
  const incPage = useStore((state) => state.incPage);

  const setBeerName = useStore((state) => state.setBeerName);
  const setRecipe = useStore((state) => state.setRecipe);

  // store.js;
  const heightRecipes = window.visualViewport.height / 15;
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const scrlonig = () => {
    if (scrollY + innerHeight === document.body.scrollHeight) {
      if (beerRecipes[beerRecipes.length - 1].length) {
        incPage();
        GetRecipes(page);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrlonig);
    return () => {
      window.removeEventListener("scroll", scrlonig);
    };
  });

  useEffect(() => {
    incPage();
    GetRecipes(page);
  }, []);

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
    getBeerRecipes(recipes);
  };

  return (
    <div>
      {beerRecipes.length
        ? beerRecipes.map((elem) =>
            elem.map((recipe, id) => (
              <div
                ref={ref}
                onClick={() => PushToRecipe(recipe.name)}
                style={{
                  minHeight: `${heightRecipes}px`,
                }}
                key={recipe + id}
              >
                {inView ? <div>loading</div> : <div>{recipe.name}</div>}
              </div>
            ))
          )
        : null}
    </div>
  );
}
