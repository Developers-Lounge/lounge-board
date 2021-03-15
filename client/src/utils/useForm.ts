import { useCallback } from 'react'
import { Schema } from 'yup'
import { useForm as useFormOriginal } from 'react-hook-form'
import {
  FieldValues,
  UseFormMethods,
  UseFormOptions,
} from 'react-hook-form/dist/types'

const useYupValidationResolver = <T, C>(validationSchema?: Schema<T, C>) =>
  useCallback(
    async (data) => {
      if (!validationSchema) return { values: data, errors: {} }

      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (
              allErrors: Record<string, unknown>,
              currentError: { path: string; type?: string; message: string },
            ) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        }
      }
    },
    [validationSchema],
  )

export function useForm<
  T,
  C,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends Record<string, unknown> = Record<string, unknown>
>({
  schema,
  ...params
}: UseFormOptions<TFieldValues, TContext> & {
  schema?: Schema<T, C>
} = {}): UseFormMethods<
  Exclude<ReturnType<Schema<T, C>['validateSync']>, undefined>
> {
  const resolver = useYupValidationResolver(schema)
  return useFormOriginal({
    ...params,
    resolver,
  }) as any // eslint-disable-line
}
