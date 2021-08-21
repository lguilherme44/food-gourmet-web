import { ReactNode } from "react";

export default interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}
