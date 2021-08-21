import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import AddFood from "../../types/AddFood";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FormHandles, SubmitHandler } from "@unform/core";

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: AddFood) => void;
}

export default function ModalAddFood({
  isOpen,
  setIsOpen,
  handleAddFood,
}: ModalAddFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<AddFood> = async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        image: Yup.string().required(),
        name: Yup.string().required(),
        price: Yup.string().required(),
        description: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      handleAddFood(data);
      setIsOpen();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          toast.error(error.message);
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
