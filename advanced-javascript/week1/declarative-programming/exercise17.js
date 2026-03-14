import { teas } from "../../data/teas.js";

// Build a filterTeas(teas, criteria) function that accepts a filter object:

// Only using forEach
function filterTeas(teas, criteria) {
    const keys = Object.keys(criteria)
    const filteredTeas = []
    teas.forEach(tea => {
        console.log(`\t ${tea.name} - ${tea.organic} - ${tea.origin}`)

        const allCriteriaEvaluated = []
        keys.forEach(key => {
            const criteriaValue = criteria[key]
            console.log(`${key} - ${criteriaValue}`)
            if(tea[key] === criteriaValue) {
                allCriteriaEvaluated.push(true)
            } else {
                allCriteriaEvaluated.push(false)
            }
        })

        let criteriaAcc = true
        allCriteriaEvaluated.forEach(criteria => {
            if(criteria === false) {
            criteriaAcc = false
            }
        })

        if(criteriaAcc) {
            filteredTeas.push(tea)
        }
    })
    console.log(filteredTeas.map(tea => tea.name))
}

filterTeas(teas, { organic: true, origin: "Japan" });

// filterTeas(teas, { organic: true }); // Returns all organic teas
// filterTeas(teas, { origin: "Japan" }); // Returns all Japanese teas
// filterTeas(teas, { organic: true, origin: "Japan" }); // Returns organic Japanese teas
// filterTeas(teas, { type: "green", inStock: true }); // Returns green teas that are in stock
