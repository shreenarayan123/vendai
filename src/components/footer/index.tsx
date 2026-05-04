import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../app/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t py-5 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative">
                            <Image src={Logo} alt="Logo" width={36} height={36} />{" "}
                          </div>{" "}
              <span className="text-xl font-bold">Vend AI</span>
            </div>
            <div className="text-sm text-muted-foreground font-semibold  flex items-center gap-2">
              <span>✨</span> 
              <Link href={'http://shreenarayan.tech/'} target="_blank" rel="noopener noreferrer">
                <span className="bg-gradient-to-l from-indigo-500 via-red-500 to-blue-500 text-transparent bg-clip-text cursor-pointer">
                  Developed by Shreenarayan
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-3 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vend AI. All rights reserved.
          </div>
        </div>
      </footer>
  )
}

export default Footer