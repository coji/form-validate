'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useFormData } from 'conform-react'
import { resolveZodResult } from 'conform-zod'
import { LoaderIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { createPost } from './action'
import { formSchema } from './schema'
import { useForm } from './use-form'

export default function TestPage() {
  const [result, action, isPending] = useActionState(createPost, null)
  const {
    form,
    fields: { email, memo, option },
    intent,
  } = useForm({
    lastResult: result?.lastResult,
    onValidate: (value) => resolveZodResult(formSchema.safeParse(value)),
    defaultValue: { email: 'foobar@example.com' },
  })
  const optionValue = useFormData(form.id, (formData) =>
    formData?.get('option'),
  )

  // Show toast when post is created
  useEffect(() => {
    if (result?.value)
      toast.success(
        `Post created: ${result.value.email} ${result.value.option ? `(${result.value.option})` : ''}`,
      )
  }, [result?.value])

  return (
    <form {...form.props} action={action} className="grid gap-4">
      <div className="grid gap-1">
        <Label htmlFor={email.id}>Email</Label>
        <Input placeholder="email" {...email.props} />
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
          defaultChecked={option.defaultValue === 'on'}
          aria-invalid={option.invalid}
          aria-describedby={option.invalid ? option.errorId : undefined}
          onCheckedChange={(checked) => {
            intent.update({
              name: option.name,
              value: checked ? 'on' : '',
            })
          }}
        />
        <Label htmlFor={option.id}>オプション</Label>
      </div>

      {optionValue === 'on' && (
        <div className="grid gap-1">
          <Label htmlFor={memo.id}>Memo</Label>
          <Input placeholder="memo" {...memo.props} />
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
