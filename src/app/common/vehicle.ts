import {Marque} from "./marque";
import {Model} from "./model";
import {Year} from "./year";
import {Price} from "./price";
import {GearBox} from "./gear-box";
import {Category} from "./category";

export class Vehicle {
  id: number;
  km: string;
  category: Category;
  model: Model;
  year: Year;
  price: Price;
  gearbox: GearBox;

}
