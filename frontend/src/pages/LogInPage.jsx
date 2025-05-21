/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { logInSchema } from "../validation/logIn.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, LogIn, Mail, UserPlus2 } from "lucide-react";
import InputWithIcon from "../components/form/InputWithIcon";
import SubmitButton from "../components/form/SubmitButton";
import { Link } from "react-router";

function LogInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    reset();
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          Create your account
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <InputWithIcon
                id="email"
                label="Email"
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                register={register}
                error={errors.email}
              />
            </div>

            <div>
              <InputWithIcon
                id="password"
                label="Password"
                icon={Lock}
                type="password"
                placeholder="********"
                register={register}
                error={errors.password}
              />
            </div>

            <SubmitButton isLoading={isSubmitting}>
              <LogIn className="mr-2" size={18} />
              Log in
            </SubmitButton>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member?{" "}
            <Link to="/sign-up" className="font-medium text-emerald-400 hover:text-emerald-300">
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LogInPage;
