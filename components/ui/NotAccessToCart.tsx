import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import SignInButton from "@/components/ui/SignInButton";
import SignUpButton from "./SignUpButton";

const NotAccessToCart = () => {
  return (
    <div className="flex justify-center items-center min-h-screen py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center items-center">
            <h1 className="text-xl font-bold">TimberCraft</h1>
          </div>
          <CardTitle className="text-2xl font-semibold text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Log in to view your cart items and checkout. Don&apos;t miss out on
            your favorite products!{" "}
          </p>
          <SignInButton>
            <Button className="w-full font-semibold" size="lg">
              Sign in
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div>Don&apos;t have an account?</div>
          <SignUpButton>
            <Button variant="outline" className="w-full size-lg text-black">
              Create an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotAccessToCart;