import ClientRecipes from "./ClientRecipes";
import { POSTS_API_URL } from "@/data/posts";
export const metadata = {
  title: "Recipes",
  description: "All recipes from Savory Stories.",
};

export default async function RecipesPage() {
  const res = await fetch(POSTS_API_URL, {
    next: {revalidate: 10},
  });
  const resData = await res.json();
  console.log("Recipes Page API output", resData.data);

  return <ClientRecipes initialData = {resData.data}/>;
}
