import { useState, useCallback, useRef } from "react";
import { Container } from "./styles";
import PropsInput from "../../types/PropsInput";
import { useForm } from "react-hook-form";

type InputProps = JSX.IntrinsicElements["input"] & PropsInput;

const Input = ({ name, icon: Icon, ...rest }: InputProps) => {
  const { register } = useForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  console.log(name);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        // onBlur={handleInputBlur}
        // ref={inputRef}
        {...register(name)}
        {...rest}
      />
    </Container>
  );
};

export default Input;
