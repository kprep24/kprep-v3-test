"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
} from "@/components/ui/form";

import CardBox from "../cardBox/CardBox";
import InputField from "../inputs/InputFiled";
import { loginSchema } from "@/schema/auth.schema";
import Link from "next/link";
import useSignIn from "../../api/useSignIn";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/button/SubmitButton";
import useAuthStore from "@/store/AuthStore";



function SignIn() {

    const signInMutation = useSignIn();
    const { toast } = useToast();
    const router = useRouter();
    const { signIn } = useAuthStore()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    // Handle form submission
    const onSubmit = (values: z.infer<typeof loginSchema>) => {

        signInMutation.mutate(values, {
            onSuccess: (info) => {
                // Clear form values
                form.reset();
                // Show success
                toast({
                    description: "Successfully Signed in",
                });
                const userData = info.data;

                //set zustan
                signIn(userData.email, userData.role, userData.firstName, userData.lastName, userData.userId, userData.joiningDate);
                // Redirect to dashboard or home page
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);
            },
            onError: (err: any) => {
                let error = err.response.data || "Unexpected error occured";
                toast({
                    description: error,
                    variant: "destructive"
                })
            }
        })
        console.log("object")
    };

    return (
        <CardBox
            title="Welcome Back to K-Prep"
            description="Log in to access your dashboard, manage your account, and explore all features"
            footer={
                <Link href="#" className="text-blue-500 hover:underline">Forgot Password?</Link>
            }
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <InputField
                        name="email"
                        control={form.control}
                        placeholder="ab@gmail.com"
                        label="Email"
                        disable={signInMutation.isPending}
                    />
                    <InputField
                        name="password"
                        control={form.control}
                        placeholder=""
                        label="Password"
                        type="password"
                        disable={signInMutation.isPending}
                    />
                    <SubmitButton title="Log in" disabled={signInMutation.isPending} />
                </form>
            </Form>
        </CardBox>
    );
}

export default SignIn;
