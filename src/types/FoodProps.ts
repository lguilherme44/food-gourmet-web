import IFood from "./IFood";

export default interface FoodProps {
  food: IFood;
  handleDelete: (id: number) => void;
  handleEditFood: (food: IFood) => void;
}
