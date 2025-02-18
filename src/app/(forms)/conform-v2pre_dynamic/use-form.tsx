import {
  getMetadata,
  isInput,
  useFormControl,
  useFormState,
  type Constraint,
  type DefaultValue,
  type Fieldset,
  type Field as FieldType,
  type FormControlOptions,
} from 'conform-react'
import type React from 'react'
import { useId } from 'react'

interface FormOptions<FormShape, ErrorShape, Value>
  extends FormControlOptions<FormShape, ErrorShape, Value> {
  id?: string
  defaultValue?: NoInfer<DefaultValue<FormShape>>
  constraint?: Constraint
}

export type FormMetadata<ErrorShape = string[]> = ReturnType<
  typeof useForm<unknown, ErrorShape, unknown>
>['form']

export type FieldMetadata<FieldShape, ErrorShape = string[]> = FieldType<
  FieldShape,
  ReturnType<
    typeof useForm<unknown, ErrorShape, unknown>
  >['fields'] extends Fieldset<unknown, infer Metadata>
    ? Metadata
    : never
>

export function useForm<FormShape, ErrorShape = string[], Value = undefined>(
  options: FormOptions<FormShape, ErrorShape, Value>,
) {
  const fallbackFormId = useId()
  const formId = options.id ?? fallbackFormId
  const [status, updateStatus] = useFormState(
    (status: 'success' | 'error' | null, { result }) => {
      if (result.intent !== null) {
        return null
      }

      if (typeof result.error === 'undefined') {
        return status
      }

      return result.error === null ? 'success' : 'error'
    },
    {
      initialState: null,
    },
  )
  const { state, handleSubmit, intent } = useFormControl(formId, {
    ...options,
    onUpdate(update) {
      updateStatus(update)
      options.onUpdate?.(update)
    },
  })
  const { form, fields } = getMetadata(state, {
    defaultValue: options.defaultValue,
    constraint: options.constraint,
    defineFormMetadata(metadata) {
      return Object.assign(metadata, {
        get id() {
          return formId
        },
        get status() {
          return status
        },
        get errorId() {
          return `${this.id}-error`
        },
        get props() {
          return {
            id: formId,
            onSubmit: handleSubmit,
            onBlur(event) {
              if (isInput(event.target)) {
                intent.validate(event.target.name)
              }
            },
            noValidate: true,
            'aria-invalid': metadata.invalid || undefined,
            'aria-describedby': metadata.invalid ? this.errorId : undefined,
          } satisfies React.DetailedHTMLProps<
            React.FormHTMLAttributes<HTMLFormElement>,
            HTMLFormElement
          >
        },
      })
    },
    defineFieldMetadata(name, metadata) {
      return Object.assign(metadata, {
        get id() {
          return `${formId}-${name}`
        },
        get errorId() {
          return `${this.id}-error`
        },
        get props() {
          return {
            id: this.id,
            name: name,
            required: metadata.required,
            minLength: metadata.minLength,
            maxLength: metadata.maxLength,
            min: metadata.min,
            max: metadata.max,
            step: metadata.step,
            pattern: metadata.pattern,
            multiple: metadata.multiple,
            'aria-invalid': metadata.invalid || undefined,
            'aria-describedby': metadata.invalid ? this.errorId : undefined,
          }
        },
      })
    },
  })

  return {
    form,
    fields,
    intent,
  }
}
