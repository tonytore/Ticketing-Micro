import LoginForm from './loginForm'

export default function LoginPage() {
  return (
    <div className="h-screen max-w-4xl mx-auto">
      <div className="border h-screen bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvb5V8NJ6RvtBiQfA2uIA-s16EMSFYIFmIkorpcZ0IX-i8906GRqgovn4&usqp=CAU)] bg-cover bg-center">
        <LoginForm />
      </div>
    </div>
  )
}
