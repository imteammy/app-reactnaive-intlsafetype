import React from "react";
import { Select as _Select, FormControl, ISelectProps } from "native-base";
import { useController } from "react-hook-form";

interface SelectProps extends ISelectProps {
  name: string;
  id: string;
  isRequired?: boolean;
  label?: string;
}

function Select(props: SelectProps) {
  const {
    field: { onBlur, onChange, ref, value, disabled },
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    disabled: props.isDisabled,
    defaultValue: props.defaultValue,
  });
  return (
    <FormControl isInvalid={invalid} isRequired={props.isRequired}>
      <FormControl.Label htmlFor={props.id}>{props.label}</FormControl.Label>
      <_Select
        {...props}
        onClose={(e) => {
          props.onClose?.(e);
          onBlur();
        }}
        id={props.id}
        onValueChange={(e) => {
          onChange(e);
          props.onValueChange?.(e);
        }}
        isDisabled={disabled}
        ref={{
          current: ref,
        }}
        selectedValue={value}
      />
      {error && <FormControl.ErrorMessage id={`${props.id}-select-error`}>{error.message}</FormControl.ErrorMessage>}
    </FormControl>
  );
}

export default Select;
