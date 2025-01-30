'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { createPost } from './action'
import { formSchema, type FormSchema } from './schema'

export default function TestPage() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })
  const [state, action, pending] = useActionState(createPost, false)

  return (
    <Form control={control} action={action}>
      <Label htmlFor="title">Title</Label>
      <Input {...register('title')} type="text" placeholder="title" />

      {errors.title && <p>{errors.title.message}</p>}

      <Button type="submit" disabled={pending}>
        Submit
      </Button>
    </Form>
  )
}
