"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/zodSchema";
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
import { ButtonLoading } from "@/components/application/ButtonLoading";
import toast from "react-hot-toast";

function NewsLetter() {
  const [loading, setLoading] = useState(false);

  const formSchema = userSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function loginHandler(data) {
    console.log("Login Data:", data);
    try {
      setLoading(true);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-text text-sm">
            sign in to our newsletter for the latest updates & exclusive deals
          </p>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(loginHandler)}
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
              <ButtonLoading
                loading={loading}
                type="submit"
                text="sign up"
                className="bg-transparent w-fit lumin text-text text-3xl shadow-none border-0 hover:bg-transparent hover:shadow-none focus-visible:outline-ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent p-0 leading-0 h-0 cursor-pointer mt-2 hover:text-black hover:scale-110 transition-all duration-300 ease-in-out"
              />
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
