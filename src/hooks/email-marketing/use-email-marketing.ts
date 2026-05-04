import {
    onAddCustomersToEmail,
    onBulkMailer,
    onCreateMarketingCampaign,
    onGetAllCustomerResponses,
    onGetEmailTemplate,
    onSaveEmailTemplate,
  } from '@/actions/mail'
  import {
    EmailMarketingBodySchema,
    EmailMarketingSchema,
  } from '@/schemas/marketing.schema'
  import { zodResolver } from '@hookform/resolvers/zod'
  import { useRouter } from 'next/navigation'
  import { useEffect, useState } from 'react'
  import { useForm } from 'react-hook-form'
import { useToast } from '../use-toast'

  export const useEmailMarketing = ()=>{
    const [isSelected, setIsSelected] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [campaignId, setCampaignId] = useState<string | undefined>()
    const [processing, setProcessing] = useState<boolean>(false)
    const [isId, setIsId] = useState<string | undefined>(undefined)
    const [editing, setEditing] = useState<boolean>(false)
    
    const { register,handleSubmit, formState:{errors}, reset} = useForm({
        resolver:zodResolver(EmailMarketingSchema),
    })
    const {
        register: registerEmail,
        formState: { errors: emailErrors },
        handleSubmit: SubmitEmail,
        setValue,
      } = useForm({
        resolver: zodResolver(EmailMarketingBodySchema),
      })

      const { toast} = useToast()
      const router = useRouter();

      const onCreateCampaign = handleSubmit(async ( data)=>{
        try {
            setLoading(true)
            const campaign = await onCreateMarketingCampaign(data.name)
            if(campaign){
                reset()
                toast({
                    title:'Success',
                    description:campaign.message,
                })
                setLoading(false)
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
      })
      const onCreateEmailTemplate = SubmitEmail(async(data)=>{
        try {
            setEditing(true)
            const template = JSON.stringify(data.description)
            const emailTemplate = await onSaveEmailTemplate(template, campaignId!)
            if(emailTemplate){
                toast({
                    title:'Success',
                    description:emailTemplate.message,
                })
                setEditing(false)
            }
        } catch (error) {
            console.log(error);
        }
      })
      const onSelectCampaign = (id:string)=> setCampaignId(id)

      const onAddCustomersToCampaign = async ()=>{
        try {
            setProcessing(true)
            const customerAdded = await onAddCustomersToEmail(isSelected, campaignId!)
            if(customerAdded){
                toast({
                    title:'Success',
                    description:customerAdded.message,
                })
                setProcessing(false)
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
      }

      const onSelectedEmails = (email:string)=>{
        const duplicate = isSelected.find((e)=>e == email)
        if(duplicate){
            setIsSelected(isSelected.filter((e)=>e! == email))
        }else{
            setIsSelected((prev)=>[...prev, email])
        }
      }

      const onBulkEmail = async (email:string[], campaignId:string)=>{
        try {
            const mails = await onBulkMailer(email, campaignId)
            if(mails){
                toast({
                    title:'Success',
                    description:mails.message,
                })
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
      }
      const onSetAnswersId = (id:string)=> setIsId(id)

      return {
        onSelectedEmails,
        isSelected,
        onCreateCampaign,
        register,
        errors,
        loading,
        onSelectCampaign,
        processing,
        campaignId,
        onAddCustomersToCampaign,
        onBulkEmail,
        onSetAnswersId,
        isId,
        registerEmail,
        emailErrors,
        onCreateEmailTemplate,
        editing,
        setValue,
      }
  }

  export const useAnswers = (id:string)=>{
    const [answers, setAnswers] = useState<
    {
      customer: {
        questions: { question: string; answered: string | null }[]
      }[]
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const onGetCustomerAnswers = async () => {
    try {
      setLoading(true)
      const answer = await onGetAllCustomerResponses(id)
      setLoading(false)
      if (answer) {
        setAnswers(answer)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onGetCustomerAnswers()
  }, [])

  return { answers, loading }
}

export const useEditEmail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [template, setTemplate] = useState<string>('')

  const onGetTemplate = async (id: string) => {
    try {
      setLoading(true)
      const email = await onGetEmailTemplate(id)
      if (email) {
        setTemplate(email)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onGetTemplate(id)
  }, [])

  return { loading, template }
}
