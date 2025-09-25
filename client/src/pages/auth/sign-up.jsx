import * as React from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Apple } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

const SignUp = () => {

  const { itemVariants } = useOutletContext();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName : "",
    email : "",
    password : "",
  });

  const handleSignUp = async (e) =>{
    e.preventDefault();
    try {
        const result = await signUp({fullName : formData.fullName, email : formData.email, password : formData.password});
        if(result.success) {
          navigate("/dashboard/home")
        }
    } catch (err) {
      console.error("Error signing up", err);
    }
  }

  return (
    <>
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button variant="outline">
          Google
        </Button>
        <Button variant="outline">
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="relative mb-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </motion.div>

      <motion.form onSubmit = {handleSignUp} variants={itemVariants} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" >Full Name</Label>
          <Input id="name" type="text" name="fullName" className="mt-2" value={ formData.fullName} onChange={(e) => setFormData({...formData, fullName : e.target.value })} placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" className="mt-2" value={ formData.email} onChange={(e) => setFormData({...formData, email : e.target.value })} placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" className="mt-2" value={ formData.password} onChange={(e) => setFormData({...formData, password : e.target.value })} required />
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" required />
        </div> */}
        <Button type="submit" className="w-full" variant="outline" onClick={handleSignUp}>
          Sign Up
        </Button>
      </motion.form>

      <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <a onClick={() => navigate("/auth/signin")} className="font-medium hover:underline">
          Sign in
        </a>
      </motion.p>
    </>
  );
};

export default SignUp;