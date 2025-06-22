import '../css/loginform.css'

export default function LoginForm() {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" name="user_id" defaultValue="Username" />
      <br />
      <input type="password" name="user_pass" />
      <br />
      <button type="submit">Entrer</button>
    </form>
  )
}
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  console.log(event)
}
