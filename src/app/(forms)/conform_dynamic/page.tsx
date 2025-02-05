'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { LoaderIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { createPost } from './action'
import { formSchema } from './schema'

export default function TestPage() {
  const [result, action, isPending] = useActionState(createPost, null)
  const [form, { email, option, memo }] = useForm({
    lastResult: result?.lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: formSchema }),
    defaultValue: { email: 'foobar@example.com' },
  })

  // Show toast when post is created
  useEffect(() => {
    if (result?.value)
      toast.success(
        `Post created: ${result.value.email} ${result.value.option ? `(${result.value.option})` : ''}`,
      )
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

      <div className="flex flex-row items-center gap-2">
        <Switch
          key={option.key}
          id={option.id}
          name={option.name}
          required={option.required}
          defaultChecked={option.initialValue === 'on'}
          aria-invalid={!option.valid || undefined}
          aria-describedby={!option.valid ? option.errorId : undefined}
          onCheckedChange={(checked) => {
            form.update({
              name: option.name,
              value: checked ? 'on' : undefined,
            })
          }}
        />
        <Label htmlFor={option.id}>オプション</Label>
      </div>

      {option.value === 'on' && (
        <div className="grid gap-1">
          <Label htmlFor={memo.id}>Memo</Label>
          <Input
            placeholder="memo"
            {...getInputProps(memo, { type: 'text' })}
            key={memo.key}
          />
          {memo.errors && (
            <p id={memo.errorId} className="text-sm text-red-500">
              {memo.errors}
            </p>
          )}
        </div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending && <LoaderIcon className="animate-spin" />} Submit
      </Button>

      {result?.value && (
        <div>
          <Badge variant="secondary">Last Result</Badge> Post created:{' '}
          {result.value.email} {result.value.option && `(${result.value.memo})`}
        </div>
      )}
    </form>
  )
}
