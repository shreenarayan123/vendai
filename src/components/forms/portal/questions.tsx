import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'

type Props = {
  questions: string[]
  register: UseFormRegister<FieldValues>
  error: FieldErrors<FieldValues>
  onNext(): void
}

const QuestionsForm = ({ questions, register, error, onNext }: Props) => {
  return (
    <div className="flex flex-col gap-5 justify-center">
    <div className="flex justify-center">
      <h2 className="text-4xl font-bold mb-5">Details</h2>
    </div>
    {questions.map((question, index) => (
      <FormGenerator
        defaultValue={ ''}
        key={index}
        name={`question-${index}`}
        errors={error}
        register={register}
        label={question}
        type="text"
        inputType="input"
        placeholder={'I would like to know enterpise plan for my business'}
      />
    ))}

    <Button
      className=""
      type="button"
      onClick={onNext}
    >
      Next
    </Button>
  </div>
  )
}

export default QuestionsForm