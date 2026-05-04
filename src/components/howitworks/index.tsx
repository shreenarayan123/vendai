
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Step1 from "@/app/assets/Step-1.png"
import Step2 from "@/app/assets/Step-2.png"
import Step3 from "@/app/assets/Step-3.png"

export default function HowItWorks() {
  return (
    <section id="howitworks" className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1
                className="text-5xl font-bold font-customer lg:text-6xl leading-tight text-black mb-6"
              >
              How it Works 
              </h1>
            </div>

            <div className="lg:pt-4">
              <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Transform your customer support with Vend-AI&apos;s intelligent chatbot platform. Add a fully customizable AI assistant to your website in just three simple steps.
              </p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Step 01 - Design */}
          <Card className="p-8 border border-gray-200 bg-fuchsia-50 h-fit ">
            <div className="mb-8">
              <span
                className="text-2xl font-light text-gray-400 mb-4 block"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                01
              </span>

             <div className="border-black border-2 rounded-xl mb-6  w-30">
                <Image src={Step1} alt="Preview" className="w-full rounded-xl" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-3 text-black" style={{ fontFamily: "Instrument Serif, serif" }}>
                Add your
                <br />
                website domain
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Simply enter your website domain from the sidebar to get started with your AI-powered chatbot setup.
              </p>
            </div>
          </Card>

          {/* Step 02 - Distribute */}
          <Card className="p-8 border border-gray-200 bg-blue-50 h-fit">
            <div className="mb-8">
              <span
                className="text-2xl font-light text-gray-400 mb-4 block"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                02
              </span>
               <div className="border-black border-2 rounded-xl mb-6  w-30">
                <Image src={Step2} alt="Preview" className="w-full rounded-xl" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif  mb-3 text-black" style={{ fontFamily: "Instrument Serif, serif" }}>
                Choose tech stack
                <br />
                & copy code
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Select your app&apos;s technology stack and copy-paste the provided code snippet into your app&apos;s main file.
              </p>
            </div>
          </Card>

          {/* Step 03 - Develop */}
          <Card className="p-8 border border-gray-200 bg-emerald-50">
            <div className="mb-8">
              <span
                className="text-2xl font-light text-gray-400 mb-4 block"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                03
              </span>
               <div className="border-black border-2 rounded-xl mb-6  w-30">
                <Image src={Step3} alt="Preview" className="w-full rounded-xl" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-3 text-black" style={{ fontFamily: "Instrument Serif, serif" }}>
                Get chatbot
                <br />
                on your website
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Inter Tight, sans-serif" }}>
                Your fully customizable AI chatbot is now live on your website.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
