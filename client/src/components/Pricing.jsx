import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TbCheck } from 'react-icons/tb';

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "Perfect for individuals and small creators.",
    features: ["10 Videos / month", "720p Export", "Basic AI Voices", "Standard Templates"],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$49",
    description: "Best for professionals and small agencies.",
    features: ["50 Videos / month", "1080p Export", "Premium AI Voices", "Custom Avatar", "Priority Support"],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For large teams and high-volume production.",
    features: ["Unlimited Videos", "4K Export", "API Access", "Dedicated Manager", "Custom Models"],
    buttonText: "Contact Us",
  }
];

export default function PricingPage() {
  return (
    <div id='pricing' className='px-4 sm:px-6 lg:px-25 py-20 flex flex-col justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center justify-center mb-12'>
        <h1 className='text-4xl font-bold'>Pricing</h1>
        <p className='text-gray-500 text-center mt-2'>Choose the plan that's right for you</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl'>
        {plans.map((plan, index) => (
          <Card key={index} className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg md:scale-105' : ''}`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <TbCheck className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}