import { teas } from "../../data/teas.js";
/**
 *  When do you need explicit return (curly braces)?

    Rewrite exercise 6 both ways:

    With implicit return (hint: use template literals inline)
    With explicit return (curly braces and return keyword)

 */

teas.map((tea) => console.log(`${tea.name} - ${tea.pricePerGram * 100} DKK/100g`));

console.log(teas.map(function (tea){
    return tea.name + " - " + tea.pricePerGram * 100 + " DKK/100g"
}));