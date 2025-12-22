

import { useForm } from "react-hook-form";
import { Link, useFetcher, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { loginBanner } from "@/assets"
import { LoaderCircle, LoaderCircleIcon } from "lucide-react"
import type { ActionResponse, AuthResponse, ValidationError } from "@/types";
import { InputPassword } from "./InputPassword";

type LoginFieldName = "email" | "password";

const LOGIN_FORM = {
  title: "Welcome back",
  description: "Login to your BitBlog account",
  footerText: "Don't have an account? Sign up",
} as const;

const formSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(50, { message: "Email must be less than 50 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
})


export const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {

  const navigate = useNavigate();
  const fetcher = useFetcher();
  const loginResponse = fetcher.data as ActionResponse<AuthResponse> | undefined; // ok, err, data -> user, accessToken

  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    await fetcher.submit(values, {
      action: "/login",
      method: "post",
      encType: "application/json"
    })
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold">
                    {LOGIN_FORM.title}
                  </h1>

                  <p className="text-muted-foreground text-balance">
                    {LOGIN_FORM.description}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          {...field}
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
                    <FormItem className="grid gap-3">
                      <FormLabel>Password</FormLabel>

                      <FormControl>
                        <InputPassword
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <LoaderCircleIcon className="animate-spin" />}
                  <span>Login</span>
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                {LOGIN_FORM.footerText}{" "}
                <Link
                  to="/signup"
                  className="underline underline-offset-4 hover:text-primary"
                  viewTransition
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>

          <figure className="bg-muted relative hidden md:block">
            <img
              src={loginBanner}
              alt="Login Banner"
              width={400}
              height={400}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </figure>
        </CardContent>
      </Card>
    </div>
  )
}
