import {createElement} from './domOperations.js';

const allIngredients = [
    {
        name: "פירות וירקות",
        ingredients: ["תותים", "תפוחים", "תפוזים", "עגבניות", "מלפפונים", "בצל"],
    },
    {
        name: "חלבי",
        ingredients: ["חלב", "גבינה צהובה", "גבינה", "קוטג"],
    },
    {
        name: "יבשים",
        ingredients: ["פסטה", "לחם", "ביצים"],
    }
];

const createIngredient = (name) => {
    const checkMark = createElement("span", [], ["checkmark"]);
    const checkbox = createElement("input", [], [], {type: "checkbox"});
    const label = createElement('label')
    label.textContent = name;
    const ingredient = createElement("label", [label, checkbox, checkMark], ["ingredients"])
    return ingredient;
};

const createIngredientsSection = (obj) => {
    const ingredientsElements = [];
    for (let item of obj.ingredients) {
        ingredientsElements.push(createIngredient(item));
    };
    const name = createElement("h3", [], ["inTitle"]);
    name.textContent = obj.name;
    const ingredientsInnerSection = createElement("div", [...ingredientsElements], ["inInnerSection"]); 
    const section = createElement("div", [name, ingredientsInnerSection], ["inSection"]);
    return section;
};

const createIngredientsPage = (ingredientsArray) => {
    for (let section of ingredientsArray) {
        document.querySelector(".ingredientsContainer").append(createIngredientsSection(section));
    }
};

createIngredientsPage(allIngredients);