"use client";
import React, { useState } from "react";

// FORM

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const loginValidation = z.object({
  email: z.string().email().min(1, {
    message: "Invalid Email",
  }),
  password: z.string().min(0),
});

// UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Knowledge from "@/public/svg/knowledge.svg";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// NEXTAUTH
import { signIn, signOut } from "next-auth/react";
//ROUTER
import { useRouter } from "next/navigation";
//ISONBOARDED
import { isOnboarded } from "@/lib/actions/user.action";


const LoginComponent = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    console.log(values);
    
    const email = values.email;
    const password = values.password;
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then(async ({ok,error}) => {
        if (ok) {
          console.log("success");
          const onboarded = await isOnboarded({email});
          if(onboarded){
            router.push("/dashboard");
          }else if (!onboarded && password != ""){
            router.push("/onboarding");
          }else{
            router.push("/messages")
          }

        } else {
          console.log("error:",error)
          
        }
      })

    
  }

  return (
    <>
      <h2 className="text-4xl font-bold text-left text-main-500">Log In</h2>
      <Card className="w-[350px] bg-white/70 border border-slate-50 shadow-none">
        <CardHeader className="mb-2">
          <CardTitle className="font-medium text-main-500">
            Learning Management System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main-500">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Email Address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-main-500">Password</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="Password"
                        />
                        {showPassword ? (
                          <Button
                            type="button"
                            variant={"ghost"}
                            onClick={() => setShowPassword(false)}
                            className="absolute w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                          >
                            <EyeOffIcon className="w-full h-full" />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant={"ghost"}
                            onClick={() => setShowPassword(true)}
                            className="absolute w-6 h-6 p-1 -translate-y-1/2 rounded-full right-4 top-1/2"
                          >
                            <EyeIcon className="w-full h-full" />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-lg font-bold">
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Image
        src={Knowledge}
        alt="Knowledge"
        width={340}
        className="absolute bottom-10 right-10"
      />
    </>
  );
};

export default LoginComponent;
