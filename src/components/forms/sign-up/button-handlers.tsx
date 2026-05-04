
'use client'
import { Button } from '@/components/ui/button';
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignupForm } from '@/hooks/sign-up/use-sign-up';
import Link from 'next/link';
import React from 'react'
import { useFormContext } from 'react-hook-form';


const ButtonHandlers = () => {
    const {setCurrentStep, currentStep} = useAuthContextHook();
    const { formState, getFieldState, getValues } = useFormContext();
    const { onGenerateOtp }  = useSignupForm();

    const { isDirty:isName } = getFieldState('fullname', formState)
    const { isDirty:isEmail } = getFieldState('email', formState)
    const { isDirty:isPassword } = getFieldState('password', formState)

    if(currentStep == 1){
        return(
            <div className='flex w-full flex-col gap-3 intem-center'>
                <Button type='submit' className='w-full'
                onClick={() => setCurrentStep((prev: number) => prev + 1)}
                >
                    Create New account
                </Button>
                <p>Already have an account ?
                    <Link href='/auth/sign-in' className='font-bold '>Sign In</Link>
                </p>
            </div>
        )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    

 
}
if(currentStep == 2){
    return(
        <div className='flex flex-col gap-3 items-center'>
            <Button type='submit' className='w-full'
            {...(isName && isEmail  && isPassword && {
                onClick:()=>onGenerateOtp( getValues('email'), setCurrentStep)
            })}
             >
                Continue
            </Button>
            <p>Already have an account ?
                    <Link href='/auth/sign-in' className='font-bold '>Sign In</Link>
                </p>
        </div>
    )
}

    return(
        <div className='flex flex-col gap-3 items-center'>
            <Button type='submit' className='w-full'
            onClick={()=>setCurrentStep((prev:number)=> prev+ 1)}
             >
                Continue
            </Button>
            <p>Already have an account ?
                    <Link href='/auth/sign-in' className='font-bold '>Sign In</Link>
                </p>
        </div>
    )

}
export default ButtonHandlers