import {Vehicle} from "./vehicle";
import {User} from "./user";
import {ImageUrl} from "./image-url";

export class Annonce {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modifDate: string;
  vehicle: Vehicle;
  user: User;
  images: Array<ImageUrl>;
}
