"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const router = useRouter();

    const onSubmit = async (data: RegisterFormData) => {
        console.log("Register data submitted:", data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/auth/login");
    };

    return (
        <div className="flex h-screen w-full">
            <div className="w-full hidden md:inline-block">
                <Image width={1920} height={1080} className="h-full w-full object-cover" src="/assets/images/register_side_image.png" alt="Register Side Image" />
            </div>
            <div className="w-full flex flex-col items-center justify-center p-6 overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="md:w-96 w-80 flex flex-col items-center justify-center" noValidate>
                    <Link href="/" className="mb-6">
                        <Image
                            src="/assets/logo/logo.svg"
                            alt="Tailrcv Logo"
                            width={226}
                            height={72}
                            className="h-20 w-auto"
                            priority
                        />
                    </Link>

                    <h2 className="text-3xl text-gray-900 font-medium">Create Account</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Welcome! Please fill in your details to get started</p>
        
                    <button type="button" className="w-full mt-6 bg-gray-500/10 flex items-center justify-center h-12 rounded-full hover:bg-gray-500/20 transition-colors">
                        <Image src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" width={82} height={28} alt="Google Logo" />
                    </button>
        
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90 text-center">or register with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>
        
                    {/* Username Field */}
                    <div className="w-full flex flex-col">
                        <div className={`flex items-center w-full bg-transparent border ${errors.username ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7 8C9.20914 8 11 6.20914 11 4C11 1.79086 9.20914 0 7 0C4.79086 0 3 1.79086 3 4C3 6.20914 4.79086 8 7 8ZM0 14C0 11.7909 3.13401 10 7 10C10.866 10 14 11.7909 14 14V16H0V14Z" fill="#6B7280"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                {...register("username")}
                                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            />                 
                        </div>
                        {errors.username && (
                            <p className="text-xs text-red-500 mt-1 pl-4">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="w-full flex flex-col mt-4">
                        <div className={`flex items-center w-full bg-transparent border ${errors.email ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}>
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                            </svg>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            />                 
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1 pl-4">{errors.email.message}</p>
                        )}
                    </div>
        
                    {/* Password Field */}
                    <div className="w-full flex flex-col mt-4">
                        <div className={`flex items-center w-full bg-transparent border ${errors.password ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}>
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                            </svg>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1 pl-4">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="w-full flex flex-col mt-4">
                        <div className={`flex items-center w-full bg-transparent border ${errors.confirmPassword ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}>
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                            </svg>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                                className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1 pl-4">{errors.confirmPassword.message}</p>
                        )}
                    </div>
        
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="mt-6 w-full h-11 rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-colors font-medium cursor-pointer disabled:opacity-70"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">Already have an account? <Link className="text-brand-teal hover:underline" href="/auth/login">Sign in</Link></p>
                </form>
            </div>
        </div>
    );
}