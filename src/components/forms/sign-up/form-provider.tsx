
'use client'

import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignupForm } from "@/hooks/sign-up/use-sign-up";
import  {Loader } from "@/components/loader";
import React from "react";
import { FormProvider } from "react-hook-form";
type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, loading, onHandleSubmit } = useSignupForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form
          onSubmit={onHandleSubmit}
          className="h-full"
        >
          <div className="flex flex-col h-full gap-3 justify-between">
          <Loader loading={loading} noPadding={true}>{children}</Loader>          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignUpFormProvider;
