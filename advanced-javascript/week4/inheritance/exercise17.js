import { PremiumTea } from "../PremiumTea.js";
import { Tea } from "../Tea.js";

const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());
// "Gyokuro [Grade A] (green) from Japan - 84.00 DKK/100g"

console.log(gyokuro.priceFor(100));
// 84  (56 * 1.5)

// It's still a Tea:
console.log(gyokuro instanceof Tea); // true
console.log(gyokuro instanceof PremiumTea); // true

const gradeB = new PremiumTea(
  "Silver Needle",
  "white",
  "China",
  0.5,
  true,
  "B",
);
console.log(gradeB.priceFor(100)); // 62.5  (50 * 1.25)

const gradeC = new PremiumTea("Darjeeling", "black", "India", 0.18, false, "C");
console.log(gradeC.priceFor(100)); // 19.8  (18 * 1.1)