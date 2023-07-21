import React from "react";
import { useStore } from "../../engine/config/store";

export function BeersRecipe() {
  const currentRecipe = useStore((state) => state.currentRecipe);
  console.log(currentRecipe);
  return currentRecipe ? (
    <div>
      <RecipeInner dataRecipe={currentRecipe}></RecipeInner>
    </div>
  ) : (
    <div>пиво</div>
  );
}

export function RecipeInner(props) {
  const { dataRecipe } = props;
  return (
    <div>
      <div>{dataRecipe.name}</div>
      <div>
        <img
          style={{ width: "15%" }}
          alt={dataRecipe.name}
          src={dataRecipe.image_url}
        ></img>
      </div>
      <div>{dataRecipe.brewers_tips}</div>
      <div>{dataRecipe.description}</div>
    </div>
  );
}
