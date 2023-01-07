import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  
  recipeFetch = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(
        'https://recipe-book-angular-44b2c.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json'
        }
      );
    }),
    map(recipes => {
      console.log(recipes);
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }

      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  ));

  
  recipeStore = createEffect(() => this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        'https://recipe-book-angular-44b2c.firebaseio.com/recipes.json',
        state.recipes,
        {
          reportProgress: true
        }
      );
      return this.httpClient.request(req);
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) {}
}
