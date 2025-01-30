'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const handleSuccess = async ({ response }: { response: Response }) => {
    toast.success(`success!: ${JSON.stringify(await response.json())}`)
    reset()
  }

  return (
    <Form
      control={control}
      action="/rhf_form/api"
      method="post"
      onSuccess={handleSuccess}
      className="grid gap-4"
    >
      <div className="grid gap-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="title"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  )
}
