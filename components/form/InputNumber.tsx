import React from "react";
import { Input as NBInput, IInputProps, FormControl, WarningOutlineIcon } from "native-base";
import { useController } from "react-hook-form";
interface InpurProps extends IInputProps {
  name: string;
  label?: string | undefined;
  disabled?: boolean | undefined;
}
export default function InputNumber({ name, defaultValue, ...props }: InpurProps) {
  const {
    field: { onBlur, onChange, ref, value = "", disabled },
    fieldState: { invalid, error },
  } = useController({
    name,
    defaultValue: defaultValue,
    disabled: props.disabled,
  });

  return (
    <>
      <FormControl isInvalid={invalid}>
        <FormControl.Label isInvalid={invalid} isRequired={props.isRequired}>
          {props.label}
        </FormControl.Label>
        <NBInput
          {...props}
          keyboardType="numeric"
          onBlur={onBlur}
          inputMode="decimal"
          placeholder={props.placeholder ?? props.label?.toLowerCase() ?? name}
          onChange={(e) => {
            if (e.target) onChange(e);
            props.onChange?.(e);
          }}
          value={value}
          ref={ref}
          isDisabled={disabled}
          defaultValue={undefined} // Remove defaultValue from NBInput
        />

        {error && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{error?.message}</FormControl.ErrorMessage>}
      </FormControl>
    </>
  );
}
