import Header from "../../components/Header";
import api from "../../services/api";
import { FoodsContainer, Container } from "./styles";
import { useState, useEffect } from "react";
import IFood from "../../types/IFood";
import ReactLoading from "react-loading";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { tokenUser } = useAuth();
  const [foods, setFoods] = useState<IFood[]>([]);
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

  return (
    <>
      <Header />

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
              <Container>
                <header>
                  <img src={food.image} alt={food.name} />
                </header>
                <section className="body">
                  <h2>{food.name}</h2>
                  <p>{food.description}</p>
                  <p className="price">
                    R$ <b>{food.price}</b>
                  </p>
                </section>
                {/* <section className="footer">
                    <div className="icon-container">
                      <button
                        type="button"
                        className="icon"
                        onClick={setEditingFood}
                        data-testid={`edit-food-${food.id}`}
                      >
                        <FiEdit3 size={20} />
                      </button>

                      <button
                        type="button"
                        className="icon"
                        onClick={() => handleDelete(food.id)}
                        data-testid={`remove-food-${food.id}`}
                      >
                        <FiTrash size={20} />
                      </button>
                    </div>

                    <div className="availability-container">
                      <p>{isAvaliable ? "Disponível" : "Indisponível"}</p>

                      <label
                        htmlFor={`available-switch-${food.id}`}
                        className="switch"
                      >
                        <input
                          id={`available-switch-${food.id}`}
                          type="checkbox"
                          checked={isAvaliable}
                          onChange={toggleAvailable}
                          data-testid={`change-status-food-${food.id}`}
                        />
                        <span className="slider" />
                      </label>
                    </div>
                  </section> */}
              </Container>
            ))}
        </FoodsContainer>
      )}
    </>
  );
}
