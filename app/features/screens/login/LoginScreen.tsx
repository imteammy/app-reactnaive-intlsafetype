import * as React from "react";
import { useLogin } from "./hook/";
import { Box, Button, Center, View } from "native-base";
import { FormProvider } from "react-hook-form";
import { Input } from "@/components/form";
import { Link } from "expo-router";
import { useI18nContext } from "src/i18n/i18n-react";
import * as _ from "lodash";

export default function LoginScreen() {
  const { LL } = useI18nContext();
  const { form, onsubmit } = useLogin();
  return (
    <FormProvider {...form}>
      <View display="flex" justifyContent="center" alignItems="center" justifyItems="center" flex={1}>
        <Center width="3/4">
          {LL.validation.required({ field: LL.common.email() })}
          <Input name="username" id="username-login" label={LL.common.username()} />
          <Input name="password" id="uassword-login" label={LL.common.password()} type="password" />
          <Box width="2/3">
            <Button my="2" onPress={onsubmit}>
              {_.upperFirst(LL.common.login())}
            </Button>
            <Center>
              <Link
                href="/register"
                onPress={() => {
                  form.clearErrors();
                }}
              >
                {_.upperFirst(LL.common.register())}
              </Link>
            </Center>
          </Box>
        </Center>
      </View>
    </FormProvider>
  );
}
