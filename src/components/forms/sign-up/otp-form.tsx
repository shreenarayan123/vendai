'use client'
import OTPInput from '@/components/otp'
import React from 'react'


type Props ={
  setOTP:React.Dispatch<React.SetStateAction<string>>
  onOTP:string
}
const OtpForm = ({setOTP, onOTP}:Props) => {
  return (
    <>
    <h2 className='text-gravel md:text-4xl font-bold'>Enter OTP</h2>
    <p className='text-iridium md:text-sm'>Enter the one time password that was sent to you mail</p>
    <div className='w-full justify-center flex py-5'>
      <OTPInput
      otp={onOTP}
      setOtp={setOTP}
      />
    </div>
    </>
  )
}

export default OtpForm