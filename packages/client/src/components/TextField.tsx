import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField, Field } from "formik";
import { FC } from "react";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: "submit" | "password" | "number" | "date" | "text";
};

const TextField: FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
