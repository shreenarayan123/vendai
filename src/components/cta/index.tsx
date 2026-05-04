import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative flex items-center py-12 rounded-2xl justify-center overflow-hidden">
      {/* Warm Pastel Background */}
      <div className="absolute inset-0 bg-[#fff8f0]  "></div>
      
      {/* Soft Warm Pastel Texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 182, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 244, 214, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 182, 153, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative container text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="relative inline-flex items-center px-4 py-2 rounded-full border border-black/20 text-black/90 text-sm font-medium mb-8 overflow-hidden">
            {/* Badge Background */}
            <div className="absolute inset-0 bg-[#fefcff]"></div>
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                  radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
              }}
            />
            <Zap className="relative z-10 w-4 h-4 mr-2 text-blue-500" />
            <span className="relative z-10">Transform Your Business Today</span>
          </div>

          <div className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight flex flex-col">
                <div>
                  <span className="font-customer font-bold">
                    Ready to Tranform Your
                  </span>
                </div>
                <div>
                  <span className="font-step italic bg-blue-600 bg-clip-text text-transparent">
                    Customer Engagement
                  </span>
                </div>
              </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-6">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="group bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
              >
                <Zap className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Additional Features */}
          <div className=" flex items-center justify-center md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {/* Feature Icon Background */}
                <div className="absolute inset-0 bg-[#fefcff]"></div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                      radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                  }}
                />
                <Zap className="relative z-10 w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-black font-semibold mb-2">Instant Setup</h3>
              <p className="text-black/60 text-sm">Deploy in minutes, not hours</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {/* Feature Icon Background */}
                <div className="absolute inset-0 bg-[#fefcff]"></div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                      radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                  }}
                />
                <ArrowRight className="relative z-10 w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-black font-semibold mb-2">24/7 Support</h3>
              <p className="text-black/60 text-sm">Always available for your customers</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {/* Feature Icon Background */}
                <div className="absolute inset-0 bg-[#fefcff]"></div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                      radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                  }}
                />
                <Zap className="relative z-10 w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-black font-semibold mb-2">AI-Powered</h3>
              <p className="text-black/60 text-sm">Smart responses that learn</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
