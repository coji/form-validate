'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { formSchema, type FormSchema } from './schema'

export default function TestPage() {
  const {
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    progressive: true,
  })

  return (
    <Form
      control={control}
      action="/test/api"
      method="post"
      onSubmit={(data) => {
        console.log('onSubmit', data)
      }}
      onSuccess={async ({ response }) => {
        console.log('success!', await response.json())
        reset()
      }}
      className="flex flex-col gap-4"
    >
      <fieldset className="flex flex-col gap-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
          type="text"
          placeholder="title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </fieldset>

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  )
}
