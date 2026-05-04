
import { postToParent, pusherClient } from '@/lib/utils'
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from '@/schemas/conversation.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { UploadClient } from '@uploadcare/upload-client'
import { useForm } from 'react-hook-form'
import { onAiChatBotAssistant, onGetCurrentChatBot } from '@/actions/bot'
import { useSearchParams } from 'next/navigation'

const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
  })

  export const useChatBot = ()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ChatBotMessageProps>({
        resolver: zodResolver(ChatBotMessageSchema),
      })
      const [currentBot, setCurrentBot] = useState<
    | {
        name: string
        chatBot: {
          id: string
          icon: string | null
          welcomeMessage: string | null
          background: string | null
          textColor: string | null
        } | null
      }
    | undefined
  >()

  const messageWindowRef = useRef<HTMLDivElement>(null)
  const [botOpened, setBotOpened ] = useState(false);
  const onOpenChatBot = () => setBotOpened((prev) => !prev);
  const [loading  , setLoading] = useState<boolean>(false);
  const [onChats, setOnChats] = useState<
    { role: 'assistant' | 'user'; content: string; link?: string }[]
  >([])
  const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
  const [currentBotId, setCurrentBotId] = useState<string>();
  const [onRealTime, setOnRealTime] = useState<
  { chatroom: string; mode: boolean } | undefined
>(undefined)
const searchParams = useSearchParams();
const id = searchParams.get('id');
  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }
  useEffect(()=>{
    onScrollToBottom()
  }, [onChats, messageWindowRef])

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: botOpened ? 550 : 550,
        height: botOpened ? 800 : 800,
      })
    )
  }, [botOpened])
  let limitRequest = 0;
  
  const onGetDomainChatBot = async(id:string)=>{
    setCurrentBotId(id)
    const chatBot = await onGetCurrentChatBot(id);
    if(chatBot){
        setOnChats((prev)=>[
            ...prev, {
                role:'assistant',
                content:chatBot.chatBot?.welcomeMessage!,
            },
        ])
        setCurrentBot(chatBot)
        setLoading(false)
    }
  }
  useEffect(()=>{
        if(limitRequest < 1 && typeof id == 'string'){
            onGetDomainChatBot(id)
            limitRequest++
        }
    // })
  },[])
  const onStartChatting  = handleSubmit(async(data)=>{
    if(data.image.length){
        console.log('image from user', data.image[0])
        const uploaded = await upload.uploadFile(data.image[0]);
        if(!onRealTime?.mode){
            setOnChats((prev)=>[
                ...prev, {
                    role:'user',
                    content:uploaded.uuid,
                }
            ])
        }
        console.log('🟡 RESPONSE FROM UC', uploaded.uuid)
        setOnAiTyping(true)
        const response = await onAiChatBotAssistant(
            currentBotId!,
            onChats, 
            'user',
            uploaded.uuid
        )
        if (response) {
            setOnAiTyping(false)
            if (response.live) {
              setOnRealTime((prev) => ({
                ...prev,
                chatroom: response.chatRoom,
                mode: response.live,
              }))
            } else {
              setOnChats((prev: any) => [...prev, response.response])
            }
          }

    }
    if (data.content) {
        if (!onRealTime?.mode) {
          setOnChats((prev: any) => [
            ...prev,
            {
              role: 'user',
              content: data.content,
            },
          ])
        }
  
        setOnAiTyping(true)
  
        const response = await onAiChatBotAssistant(
          currentBotId!,
          onChats,
          'user',
          data.content
        )
  
        if (response) {
          setOnAiTyping(false)
          if (response.live) {
            setOnRealTime((prev) => ({
              ...prev,
              chatroom: response.chatRoom,
              mode: response.live,
            }))
          } else {
            setOnChats((prev: any) => [...prev, response.response])
          }
        }
      }
    })
  
    return {
      botOpened,
      onOpenChatBot,
      onStartChatting,
      onChats,
      register,
      onAiTyping,
      messageWindowRef,
      currentBot,
      loading,
      setOnChats,
      onRealTime,
      errors,
    }
  }
  export const useRealTime = (
    chatRoom: string,
    setChats: React.Dispatch<
      React.SetStateAction<
        {
          role: 'user' | 'assistant'
          content: string
          link?: string | undefined
        }[]
      >
    >
  ) => {
    const counterRef = useRef(1)
  
    useEffect(() => {
      pusherClient.subscribe(chatRoom)
      pusherClient.bind('realtime-mode', (data: any) => {
        console.log('✅', data)
        if (counterRef.current !== 1) {
          setChats((prev: any) => [
            ...prev,
            {
              role: data.chat.role,
              content: data.chat.message,
            },
          ])
        }
        counterRef.current += 1
      })
      return () => {
        pusherClient.unbind('realtime-mode')
        pusherClient.unsubscribe(chatRoom)
      }
    }, [])
  }
  
  