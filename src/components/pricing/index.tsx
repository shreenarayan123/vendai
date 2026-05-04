import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { pricingCard } from '@/constants/landing-page';
import Link from 'next/link';



const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
    <div className="container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that works best for your business.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {pricingCard.map((plan, index) => (
          <Card
            key={index}
            className={`border ${
              plan.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link  href={`/dashbord?plan=${plan.title}`}>
              <Button
                className={`w-full mt-6 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
              </Link>              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Pricing