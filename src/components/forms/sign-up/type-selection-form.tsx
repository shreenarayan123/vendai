   import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'
   
   type Props={
    register: UseFormRegister<FieldValues>
  userType: 'owner' | 'student'
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}
   const TypeSelectionForm = ({register, userType, setUserType}:Props) => {
     return (
       <>
       <h2 className='text-gravel md:text-4xl font-bold'>Create new Account</h2>
       <p>Tell us about your self Let&apos;s tailor your experience
       <br/>
       So it best suits you
       </p>
       <UserTypeCard
       register={register}
       userType={userType}
       setUserType={setUserType}
       value='owner'
       title='I own a business'
       text='Setting up profile for my company'
       />
       <UserTypeCard
       register={register}
       userType={userType}
       setUserType={setUserType}
       value='student'
       title='I am a student'
       text='Looking to learn about the tool'
       />
       
       </>
     )
   }
   
   export default TypeSelectionForm