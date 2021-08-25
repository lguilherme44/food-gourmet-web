import { useRef, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "./styles";

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements["input"] & Props;
export default function ImageInput({ name, ...rest }: InputProps) {
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

  // const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) {
  //     setPreview(null);
  //   }
  //   const previewURL = URL.createObjectURL(file);
  //   setPreview(previewURL);
  // }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {/* {preview && <img src={preview} alt="Preview" width="100" />} */}
      <input
        type="file"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        // onChange={handlePreview}
        {...rest}
        {...register}
      />
    </Container>
  );
}
