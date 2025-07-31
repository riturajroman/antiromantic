"use client";

import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/zodSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ButtonLoading } from "@/components/application/ButtonLoading";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = userSchema.pick({
    username: true,
    email: true,
    password: true,
    phone: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  async function signupHandler(data) {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      const signInResponse = await axios.post(`/api/signin`, data);
      if (!signInResponse.data.success) {
        throw new Error(signInResponse.data.message);
      }
      form.reset();
      toast.success("Account created successfully!");
      toast.success("Please verify your email");
      router.push(`/verify-otp?email=${data.email}`);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative z-0 py-14">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="flex items-start justify-start">
            <Image
              src="/sign-in.png"
              alt="signin-image"
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <Image
                src="/favicon.svg"
                alt="sign-in-icon"
                width={60}
                height={95}
                className="h-14 w-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-text text-2xl lg:text-3xl">
                Tailored Access, Just for You
              </h2>
              <p className="text-text text-sm">Please signin to your account</p>
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(signupHandler)}
                  className="flex flex-col gap-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 text-base text-text">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="!bg-transparent focus:!outline-none border-l-0 border-t-0 border-r-0 !border-b !border-[#817C73] !rounded-none focus-visible:outline-ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent placeholder:text-[#A19888] pb-4"
                            type="email"
                            placeholder="example@gmail.com"
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
                      <FormItem>
                        <FormLabel className="mb-1 text-base text-text">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={
                              "!bg-transparent focus:!outline-none border-l-0 border-t-0 border-r-0 !border-b !border-[#817C73] !rounded-none focus-visible:outline-ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent placeholder:text-[#A19888] pb-4"
                            }
                            type="password"
                            placeholder="enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 text-base text-text">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="!bg-transparent focus:!outline-none border-l-0 border-t-0 border-r-0 !border-b !border-[#817C73] !rounded-none focus-visible:outline-ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent placeholder:text-[#A19888] pb-4"
                            type="text"
                            placeholder="enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1 text-base text-text">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="!bg-transparent focus:!outline-none border-l-0 border-t-0 border-r-0 !border-b !border-[#817C73] !rounded-none focus-visible:outline-ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent placeholder:text-[#A19888] pb-4"
                            type="tel"
                            placeholder="enter your number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[#A19888] text-sm">
                      We will send you an email to verify your email address.
                    </p>

                    <div className="flex items-center gap-3">
                      <Checkbox
                        required
                        className="h-4 w-4 border-[#817C73] rounded-none"
                        id="terms-2"
                      />
                      <div className="grid gap-2">
                        <Label
                          htmlFor="terms-2"
                          className="text-sm text-[#736C5F]"
                        >
                          i accept the{" "}
                          <Link href="/privacy-policy" className="underline">
                            privacy policy statement
                          </Link>
                        </Label>
                      </div>
                    </div>
                  </div>
                  <ButtonLoading
                    loading={loading}
                    type="submit"
                    text="create account"
                    className="bg-transparent w-fit lumin text-text text-3xl shadow-none border-0 hover:bg-transparent hover:shadow-none focus-visible:outline-ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent p-0 leading-0 h-0 cursor-pointer mt-2 hover:text-black hover:scale-110 transition-all duration-300 ease-in-out"
                  />
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
