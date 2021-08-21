import { IconBaseProps } from "react-icons/lib";

export default interface InputProps {
  name: string;
  placeholder?: string;
  icon?: React.ComponentType<IconBaseProps>;
  className?: string;
}
