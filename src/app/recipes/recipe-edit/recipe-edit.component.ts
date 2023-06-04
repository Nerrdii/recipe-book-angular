import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, UntypedFormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new RecipeActions.UpdateRecipe({
          index: this.id,
          updatedRecipe: this.form.value
        })
      );
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.form.value));
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    const ingredients = new UntypedFormArray([]);

    if (this.editMode) {
      this.store
        .select('recipes')
        .pipe(take(1))
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];

          name = recipe.name;
          imagePath = recipe.imagePath;
          description = recipe.description;

          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              ingredients.push(
                new UntypedFormGroup({
                  name: new UntypedFormControl(ingredient.name, Validators.required),
                  amount: new UntypedFormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(name, Validators.required),
      imagePath: new UntypedFormControl(imagePath, Validators.required),
      description: new UntypedFormControl(description, Validators.required),
      ingredients: ingredients
    });
  }

  onAddIngredient() {
    (<UntypedFormArray>this.form.get('ingredients')).push(
      new UntypedFormGroup({
        name: new UntypedFormControl(null, Validators.required),
        amount: new UntypedFormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<UntypedFormArray>this.form.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<UntypedFormArray>this.form.get('ingredients')).controls;
  }
}
