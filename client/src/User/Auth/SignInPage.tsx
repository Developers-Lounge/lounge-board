import React from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from 'User/Auth/AuthLayout'
import routes from 'routes'
import { object, string } from 'yup'
import { useForm } from 'utils/useForm'
import FloatingInput from 'Shared/Form/FloatingInput'
import Button from 'Shared/Button'
import { login as acceptLogin } from 'User/service'
import { useLoginMutation } from 'generated/graphql'

const LoginSchema = object({
  usernameOrEmail: string().label('Username or email').min(3).required(),
  password: string().label('Password').min(6).required(),
})

export default function SignInPage() {
  const [login, { loading, error }] = useLoginMutation({
    errorPolicy: 'all',
    update(cache, { data }) {
      if (data) acceptLogin(data.login)
    },
  })

  const form = useForm({ schema: LoginSchema })

  const submit = () => {
    login({ variables: form.getValues() })
  }

  return (
    <AuthLayout className="max-w-sm">
      <div className="text-xl text-center">Sign In</div>
      {error && <div className="text-red-500 mt-4 mb-6">{error.message}</div>}
      <form onSubmit={form.handleSubmit(submit)} className="mt-10">
        <FloatingInput
          form={form}
          name="usernameOrEmail"
          label="Username or Email"
        />
        <FloatingInput
          form={form}
          name="password"
          label="Password"
          type="password"
        />
        <Button type="submit" className="btn-primary mt-6" loading={loading}>
          Sign In
        </Button>
        <Link to={routes.signUp} className="btn-secondary mt-3">
          Sign Up
        </Link>
        <div className="text-sm mt-6">
          <div className="flex-center h-5">
            <Link to={routes.forgotPassword} className="link">
              Forgot password?
            </Link>
          </div>
          <div className="flex-center h-5 mt-3">
            <Link to={routes.resendConfirmationInstructions} className="link">
              Didn't receive confirmation instructions?
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
