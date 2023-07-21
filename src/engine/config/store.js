import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  // persist(
  (set) => ({
    beerRecipes: [],
    setBeerRecipes: (beerRecipes) =>
      set((state) => ({
        beerRecipes: [...state.beerRecipes, beerRecipes],
      })),
    page: 1,
    incPage: () =>
      set((state) => ({
        page: state.page + 1,
      })),
    beerName: "",
    setBeerName: (beerName) =>
      set(() => ({
        beerName: beerName,
      })),
  })
  // {
  //   name: "beerRecipes",
  //   storage: createJSONStorage(() => localStorage),
  // }
);
// );
