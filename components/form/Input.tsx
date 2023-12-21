import * as React from "react";
import { Input as NBInput, IInputProps, FormControl, WarningOutlineIcon, IFormControlProps } from "native-base";
import { useController } from "react-hook-form";
interface InputProps extends IInputProps {
  name: string;
  id: string; // if name = username , id must be like username-login || username-register
  label?: string | undefined;
  disabled?: boolean | undefined;
  formControl?: IFormControlProps;
}
export default function Input({ name, defaultValue, formControl, ...props }: InputProps) {
  const {
    field: { onBlur, onChange, ref, value = "", disabled },
    fieldState: { invalid, error },
  } = useController({
    name,
    defaultValue: defaultValue,
    disabled: props.disabled,
  });

  const form: IFormControlProps = {
    isDisabled: disabled,
    isInvalid: invalid,
    isRequired: props.isRequired,
  };
  return (
    <>
      <FormControl py={"1"} {...formControl} {...form}>
        <FormControl.Label {...form} htmlFor={props.id} id={name}>
          {props.label}
        </FormControl.Label>
        <NBInput
          type="text"
          w="100%"
          {...props}
          id={props.id}
          onBlur={(e) => {
            props.onBlur?.(e);
            onBlur();
          }}
          placeholder={props.placeholder ?? props.label?.toLowerCase()}
          onChange={(v) => {
            props.onChange?.(v);
            if (v === undefined) return onChange(""); /// handle
            onChange(v);
          }}
          value={value ?? ""}
          ref={ref}
          isDisabled={disabled}
          defaultValue={undefined} // Remove defaultValue from NBInput
        />
        {error && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{error?.message}</FormControl.ErrorMessage>}
      </FormControl>
    </>
  );
}
