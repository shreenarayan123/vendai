'use client'

import { Loader } from '@/components/loader'
import { AuthContextProvider } from '@/context/use-auth-context'
import UseSignIn from '@/hooks/sign-in/use-sign-in'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
    children:React.ReactNode
}

const SignInFormProvider = ({children}: Props) => {
  const { loading, onHandleSubmit, methods} = UseSignIn();

   
  return (
    <AuthContextProvider>
      <FormProvider {...methods} >
        <form
        onSubmit={onHandleSubmit}  
        className='w-full'
        >
          <div  className='flex flex-col justify-center gap-3 h-full'>
            <Loader loading={loading} noPadding={false} >{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  )
}

export default SignInFormProvider