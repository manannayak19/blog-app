"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import { Key, Lock, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUserAction } from "@/actions/login";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long!" }),
});

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      const result = await loginUserAction(formData);
      if (result.success) {
        toast.success("Login successful", {
          description: result.success,
        });
        router.push("/")
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (e) {
      console.log(e);
      toast.error("Login failed", {
        description: e?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400"></Mail>
          <Input
            type="email"
            {...register("email")}
            placeholder="Email"
            disabled={isLoading}
            className="pl-10 bg-gray-50 border-gray-300 text-gray-900 focus: ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400"></Lock>
          <Input
            type="password"
            {...register("password")}
            placeholder="Password"
            disabled={isLoading}
            className="pl-10 bg-gray-50 border-gray-300 text-gray-900 focus: ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-1 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-102"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
