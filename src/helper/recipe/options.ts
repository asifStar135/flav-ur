const dietTypes = [
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Vegan", value: "Vegan" },
  { label: "Lacto-Vegetarian", value: "Lacto-Vegetarian" },
  { label: "Super30", value: "Super30" },
  { label: "Gluten Free", value: "Gluten Free" },
  { label: "Ketogenic", value: "Ketogenic" },
  { label: "Ovo-Vegetarian", value: "Ovo-Vegetarian" },
  { label: "Pescetarian", value: "Pescetarian" },
  { label: "Paleo", value: "Paleo" },
  { label: "Primal", value: "Primal" },
  { label: "Low FODMAP", value: "Low FODMAP" },
];

const cuisines = [
  { label: "Indian", value: "Indian" },
  { label: "Italian", value: "Italian" },
  { label: "Chinese", value: "Chinese" },
  { label: "French", value: "French" },
  { label: "Japanese", value: "Japanese" },
  { label: "Southern", value: "Southern" },
  { label: "Middle Eastern", value: "Middle Eastern" },
  { label: "Spanish", value: "Spanish" },
  { label: "American", value: "American" },
  { label: "Thai", value: "Thai" },
  { label: "Korean", value: "Korean" },
  { label: "British", value: "British" },
  { label: "Mexican", value: "Mexican" },
  { label: "Cajun", value: "Cajun" },
  { label: "Asian", value: "Asian" },
  { label: "Caribbean", value: "Caribbean" },
  { label: "Eastern European", value: "Eastern European" },
  { label: "European", value: "European" },
  { label: "German", value: "German" },
  { label: "Greek", value: "Greek" },
  { label: "Irish", value: "Irish" },
  { label: "Jewish", value: "Jewish" },
  { label: "Latin American", value: "Latin American" },
  { label: "Mediterranean", value: "Mediterranean" },
  { label: "Nordic", value: "Nordic" },
  { label: "Vietnamese", value: "Vietnamese" },
  { label: "African", value: "African" },
];

const mealTypes = [
  { label: "main course", value: "main course" },
  { label: "dessert", value: "dessert" },
  { label: "breakfast", value: "breakfast" },
  { label: "snacks", value: "snack" },
  { label: "drink", value: "drink" },
  { label: "beverage", value: "beverage" },
  { label: "salad", value: "salad" },
  { label: "bread", value: "bread" },
  { label: "soup", value: "soup" },
  { label: "sauce", value: "sauce" },
  { label: "fingerfood", value: "fingerfood" },
  { label: "appetizer", value: "appetizer" },
  { label: "marinade", value: "marinade" },
  { label: "side dish", value: "side dish" },
];
//  create and options array named intolerences with value and label from below options
const intolerances = [
  { label: "Gluten", value: "Gluten" },
  { label: "Dairy", value: "Dairy" },
  { label: "Egg", value: "Egg" },
  { label: "Grain", value: "Grain" },
  { label: "Peanut", value: "Peanut" },
  { label: "Seafood", value: "Seafood" },
  { label: "Sesame", value: "Sesame" },
  { label: "Shellfish", value: "Shellfish" },
  { label: "Soy", value: "Soy" },
  { label: "Sulfite", value: "Sulfite" },
  { label: "Tree Nut", value: "Tree Nut" },
  { label: "Wheat", value: "Wheat" },
];

const sortingOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price", value: "price" },
  { label: "Time", value: "time" },
  { label: "healthiness", value: "healthiness" },
  { label: "Calories", value: "calories" },
  { label: "Protein", value: "protein" },
];

const defaultFilters = {
  //  taste Matters
  mealType: "",
  cuisine: "",
  excludeCuisine: "",
  // Diet Matters
  diet: "",
  minCalories: 10,
  maxCalories: 1000,
  minProtein: 0,
  maxProtein: 90,
  //  Requirements
  equipments: "",
  ingredients: "",
  excludeIngredients: "",
  maxReadyTime: 30,
  // Other filters
  intolerances: "",
  minServings: 0,
  maxServings: 100,
  sort: "",
  sortDirection: "asc",
};

export default {
  cuisines,
  dietTypes,
  mealTypes,
  intolerances,
  sortingOptions,
  defaultFilters,
};
