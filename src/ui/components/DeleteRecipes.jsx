import React from "react";
import { useStore } from "../../engine/config/store";
// Components
import { Button } from "./Button";

export function DeleteRecipes(props) {
  const { onClick, className } = props;
  const beerRecipes = useStore((state) => state.beerRecipes);
  const checked = beerRecipes.find((elem) => elem.checked === true);

  return (
    <div>
      {checked ? (
        <Button onClick={onClick} className={className}>
          Delete
        </Button>
      ) : null}
    </div>
  );
}
