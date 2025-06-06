import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Gift Exchange
        </h1>
        <p className="text-lg leading-8 text-gray-600">
          Make gift-giving meaningful and organized with our gift exchange platform
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button 
            size="lg"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}
