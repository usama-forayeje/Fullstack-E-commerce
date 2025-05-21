import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import { UserPlus2, Mail, Lock, User, ArrowRight } from "lucide-react";
import { signUpSchema } from "../validation/signup.schema";
import InputWithIcon from "../components/form/InputWithIcon";
import SubmitButton from "../components/form/SubmitButton";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
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
                id="name"
                label="Full Name"
                icon={User}
                placeholder="Inter your name"
                register={register}
                error={errors.name}
              />
            </div>

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

            <div>
              <InputWithIcon
                id="confirmPassword"
                label="Confirm Password"
                icon={Lock}
                type="password"
                placeholder="********"
                register={register}
                error={errors.confirmPassword}
              />
            </div>

            <SubmitButton isLoading={isSubmitting}>
              <UserPlus2 className="mr-2" size={18} />
              Sign Up
            </SubmitButton>
          </form>

          <p className="text-sm mt-6 text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              to="/log-in"
              className="text-emerald-400 font-medium hover:text-emerald-300 transition"
            >
              Log in here <ArrowRight className="inline-block" size={16} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUpPage;
