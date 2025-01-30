'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { createPost } from './action'
import { formSchema } from './schema'

export default function TestPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, isPending] = useActionState(createPost, null)

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={action}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="grid gap-4"
      >
        <div className="grid gap-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="title"
            {...form.register('name', { required: 'Name is required' })}
          />
          {form.formState.errors.name && (
            <p className="text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email"
            {...form.register('email', { required: 'Email is required' })}
          />
          {form.formState.errors.email && (
            <p className="text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>

        <div>{JSON.stringify(state)}</div>
        <div>{JSON.stringify(isPending)}</div>
      </form>
    </Form>
  )
}
