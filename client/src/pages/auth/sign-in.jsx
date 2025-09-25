import * as React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Apple } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const { itemVariants } = useOutletContext();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = React.useState({
    email : "",
    password : "",
  })

  const handleSignIn = async(e) => {
    e.preventDefault();
    try {
      const response = await signIn({email: formData.email, password: formData.password});
      console.log(response)
      if(response.success) {
        navigate("/dashboard/home")
      }
    } catch (error) {
      console.error("Error signing in", error);
    }
  }
  return (
    <>
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button variant="outline">
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline">
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </motion.div>

      <motion.form onSubmit={handleSignIn} variants={itemVariants} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        </div>
        <Button type="submit" className="w-full cursor-pointer" variant="outline">
          Sign In
        </Button>
      </motion.form>

      <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <a onClick={() => navigate("/auth/signup")} className="font-medium hover:underline">
          Sign up
        </a>
      </motion.p>
    </>
  );
}