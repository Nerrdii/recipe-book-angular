import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Test Recipe',
      'A test description',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Bread', 2)]
    ),
    new Recipe(
      'Another Test Recipe',
      'A test description',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Flour', 1), new Ingredient('Sugar', 2)]
    )
  ]
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);

      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
