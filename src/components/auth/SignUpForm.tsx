import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export function SignUpForm() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your details to get started</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Name"
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <Button className="w-full" type="submit">
            Sign up
          </Button>
        </form>
        <div className="text-center text-sm">
          <Button 
            variant="link" 
            onClick={() => navigate("/signin")}
          >
            Already have an account? Sign in
          </Button>
        </div>
      </Card>
    </div>
  )
}
