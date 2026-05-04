'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import Highlight from 'react-highlight';
import "highlight.js/styles/atom-one-dark.css";

type CodeHighlightProps = {
    code:string;
    lang:'javascript'|'jsx' | 'tsx';
}

const CodeHightLight = ({code, lang}: CodeHighlightProps) => {
    const [copied, setCopied] = useState(false);
  return (
   <div className='relative p-3'>
    <Button
    size="icon"
       onClick={()=>{
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
       }}
       className='absolute top-3 right-3'
    >
        {copied ? <Check className='h-4 w-4 text-white' /> : <Copy className='h-4 w-4 text-white' /> }
    </Button>
    <div>
        <Highlight className={cn('h-full', lang)} >
            {code}
        </Highlight>
    </div>
   </div>
  )
}

export default CodeHightLight