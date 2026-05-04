import {
    onChatBotImageUpdate,
    onCreateCompanyInfo,
    onCreateFilterQuestions,
    onDeletUserDomain,
    onGetAllCompanyInfo,
    onGetAllFilterQuestions,
    onUpdateDomain,
    onUpdatePassword,
    onUpdateWelcomeMessage,
  } from '@/actions/settings'
  import {
    ChangePasswordProps,
    ChangePasswordSchema,
  } from '@/schemas/auth.schema'
  import {
    CompanyInfoSchema,
    CompanyInfoProps,
    DomainSettingsProps,
    DomainSettingsSchema,
    FilterQuestionsProps,
    FilterQuestionsSchema,
  } from '@/schemas/settings.schema'
  import { zodResolver } from '@hookform/resolvers/zod'
  import { UploadClient } from '@uploadcare/upload-client'
  import { useTheme } from 'next-themes'
  import { useRouter } from 'next/navigation'
  import { useEffect, useState } from 'react'
  import { useForm } from 'react-hook-form'
import { useToast } from '../use-toast'
  
  const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
  })
  
  export const useThemeMode = () => {
    const { setTheme, theme } = useTheme()
    return {
      setTheme,
      theme,
    }
  }
  
  export const useChangePassword = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<ChangePasswordProps>({
      resolver: zodResolver(ChangePasswordSchema),
      mode: 'onChange',
    })
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
  
    const onChangePassword = handleSubmit(async (values) => {
      try {
        setLoading(true)
        const updated = await onUpdatePassword(values.password)
        if (updated) {
          reset()
          setLoading(false)
          toast({ title: 'Success', description: updated.message })
        }
      } catch (error) {
        console.log(error)
      }
    })
    return {
      register,
      errors,
      onChangePassword,
      loading,
    }
  }
  
  export const useSettings = (id: string) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<DomainSettingsProps>({
      resolver: zodResolver(DomainSettingsSchema),
    })
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<boolean>(false)
  
    const onUpdateSettings = handleSubmit(async (values) => {
      setLoading(true)
      if (values.domain) {
        const domain = await onUpdateDomain( values.domain, id)
        const domainName = values.domain.split('.')[0]
        if (domain) {
          router.push(`/settings/${domainName}`);
          toast({
            title: 'Success',
            description: domain.message,
          })
        }
      }
      if (values.image[0]) {
        const uploaded = await upload.uploadFile(values.image[0])
        const image = await onChatBotImageUpdate(id, uploaded.uuid)
        if (image) {
          toast({
            title: image.status == 200 ? 'Success' : 'Error',
            description: image.message,
          })
          setLoading(false)
        }
      }
      if (values.welcomeMessage) {
        const message = await onUpdateWelcomeMessage(values.welcomeMessage, id)
        if (message) {
          toast({
            title: 'Success',
            description: message.message,
          })
        }
      }
      reset()
      router.refresh()
      setLoading(false)
    })
  
    const onDeleteDomain = async () => {
      setDeleting(true)
      const deleted = await onDeletUserDomain(id)
      if (deleted) {
        toast({
          title: 'Success',
          description: deleted.message,
        })
        setDeleting(false)
        router.push('/dashboard')
      }
    }
    return {
      register,
      onUpdateSettings,
      errors,
      loading,
      onDeleteDomain,
      deleting,
    }
  }

  export const useCompanyInfo = (id:string) =>{
    const { register, handleSubmit,
      formState:{errors}, 
      reset,
    } = useForm<CompanyInfoProps>({
      resolver:zodResolver(CompanyInfoSchema)
    })
    const {toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false)
    const [isCompanyInfo, setIsCompanyInfo] = useState<
     string[] | undefined
    >([])
    const onAddCompanyInfo = handleSubmit(async (values) => {
      setLoading(true);
      const info = await onGetAllCompanyInfo(id);
      const existingInfo = info?.data;    

      let businessInfo;
      if (existingInfo?.length === 0) {
        businessInfo = Array.isArray(values.companyInfo) ? values.companyInfo : [values.companyInfo];
      } else if (existingInfo !== undefined && existingInfo.length > 0) {
        businessInfo = Array.isArray(values.companyInfo) 
          ? [...existingInfo, values.companyInfo] 
          : [...existingInfo, values.companyInfo];
      }
      
      const data = await onCreateCompanyInfo(id, businessInfo || []);
      if (data) {
        setIsCompanyInfo(data.data);
        toast({
          title: data.status == 200 ? 'Success' : 'Error',
          description: data.message
        });
        reset()
        setLoading(false);
      }
    });
    const onGetCompanyInfo = async ()=>{
      setLoading(true)
      const info = await onGetAllCompanyInfo(id)
      if(info){
        setIsCompanyInfo(info.data)
        setLoading(false)
      }
    }

    useEffect(()=>{
      onGetCompanyInfo()
    },[])
    return {
      register,
      onAddCompanyInfo,
      errors,
      loading,
      isCompanyInfo
    }
  }
  
  export const useFilterQuestions = (id: string) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<FilterQuestionsProps>({
      resolver: zodResolver(FilterQuestionsSchema),
    })
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [isQuestions, setIsQuestions] = useState<
      { id: string; question: string }[]
    >([])
  
    const onAddFilterQuestions = handleSubmit(async (values) => {
      setLoading(true)
      const questions = await onCreateFilterQuestions(id, values.question)
      if (questions) {
        setIsQuestions(questions.questions!)
        toast({
          title: questions.status == 200 ? 'Success' : 'Error',
          description: questions.message,
        })
        reset()
        setLoading(false)
      }
    })
  
    const onGetQuestions = async () => {
      setLoading(true)
      const questions = await onGetAllFilterQuestions(id)
      if (questions) {
        setIsQuestions(questions.questions)
        setLoading(false)
      }
    }
  
    useEffect(() => {
      onGetQuestions()
    }, [])
  
    return {
      loading,
      onAddFilterQuestions,
      register,
      errors,
      isQuestions
    }
  }
  