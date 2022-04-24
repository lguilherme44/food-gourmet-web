import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAdd from "../../components/ModalAdd";
import ModalEdit from "../../components/ModalEdit";
import { FoodsContainer } from "./styles";
import { useState, useEffect } from "react";
import IFood from "../../types/IFood";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import { useAuth } from "../../hooks/useAuth";

export default function Admin() {
  const { tokenUser } = useAuth();
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function getFoods() {
      const { data } = await api.get("/foods", {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });

      if (data) {
        setLoading(false);
        setFoods(data);
      }
    }

    if (tokenUser) {
      getFoods();
      setLoading(false);
    }
  }, [tokenUser]);

  const handleAddFood = async (
    food: Omit<IFood, "id" | "available">
  ): Promise<void> => {
    setLoading(true);
    const data = new FormData();
    data.append("name", food.name);
    data.append("description", food.description);
    data.append("price", food.price.toString());
    data.append("image", food.image[0]);

    // console.log(food.image[0]);
    const { data: dataAPI } = await api.post("/foods", data, {
      headers: {
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    if (dataAPI) {
      setFoods([...foods, dataAPI]);
      setLoading(false);
      toast.success("Registro inserido com sucesso.");
    }
  };

  const handleUpdateFood = async (
    food: Omit<IFood, "id" | "available">
  ): Promise<void> => {
    setLoading(true);
    try {
      const dataForm = new FormData();

      const { available } = editingFood;

      const newAvailable = available ? "true" : "false";

      dataForm.append("name", food.name);
      dataForm.append("description", food.description);
      dataForm.append("price", food.price.toString());
      dataForm.append("available", newAvailable.toString());
      dataForm.append("image", food.image[0]);

      console.log(food);

      const { data } = await api.put(`/food/${editingFood.id}`, dataForm, {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });

      if (data) {
        setLoading(false);
        const foodsUpdated = foods.map((f) =>
          f.id !== data.data.id ? f : data.data
        );

        setFoods(foodsUpdated);
        toast.success(data.message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    const { data } = await api.delete(`/food/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    const foodsFiltered = foods.filter((food) => food.id !== id);

    if (foodsFiltered && data) {
      setFoods(foodsFiltered);
      toast.success(data.message);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: IFood) => {
    setEditModalOpen(true);
    setEditingFood(food);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAdd
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEdit
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      {isLoading ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#131416"}
          height={35}
          width={35}
          className="loading-page"
        />
      ) : (
        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food) => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      )}
    </>
  );
}
