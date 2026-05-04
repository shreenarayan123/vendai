import React from 'react'

type Props = {
    label:string,
    message:string
}

const Section = ({label, message}: Props) => {
  return (
    <div className='flex flex-col gap-3 '>
        <p className='text-sm font-medium' >{label} </p>
        <p className='text-sm font-light' >{message}</p>
    </div>
  )
}

export default Section