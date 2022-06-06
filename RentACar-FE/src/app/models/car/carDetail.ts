import { CarImage } from "../carImage/carImage";


export class CarDetail {
  carId:number;
  carName:string;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  description:string;
  imagePaths:CarImage[];
  minFindeksScore:number;
}