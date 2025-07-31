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

function LogInPage() {
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
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative z-0 py-14 bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                        <FormLabel className="mb-3 text-base text-text">
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
                        <FormLabel className="mb-3 text-base text-text">
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
                  <p className="text-base">
                    <span className="text-[#A19888]">New on our platform?</span>{" "}
                    <Link href="/signup" className="text-text hover:underline ">
                      Create an account
                    </Link>
                  </p>
                  <ButtonLoading
                    loading={loading}
                    type="submit"
                    text="log in"
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

export default LogInPage;
