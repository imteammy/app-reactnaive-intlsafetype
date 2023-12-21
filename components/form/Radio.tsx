import React from "react";
import { FormControl, IFormControlProps, IRadioGroupProps, IRadioValue, Radio as NBRadio } from "native-base";
import { useController } from "react-hook-form";

interface IRadio extends IRadioGroupProps {
  name: string;
  id: string;
  label?: JSX.Element | JSX.Element[] | string | number | null | undefined;
  shouldUnregister?: boolean;
  isRequired?: boolean;
}

function Radio(props: IRadio) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name: props.name,
    defaultValue: props.defaultValue,
    disabled: props.isDisabled,
    shouldUnregister: props.shouldUnregister,
  });

  const form: IFormControlProps = {
    isDisabled: field.disabled,
    isInvalid: invalid,
    isRequired: props.isRequired,
    isReadOnly: props.isReadOnly,
  };

  const raioProps: IRadio = {
    name: props.name,
    id: props.id,
    value: field.value,
    onChange: (v: IRadioValue) => {
      props.onChange?.(v);
      field.onChange(v);
    },
    isInvalid: invalid,
  };
  // eslint-disable-next-line react/no-children-prop
  const Label = () => (props.label ? <FormControl.Label {...form} htmlFor={field.name} children={props.label} /> : null);
  const Error = () => (error ? <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage> : null);
  return (
    <FormControl {...form}>
      <Label />
      <NBRadio.Group
        {...props}
        {...raioProps}
        ref={{
          current: field.ref,
        }}
      />
      <Error />
    </FormControl>
  );
}

export default Radio;
