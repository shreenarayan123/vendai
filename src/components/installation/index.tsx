
import React from 'react'
import CodeSnippetWrapper from './CodeSnippetWrapper'



const Installation = () => {
    const snippetPath = [
        "src/components/installation/html-snippet.html",
        "src/components/installation/chatbot-iframe.tsx",
        "src/components/installation/layout-code.tsx",
    ]
  return (
    <div className="flex flex-col gap-10 mt-5 md:ml-20">
     <div className='flex flex-col gap-5 '>        
          <p className='text-xl text-black' > Step 1.  <span className='font-medium ml-3 font-customer'>Add your website domain from Sidebar</span></p>
          <p className='text-xl text-black' > Step 2.  <span className='font-medium  ml-3 font-customer'>Choose your techstack</span></p>
      </div>
      <CodeSnippetWrapper path={snippetPath}/>
  </div>  
  )
}

export default Installation