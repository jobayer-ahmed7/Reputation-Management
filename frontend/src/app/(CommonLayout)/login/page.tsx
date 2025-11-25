"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    // TODO: replace with real authentication logic or mutation
    console.log("Login form submitted", values);
  };

return(
  <div>
    login
  </div>
)
};

export default LoginPage;
