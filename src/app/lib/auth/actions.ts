"use server";

import { signInSchema, signUpSchema, resetPasswordSchema } from "./schemas";
import { redirect } from "next/navigation";

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password",
    };
  }

  // TODO: Add your actual sign-in logic here
  // const { email, password } = validatedFields.data;
  // const result = await authenticate(email, password);

  // if (result.error) return { error: result.error };

  redirect("/dashboard");
}

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  // TODO: Add your actual sign-up logic here
  // const { name, email, password } = validatedFields.data;
  // const result = await createUser(name, email, password);

  // if (result.error) return { error: result.error };

  return { success: "Account created successfully! Please sign in." };
}

export async function resetPassword(prevState: any, formData: FormData) {
  const validatedFields = resetPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      error: "Please enter a valid email address",
    };
  }

  // TODO: Add actual password reset logic here
  // const { email } = validatedFields.data;
  // await sendPasswordResetEmail(email);

  return { success: "Password reset link sent to your email!" };
}
