"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface GoogleAuthButtonProps {
  onSignIn: () => Promise<void>;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onSignIn }) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await onSignIn();
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
    >
      <FcGoogle size={20} />
      {loading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
};

const SignInPage: React.FC = () => {

  const router = useRouter();
  const { data, status } = useSession();
  if (status === "loading") {
    return;
  } else if (data) {
    router.replace("/userboard");
  }

  const handleGoogleSignIn = async () => {
    signIn("google");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#fffef7] text-black p-4">
      <Card className="w-full max-w-md p-6 shadow-md">
        <CardContent className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <p className="text-sm text-red-500 mb-6">Use your KIIT email ID to sign in</p>
          <GoogleAuthButton onSignIn={handleGoogleSignIn} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;