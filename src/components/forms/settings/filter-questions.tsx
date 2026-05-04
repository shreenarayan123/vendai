'use client'
import React, { useEffect, useState } from 'react'
import Section from '@/components/section-label'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { useFilterQuestions} from '@/hooks/settings/use-settings'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import { onDeleteFilterQuestion } from '@/actions/settings'
import { Trash2 } from 'lucide-react'
type Props = {
    id:string
}

const FilterQuestions = ({id}: Props) => {
    const { register, errors, onAddFilterQuestions, isQuestions, loading } =
    useFilterQuestions(id)
      const [domainFilterQuestions, setDomainFilterQuestions] = useState(isQuestions);
      const handleDelete = async (index:number, id:string) => {
        const result = await onDeleteFilterQuestion(index, id);
        if (result?.status === 200) {
        const questions = result.data?.map((question) => ({
          id: question.id,
          question: question.question,
        })) || [];
        setDomainFilterQuestions(questions);
        }
      };
      useEffect(() => {
        setDomainFilterQuestions(isQuestions);
        }, [isQuestions]);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Bot Questions</CardTitle>
        <form
          onSubmit={onAddFilterQuestions}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a question that you want your chatbot to ask"
            />
            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              form="filter-questions-form"
              name="question"
              placeholder="Type your question"
              type="text"
            />
          </div>
          <Button
            type="submit"
            className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            Create
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {domainFilterQuestions?.length ? (
            domainFilterQuestions?.map((question, index) => (
              <span className='flex items-center gap-2' key={index}>
                <p
                key={question.id}
                className="font-bold"
              >
                {question.question}
              </p>
              <Button className='bg-transparent hover:bg-transparent' onClick={()=>handleDelete(index, id) }><Trash2 color="black" /></Button>

              </span>              
            ))
          ) : (
            <CardDescription>No Questions</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  )
}

export default FilterQuestions