'use client'
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { useToast } from "../use-toast";
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onCompleteUserRegistration } from "@/actions/auth";
import { prepareEmailAddressVerification, verifyOTP } from "@/actions/otp";

    
    export const useSignupForm = ()=>{
        const { toast } = useToast();
        const router = useRouter();
        const [ loading , setLoading] = useState<boolean>(false);

        
        const methods = useForm({
            resolver:zodResolver(UserRegistrationSchema),
            defaultValues: {
                type: 'owner',
                fullname: '',
                email: '',
                confirmEmail: '',
                password: '',
                confirmPassword: '',
                otp: '',
              },
            mode:'onChange'
        })

        const onGenerateOtp = async (
            email:string,
            onNext:React.Dispatch<React.SetStateAction<number>>
        )=>{
            
            try {

             await prepareEmailAddressVerification(email);
                
            onNext((prev)=> prev + 1 )
            } catch (error:any) {
                console.log( "error from verification",error);
            }
        }

        const onHandleSubmit = methods.handleSubmit(
            async (values: UserRegistrationProps) => {
              
             
             
              try {
                setLoading(true)
                const completeSignUp = await verifyOTP(
                  values.email,
                  values.otp,
                )
                console.log('OTP verification result:', completeSignUp);

                if (!completeSignUp) {

                  return { message: 'Something went wrong!' }
                  
                }
        
                if (completeSignUp) {
                  console.log('OTP verified successfully, proceeding with registration', values);

                  const registered = await onCompleteUserRegistration(
                    values.fullname,
                    values.email,
                    values.password,
                    values.type
                  )
        
                  if (registered?.status == 200 && registered.user) {
                    setLoading(false)
                    router.push('/dashboard')
                  }
        
                  if (registered?.status == 400) {
                    toast({
                      title: 'Error',
                      description: 'Something went wrong!',
                    })
                  }
                }
              } catch (error: any) {
                toast({
                  title: 'Error',
                  description: error.errors[0].longMessage,
                })
              }
            }
          )

          return {
            methods,
            onHandleSubmit,
            onGenerateOtp,
            loading,
          }

    }