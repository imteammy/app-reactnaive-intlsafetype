import * as React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Box, Button, Center, View } from "native-base";
import { Input, Checkbox } from "@/components/form";
import { Register, registerSchema } from "./hooks";
import { Link } from "expo-router";
import { useI18nContext } from "src/i18n/i18n-react";
import * as _ from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";

function InnerRegister() {
  const {
    LL: { common },
  } = useI18nContext();

  const form = useFormContext<Register>();
  return (
    <View flex={1} display="flex" justifyContent="center" alignItems="center">
      <Center width="3/4">
        <Input name="username" label={_.upperFirst(common.username())} id="Username-register" isRequired />
        <Input name="email" label={_.upperFirst(common.email())} id="Email-register" keyboardType="email-address" isRequired />
        <Input
          name="password"
          label={_.upperFirst(common.password())}
          id="Password=register"
          keyboardType="visible-password"
          isRequired
        />
        <Input name="passwordConfirm" id="passwordConfirm-register" label={common.passwordConfirm()} isRequired />
        <Checkbox value="true" name="termsAgree" id="termsAgree-register" isRequired>
          Agreed Terms
        </Checkbox>
        <Box width="2/3">
          <Button
            mt="2"
            colorScheme="darkBlue"
            onPress={(e) =>
              form.handleSubmit(
                (value) => console.log(value),
                (err) => console.log(err)
              )(e)
            }
          >
            {_.upperFirst(common.register())}
          </Button>
          <Button
            mt="2"
            colorScheme="coolGray"
            onPress={() => {
              form.reset();
            }}
          >
            {_.upperFirst(common.reset.main())}
          </Button>
          <Center my={2}>
            <Link href="/login">{_.upperFirst(common.login())}</Link>
          </Center>
        </Box>
      </Center>
    </View>
  );
}

export default function RegisterScreen() {
  const form = useForm<Register>({
    resolver: zodResolver(registerSchema()),
  });
  return (
    <FormProvider {...form}>
      <InnerRegister />
    </FormProvider>
  );
}
