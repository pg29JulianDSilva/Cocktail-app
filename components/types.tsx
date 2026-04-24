export interface Drink {
  idDrink: number,
  strDrink: string,
  strDrinkAlternate: string,
  strTags: string,
  strVideo: string,
  strCategory: string,
  strIBA: string,
  strAlcoholic: string,
  strGlass: string,
  strInstructions: string,
  strInstructionsES: string,
  strInstructionsDE: string,
  strInstructionsFR: string,
  strInstructionsIT: string,
  "strInstructionsZH-HANS": string,
  "strInstructionsZH-HANT": string,
  strDrinkThumb: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strImageSource: string,
  strImageAttribution: string,
  strCreativeCommonsConfirmed: string,
  dateModified: string
}

export interface CocktailSummary {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
}

export interface Index {
  letter: string;
}

export interface User {
  email: string;
  password: string;
}

export type FetchState<T> = 
  | {status: "idle"} 
  | {status: "loading"} 
  | {status: "success"; data: T} 
  | {status: "error"; message: string};

export type HomeStack = {
  Home: undefined;
  Menu: undefined;
  Login: undefined;
  Quit: undefined;
  Movement: undefined;
}

export type DrinkStack = {
  List: undefined;
}

export type RootTabs = {
  A: undefined;
  B: undefined;
  C: undefined;
  D: undefined;
  E: undefined;
  F: undefined;
  G: undefined;
  H: undefined;
  I: undefined;
  J: undefined;
  K: undefined;
  L: undefined;
  M: undefined;
  N: undefined;
  O: undefined;
  P: undefined;
  Q: undefined;
  R: undefined;
  S: undefined;
  T: undefined;
  U: undefined;
  V: undefined;
  W: undefined;
  X: undefined;
  Y: undefined;
  Z: undefined;
}

export type XYZ = { x: number; y: number; z: number};

export const ALCOHOL = [
  'rum', 'vodka', 'gin', 'whiskey', 'whisky', 'bourbon', 'brandy', 'tequila',
  'scotch', 'cognac', 'schnapps', 'liqueur', 'wine', 'beer', 'champagne',
  'vermouth', 'campari', 'kahlua', 'amaretto', 'baileys', 'triple sec',
  'applejack', 'proof', 'crown royal', 'wild turkey', 'pisang ambon',
  'creme de', 'grand marnier', 'maraschino liqueur', 'bitters', 'grenadine'
];

export const ORGANIC = [
  'juice', 'lemon', 'lime', 'orange', 'apple', 'grapefruit', 'pineapple',
  'cranberry', 'peach', 'egg', 'cream', 'milk', 'mint', 'sugar', 'honey',
  'nutmeg', 'cherry', 'cucumber', 'peel', 'nectar', 'fruit', 'herb', 'spice'
];

export const CARBONATED = [
  'soda', 'tonic', 'cola', 'lemonade', 'ginger ale', 'ginger beer',
  'club soda', 'sparkling', 'fizz', 'ice', 'seltzer', 'dr pepper',
  'sprite', '7-up', 'water'
];