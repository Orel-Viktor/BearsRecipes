import React, { useEffect } from "react";
import { useStore } from "../../engine/config/store";

export function BeerRecipes() {
  // store.js
  const beerRecipes = useStore((state) => state.beerRecipes);
  const getBeerRecipes = useStore((state) => state.setBeerRecipes);
  const page = useStore((state) => state.page);
  const incPage = useStore((state) => state.incPage);
  // store.js;
  const heightRecipes = window.visualViewport.height / 15;

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

  const GetRecipes = async (page) => {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?page=${page}`
    );
    const recipes = await response.json();
    getBeerRecipes(recipes);
  };

  // let scrolling = false;
  // setInterval(() => {
  //   if (scrollY + innerHeight === document.body.scrollHeight) {
  //     if (scrolling) {
  //       incPage();
  //       console.log("страница", page);
  //       GetRecipes(page);
  //       scrolling = false;
  //     }
  //   }
  // }, 500);
  // 1раз консоль лог
  // window.onscroll = function () {
  //   scrolling = true;
  // };

  // 2 РАЗА
  // window.addEventListener("scroll",()=>{
  //   scrolling = true;
  // })
  // let isFunctionExecuted = false;
  // window.addEventListener("scroll", () => {
  //   if (
  //     scrollY + innerHeight === document.body.scrollHeight &&
  //     !isFunctionExecuted
  //   ) {
  //     console.log("log");
  //     isFunctionExecuted = true;
  //   }
  // });

  // window.addEventListener("scroll", () => {
  //   if (scrollY + innerHeight === document.body.scrollHeight) {
  //     console.log("addEventListener scroll");
  //   }
  // });
  // window.onscroll = function () {
  //   if (scrollY + innerHeight === document.body.scrollHeight) {
  //     console.log("onscroll");
  //   }
  // };

  return (
    <div>
      {beerRecipes.length
        ? beerRecipes.map((elem) =>
            elem.map((recipe, id) => (
              <div
                style={{
                  minHeight: `${heightRecipes}px`,
                }}
                key={recipe + id}
              >
                {recipe.name}
              </div>
            ))
          )
        : null}
    </div>
  );
}
