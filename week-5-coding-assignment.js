// Specific class
class Recipe {
    //constructor (parameters)
    constructor(name,ingredients){
        //...this.parameter = parameter;
        this.name = name;
        this.ingredients = ingredients;
    }
    
    //methods
    displayIngredients() {
        return `${this.name} will need ${this.ingredients}`
    }
}

// Category class
class Meal {
    //constructor (parameters)
    constructor(time, dayOfTheWeek) {
        //this.parameter = parameter;
        this.time = time;
        this.dayOfTheWeek = dayOfTheWeek;
        //this.specifics = [];  --empty array to put things into categories
        this.recipes = [];
    }
    
    // add example of specific class to array (example)
    addRecipe(recipe){
        //if example is instanceof Specific
        if(recipe instanceof Recipe){
            //add example to specifics array
            this.recipes.push(recipe);
        } else { //otherwise throw error
            throw new Error(`You can only add an instance of Recipe. Argument not valid: ${recipe}`);
        }
    }
}
    
// Menu class
class Menu {
    //constructor
    constructor() {
        //this.categories = []; --empty array to put categories into
        this.meals = [];
        //this.selectedCategory = null; --makes selecting something necessary
        this.selectedMeal = null;
    }

    //start method
    start() {
        //select from this.menuOptions();
        let selection = this.showMainMenuOptions();

            //as long as selection isn't 0 (user chooses to exit menu)
            while (selection !=0) {
                console.log(selection)
                switch(selection) {
                //if selection is 1
                case `1`:
                    //create category
                    this.createMeals();
                    break;
                //if selection is 2
                case `2`:
                    //view category
                    this.viewMeal();
                    break;
                //if selection is 3
                case `3`:
                    //delete category
                    this.deleteMeal();
                    break;
                //if selection is 4
                case `4`:
                    //display categories
                    this.displayMeals();
                    break;
                //if selection is 5
                case `5`:
                    //display examples
                    this.displayAllRecipes();
                    break;
                //if selection is 6
                case `6`:
                    //display subexamples
                    this.displayAllIngredients();
                    break;
                //otherwise
                default:
                    //exit (selection is 0)
                    selection = 0;
                }
            //this.menuOptions()
            selection = this.showMainMenuOptions();
        }
            //show Goodbye!
            alert(`Goodbye!`);
    }
    
    //menuOptions method
    showMainMenuOptions() {
        //return prompt
        return prompt(`
            0: exit
            1: create Meal
            2: view Meal
            3: delete Meal
            4: display Meals
            5: display All Recipes
            6: display All Ingredients
            `);
    }
    
    //categoryMenuOptions method
    showMealMenuOptions(mealInfo) {
        //return prompt
        return prompt(`
            0: back
            1: create Recipe
            2: delete Recipe
            3: edit Recipe
            -------------------------
           
            ${mealInfo}`); //category info --name and examples
    }
    
    //displayCategories method
    displayMeals() {
        alert(this.mealStringBuilder());
    }
    mealStringBuilder(){
        // empty categoryString
        let mealString = '';
        //loop through categories
        for(let i = 0;i< this.meals.length;i++){
            //concat category to categoryString
            mealString += `
            ${i}) ${this.meals[i].dayOfTheWeek}'s ${this.meals[i].time}
            `;
        }
        //show finished categoryString
        return mealString;
    }

    //createCategory method
    createMeals(){
        //prompt user for name of category
        let day = prompt('Enter which day you will make this meal:');
        let meal = prompt('Enter Breakfast, Lunch or Dinner:');
        //create new instance of Category and push it to this.categories
        this.meals.push(new Meal(meal,day));
    }
   
    
    //viewCategory method
    viewMeal(){
        //userInput = prompt user to select which category to view
        let index = prompt(`${this.mealStringBuilder()}
        ---------
        Enter the index of the meal you wish to view:
        `);
        //if input is valid --selection isn't greater than max or less than 0
        if(index > -1 && index < this.meals.length){
            //this.selectedCategory = this.categories[userInput]
            this.selectedMeal = this.meals[index];
            //describe category
            let description = 'Meal: '+this.selectedMeal.dayOfTheWeek + `'s `+this.selectedMeal.time + '\n';
            //loop through examples
            for(let i = 0; i<this.selectedMeal.recipes.length;i++){
                //add each to display
                description += `
                ${i}) ${this.selectedMeal.recipes[i].name} - ${this.selectedMeal.recipes[i].ingredients}
                `;
            }

            //prompt user with categoryMenuOptions(description)
            let selection = this.showMealMenuOptions(description);
            switch(selection) {
            //if user selects 1:
                case '1':
                //create example
                    this.createRecipe();
                    break;
            //if user selects 2:
                case '2':
                //delete example
                    this.deleteRecipe();
                    break;
            //if user selects 3:
                case `3`:
                //edit example
                    this.editRecipe();
                    break;
            //otherwise:
                default:
                //user selected 0, back
                selection = 0;
            }
        }
    }
        
    //createExample method
    createRecipe() {
        //userInput = prompt for name of example
        let name = prompt('Enter the name of the recipe');

        //userInput = prompt for description of example
        let ingredients = prompt('Enter the ingredients');

        //create new instance of Example and add it to this.selectedCategory.examples array
        this.selectedMeal.recipes.push(new Recipe(name,ingredients));
        console.log(this.selectedMeal.recipes)
    }


    //deleteExample method
    deleteRecipe(){
        //userInput = prompt user to select which example to delete
        let index = prompt(`Enter the index of the Recipe you wish to delete:
        `);
        //if input is valid --selection isn't greater than number of examples or less than 0
        if(index > -1 && index < this.selectedMeal.recipes.length){
            //remove selected example from this.selectedCategory.examples array
            this.selectedMeal.recipes.splice(index,1);
        }
    }

    //displayAllExamples method
    displayAllRecipes(){
        let recipeString = "";
        let methodResultsArray;
        let counter = 1;
        let string = '';
        for(let i = 0; i<this.meals.length;i++){
            [string, counter] = this.recipeStringBuilder(counter,this.meals[i])
            recipeString += string;
        }
        alert(recipeString);
    }

    //displaySingleCategory'sExamples method
    displaySingleMealsRecipes(){
        return this.recipeStringBuilder(0,this.selectedMeal)[0];
    }

    //builds the string to display all recipes, 
    recipeStringBuilder(counter,meal){
        //empty example string
        let recipeString = "";
        
            //loop recipes
            for(let i = 0;i<meal.recipes.length;i++){
                //concat category to categoryString
                recipeString += `
                     ${counter}) ${meal.recipes[i].name}
                    `;
                //increment counter
                counter++;
            }
            
        return [recipeString,counter];
    }
    
    //deleteCategory method
    deleteMeal() {
        //userInput = prompt user to select which category to delete
        let index = prompt("Enter the index of the Meal you wish to delete:")
        //if input is valid --selection isn't greater than number of categories or less than 0
        if(index > -1 && index < this.meals.length){
            //remove selected category from this.categories array
            this.meals.splice(index,1);
        }
    }

    //displayAllExamplesSubProp method
    displayAllIngredients() {
        alert(this.ingredientsStringBuilder());
    }

    ingredientsStringBuilder(){
        // empty example String
        let ingredientsString = '';
        // counter var
        let counter = 1;
        //loop categories
        console.log(this.meals)
        for(let i = 0;i < this.meals.length;i++){
            console.log(this.meals[i]);
            console.log(this.meals[i].recipes);
            //loop recipes
            for(let j = 0;j < this.meals[i].recipes.length;j++){
                //concat category to categoryString
                ingredientsString += `
                     ${counter}) ${this.meals[i].recipes[j].displayIngredients()}
                    `;
                //increment counter
                counter++;
            }
        }
        //show finished example String
        return ingredientsString;
    }

    //edit recipe
    editRecipe(){
        //prompt user for index of recipe to be edited
        let index = prompt(`${this.displaySingleMealsRecipes()}
        ------------
        Enter the index of the recipe you'd like to edit:`);
        //prompt user for recipe name
        let name = prompt(`Enter the new recipe name:`);
        //**   **    **   ingredients
        let ingredients = prompt(`Enter the new ingredients:`);

        //array[userIndex] = new Recipe(name, ingredients);
        console.log(this.selectedMeal)
        this.selectedMeal.recipes[index] = new Recipe(name, ingredients);
    }
}

//create new instance of Menu
let menu = new Menu();
//call start method
menu.start();
    
    