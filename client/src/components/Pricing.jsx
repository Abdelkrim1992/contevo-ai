import { PricingTable } from '@clerk/clerk-react'

export default function PricingPage() {
  
  return (
    <div id='pricing' className='px-25 justify-center items-center h-screen'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Pricing</h1>
        <p className='text-gray-500 text-center mt-2'>Choose the plan that's right for you</p>
        
      </div>
      <div className='flex items-center justify-center mt-10 w-full'>
          <PricingTable />
      </div>
    </div>
  )
}