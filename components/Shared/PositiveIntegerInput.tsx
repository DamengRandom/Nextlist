import { Input, InputProps } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface PositiveIntegerInputProps extends Omit<InputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  width?: string | Record<string, string>;
}

const PositiveIntegerInput = ({
  value,
  onChange,
  maxLength = 4,
  width = "100px",
  ...props
}: PositiveIntegerInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange("");
      return;
    }
    
    if ((/^[1-9]\d*$/.test(inputValue) || /^0$/.test(inputValue)) && inputValue.length <= maxLength) {
      onChange(inputValue);
    }
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={handleChange}
      size="sm"
      width={width}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default PositiveIntegerInput;
