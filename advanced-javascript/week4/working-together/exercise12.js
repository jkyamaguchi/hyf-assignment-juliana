import { teas } from "../../data/teas.js";

import { TeaCatalog } from "../TeaCatalog.js";
import { Tea } from "../Tea.js";


const catalog = new TeaCatalog(
  teas.map((t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)),
);

console.log(catalog.search("earl"));
// [Tea { name: "Earl Grey", ... }]

console.log(catalog.filterByType("green").map((t) => t.name));
// ["Sencha", "Dragon Well", "Matcha", "Genmaicha", "Jasmine Pearl", ...]