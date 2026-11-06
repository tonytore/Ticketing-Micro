import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { toast } from '@/components/ui/toast'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import axios from 'axios'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be min 6.'),
})

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await axios.post('http://ticketing.dev/api/users/signup', {
        email: value.email,
        password: value.password,
      })

      console.log(res.data)
      toast.add({
        title: 'Login',
        description: `Email: ${value.email}, Password: ${value.password}`,
        type: 'success',
      })
    },
  })
  return (
    <div className="flex flex-col gap-6 rounded-lg border-2 p-6 md:p-10 text-white h-screen">
      <h1 className="text-center text-2xl font-bold">Login</h1>

      <div className="flex flex-col gap-4 ">
        <form.Field
          name="email"
          validators={{
            onChange: z.string().email('must be a valid email'),
          }}
        >
          {(field) => (
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name}>Email</label>
                <Input
                  id={field.name}
                  name={field.name}
                  className="border rounded-none p-2"
                  value={field.state.value}
                  type="email"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 ? (
                <em className="text-sm text-red-500">
                  {field.state.meta.errors.map((err) => err?.message)}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>
        <form.Field
          name="password"
          validators={{
            onChange: z.string().min(6, 'Password must be min 6 characters'),
          }}
        >
          {(field) => (
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name}>Password</label>
                <Input
                  id={field.name}
                  name={field.name}
                  className="border rounded-none p-2"
                  value={field.state.value}
                  type="password"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
              {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 ? (
                <em className="text-sm text-red-500">
                  {field.state.meta.errors.map((err) => err?.message)}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>
      <Button
        className="cursor-pointer rounded-none p-2 flex-1 mt-[calc(64vh)]"
        variant="emerald"
        onClick={form.handleSubmit}
      >
        Login
      </Button>
    </div>
  )
}

export default LoginForm
