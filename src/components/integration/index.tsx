'use client'
import { INTEGRATION_LIST_ITEMS } from '@/constants/integration'
import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import Image from 'next/image'
import IntegrationTrigger from './integration-trigger'
import StripeLogo from '../../app/assets/Stripe_Logo.svg'

type Props = {
  connections: {
    stripe: boolean
  }
}

const IntegrationList = ({connections}:Props)=>{
  return(
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3 p-10">
    {INTEGRATION_LIST_ITEMS.map((item) => (
      <Card key={item.id}>
        <CardContent className="flex flex-col p-5 gap-2">
          <div className="flex w-full justify-between items-start">
            <div >
              <div className="w-10 h-10 relative">
                <Image
                  width={100}
                  src={StripeLogo}
                  alt="Logo"
                />
              </div>
            </div>
            <IntegrationTrigger
              connections={connections}
              title={item.title}
              description={item.modalDescription}
              name={item.name}
            />
          </div>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
      </Card>
    ))}
  </div>
  )

}

export default IntegrationList