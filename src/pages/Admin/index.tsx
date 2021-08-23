import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
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
    getFoods();
    setLoading(false);
  }, [tokenUser]);

  const handleAddFood = async (
    food: Omit<IFood, "id" | "available">
  ): Promise<void> => {
    try {
      const { data } = await api.post(
        "/foods",
        {
          ...food,
          available: true,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      );

      if (data) {
        setFoods([...foods, data]);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleUpdateFood = async (
    food: Omit<IFood, "id" | "available">
  ): Promise<void> => {
    try {
      const { available } = editingFood;

      const newData = {
        name: food.name,
        description: food.description,
        price: food.price,
        available: available,
        image: food.image,
      };

      const { data } = await api.put(`/foods/${editingFood.id}`, newData, {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });

      if (data) {
        const foodsUpdated = foods.map((f) =>
          f.id !== data.data.id ? f : data.data
        );

        setFoods(foodsUpdated);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    const { data } = await api.delete(`/foods/${id}`, {
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
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
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
