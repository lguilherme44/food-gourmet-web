import { IconBaseProps } from "react-icons/lib";

export default interface PropsInput {
  name: string;
  placeholder?: string;
  icon?: React.ComponentType<IconBaseProps>;
  className?: string;
  type?: string;
}
