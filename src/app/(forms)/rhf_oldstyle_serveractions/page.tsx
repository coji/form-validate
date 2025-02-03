'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { createPost } from './action'
import { formSchema } from './schema'

type FormData = z.infer<typeof formSchema>

export default function TestPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: 'foobar@example.com' },
  })
  const formRef = useRef<HTMLFormElement>(null)
  const [lastResult, action, isPending] = useActionState(createPost, null)

  useEffect(() => {
    if (lastResult) {
      form.reset({ email: '' })
      toast.success(`Post created: ${lastResult.email}`)
    }
  }, [lastResult, form])

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={action}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="grid gap-4"
      >
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

        {lastResult && (
          <div>
            <Badge variant="secondary">Last Result</Badge>
            Post created: {lastResult.email}
          </div>
        )}
      </form>
    </Form>
  )
}
