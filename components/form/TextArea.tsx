import React from "react";
import { FormControl, TextArea as _TextArea, ITextAreaProps, IFormControlProps } from "native-base";
import { useController } from "react-hook-form";

export interface ItextArea extends ITextAreaProps {
  name: string;
  autoCompleteType?: boolean;
  label?: string;
  formControl?: IFormControlProps;
  labelControl?: IFormControlProps;
}

const TextArea = ({ formControl, labelControl, autoCompleteType = false, ...props }: ItextArea) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    defaultValue: props.defaultValue,
    disabled: props.isDisabled,
  });

  const form: IFormControlProps = {
    isInvalid: invalid,
    isDisabled: field.disabled,
    isRequired: props.isRequired,
  };

  const textAreaProps: ITextAreaProps = {
    autoCorrect: true,
    editable: true,
    onBlur(e) {
      field.onBlur();
      props.onBlur?.(e);
    },
    onChange(e) {
      field.onChange(e);
      props.onChange?.(e);
    },
    value: field.value,
    defaultValue: undefined,
    isDisabled: field.disabled,
  };

  return (
    <FormControl {...formControl} py={"1"} {...form}>
      <FormControl.Label {...labelControl} {...form} htmlFor={field.name}>
        {props.label}
      </FormControl.Label>
      <_TextArea {...props} {...textAreaProps} autoCompleteType={autoCompleteType} ref={field.ref} />
      {error && <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default TextArea;
