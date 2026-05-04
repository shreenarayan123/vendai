import React from "react";
import LeadQualify from "../../app/assets/LeadQualify.svg";
import FilterQuestions from "../../app/assets/filterquestions.png";
import LeadQualification from "../../app/assets/LeadQualification.svg";
import AutomatedSchedule from "../../app/assets/AutomatedSchedule.svg";
import AutomatedScheduling from "../../app/assets/AutomatedScheduling.svg";
import BookMeeting from "../../app/assets/BookMeeting.png";
import LiveAgent from "../../app/assets/LiveAgent.svg";
import LiveAgentHandoff from "../../app/assets/LiveAgentHandOff.png";
import LiveAgentHand from "../../app/assets/LiveAgentHandOff.svg";
import MultiDomain from "../../app/assets/MultiDomain.svg";
import MultiDomainCamp from "../../app/assets/MultiDomainCampaigns.svg";
import MultiDomainCampaign2 from "../../app/assets/MultiDomainCampaign2.png";
import MultiDomainCampaign from "../../app/assets/MultiDomainCampaign.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";



const Features = () => {
  return (
    <section
    id="features"
    className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto bg-slate-50 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl p-2 md:p-4 lg:p-[8px]"
  >
    <div className="flex flex-col items-center py-12 md:py-16 lg:py-20 gap-8 md:gap-4 lg:gap-6">
      {/* Lead Qualification Feature */}
      <div className="w-full relative">
        <div className="hidden md:block">
          <Image src={LeadQualify} alt="LeadQualify"  />
        </div>
        
        <div className="flex flex-col md:flex-row md:absolute md:top-0 md:left-0 md:h-full w-full items-center justify-center gap-6 md:gap-8 lg:gap-[50px] p-4">
          <Image
            className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px] rounded-xl shadow-lg md:shadow-xl"
            src={FilterQuestions}
            alt="Lead qualification interface"
          />
          
          <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px] flex flex-col gap-3 md:gap-5 lg:gap-7 mt-6 md:mt-0">
            <Image
              height={60}
              src={LeadQualification}
              alt="Lead Qualification Icon"
            />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Lead Qualification</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Transform website visitors into loyal customers with intelligent
              chatbots that understand, qualify, and convert.
            </p>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Multi-Domain Campaigns Feature */}
      <div className="w-full relative">
        <div className="hidden md:flex md:items-end md:justify-end">
          <Image src={MultiDomain} alt="MultiDomain"  />
        </div>
        
        <div className="flex flex-col-reverse md:flex-row md:absolute md:top-0 md:left-0 md:h-full w-full items-center justify-center gap-6 md:gap-8 lg:gap-[50px] p-4">
          <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px] flex flex-col gap-3 md:gap-5 lg:gap-7 mt-6 md:mt-0">
            <Image
              height={60}
              src={MultiDomainCamp}
              alt="Multi-Domain Campaign Icon"
            />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Multi-Domain Campaigns</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Run targeted engagement campaigns across all your websites and landing pages from one dashboard.
            </p>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="relative w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px]">
            <Image
              className="w-full rounded-xl shadow-lg md:shadow-xl"
              src={MultiDomainCampaign}
              alt="Multi-domain campaign interface"
            />
            <Image
              className="w-full absolute top-10 left-5 md:top-16 md:left-8 lg:top-20 lg:left-10 rounded-xl shadow-lg md:shadow-xl hidden sm:block"
              src={MultiDomainCampaign2}
              alt="Second campaign interface"
            />
          </div>
        </div>
      </div>

      {/* Automated Scheduling Feature */}
      <div className="w-full relative ">
        <div className="hidden md:block">
          <Image src={AutomatedSchedule} alt="AutomatedSchedule"  />
        </div>
        
        <div className="flex flex-col md:flex-row md:absolute md:top-0 md:left-0 md:h-full w-full items-center justify-center gap-6 md:gap-8 lg:gap-[50px] p-4">
          <Image
            className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px] rounded-xl shadow-lg md:shadow-xl"
            src={BookMeeting}
            alt="Meeting booking interface"
          />
          
          <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px] flex flex-col gap-3 md:gap-5 lg:gap-7 mt-6 md:mt-0">
            <Image
              height={60}
              src={AutomatedScheduling}
              alt="Automated Scheduling Icon"
            />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Automated Scheduling</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Book appointments and demos directly through the chat interface,
              synced with your calendar.
            </p>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Live Agent Handoff Feature */}
      <div className="w-full relative ">
        <div className="hidden md:flex md:items-end md:justify-end">
          <Image src={LiveAgent} alt="LiveAgent"  />
        </div>
        
        <div className="flex flex-col-reverse md:flex-row md:absolute md:top-0 md:left-0 md:h-full w-full items-center justify-center gap-6 md:gap-8 lg:gap-[50px] p-4">
          <div className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px] flex flex-col gap-3 md:gap-5 lg:gap-7 mt-6 md:mt-0">
            <Image
              height={60}
              src={LiveAgentHand}
              alt="Live Agent Handoff Icon"
            />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Live Agent Handoff</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Seamlessly transfer complex conversations to your support team
              when human assistance is needed.
            </p>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
          
          <Image
            className="w-full max-w-[350px] md:max-w-[400px] lg:max-w-[470px] rounded-xl shadow-lg md:shadow-xl"
            src={LiveAgentHandoff}
            alt="Live agent handoff interface"
          />
        </div>
      </div>
    </div>
  </section>
  );
};

export default Features;
