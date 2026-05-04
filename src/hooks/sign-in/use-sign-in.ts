"use client";
import  { useState } from "react";
import { useToast } from "../use-toast";
import { useRouter } from "next/navigation";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { onLoginUser } from "@/actions/auth";


const UseSignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const { signIn, isLoaded, setActive } = useSignIn();

  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      
      try {
        setLoading(true);
        const authenticated = await onLoginUser(
          values.email,
          values.password
        );
        if (authenticated.status == 200) {
          toast({
            title: "success",
            description: "Welcome back !",
          });
          router.push("/dashboard");
        }
      } catch (error: any) {
        setLoading(false);
        if (error.errors[0].code === "form_password_incorrect")
          toast({
            title: "error",
            description: "emai or password is incorrect",
          });
      }
    }
  );

  return {
    onHandleSubmit,
    methods,
    loading,
  };
};

export default UseSignIn;
