import React from "react";
import { Checkbox as NBCheckbox, ICheckboxProps, FormControl, IFormControlProps } from "native-base";
import { useController } from "react-hook-form";

interface ICheckbox extends ICheckboxProps {
  name: string;
  id: string; // same
  label?: string;
  children: React.ReactNode;
  isRequired?: boolean;
  formControl?: IFormControlProps;
}

function Checkbox({ formControl, ...props }: ICheckbox) {
  const {
    field: { name, onChange, value = false, disabled, ref, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    defaultValue: props.defaultIsChecked,
    disabled: props.isDisabled,
  });
  return (
    <FormControl pt={"1"} {...formControl} isInvalid={invalid} isDisabled={disabled} isRequired={props.isRequired}>
      <NBCheckbox
        {...props}
        name={name}
        onChange={(e) => {
          onChange(e);
          props.onChange?.(e);
        }}
        onTouchEnd={() => {
          onBlur();
        }}
        isDisabled={disabled}
        isChecked={value}
        ref={{
          current: ref,
        }}
        value={props.value}
      >
        {/* <Pressable onPress={() => onChange(!value)}> */}
        <FormControl.Label htmlFor={props.id}>{props.children}</FormControl.Label>
        {/* </Pressable> */}
      </NBCheckbox>
      {error && <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>}
    </FormControl>
  );
}

export default Checkbox;
