'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { LoaderIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { createPost } from './action'
import { formSchema } from './schema'

export default function TestPage() {
  const [result, action, isPending] = useActionState(createPost, null)
  const [form, { email }] = useForm({
    lastResult: result?.lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: formSchema }),
    defaultValue: { email: 'foobar@example.com' },
  })

  // Show toast when post is created
  useEffect(() => {
    if (result?.value) toast.success(`Post created: ${result.value.email}`)
  }, [result?.value])

  return (
    <form {...getFormProps(form)} action={action} className="grid gap-4">
      <div className="grid gap-1">
        <Label htmlFor={email.id}>Email</Label>
        <Input
          placeholder="email"
          {...getInputProps(email, { type: 'email' })}
          key={email.key}
        />
        {email.errors && (
          <p id={email.errorId} className="text-sm text-red-500">
            {email.errors}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending && <LoaderIcon className="animate-spin" />} Submit
      </Button>

      {result?.value && (
        <div>
          <Badge variant="secondary">Last Result</Badge> Post created:{' '}
          {result.value.email}
        </div>
      )}
    </form>
  )
}
