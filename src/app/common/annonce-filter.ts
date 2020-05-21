import {Marque} from "./marque";
import {Model} from "./model";
import {Year} from "./year";
import {GearBox} from "./gear-box";
import {Price} from "./price";
import {Carburant} from "../components/common/carburant";

export class AnnonceFilter {
  marque: Marque;
  model: Model;
  dateStart: Year;
  kmStart: Number;
  kmEnd: Number;
  gearbox: GearBox;
  dateEnd: Year;
  priceStart: Price;
  priceEnd: Price;
  carburant: Carburant;
}
