'use client';

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm

} from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


type Variant = 'LOGIN' | 'REGISTER';

function AuthForm() {

    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }
    }, [session?.status])

    const toggleVariant = useCallback(() => {
        setVariant(prev => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            //Axios Register
            axios.post('/api/register', data)
                .then(() => signIn('credentials', {
                    ...data,
                    redirect: false,
                })
                )
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid Credentials');
                    }
                })
                .catch(() => {
                    toast.error('Something went wrong');
                })
                .finally(() => setIsLoading(false));
        };

        if (variant === 'LOGIN') {
            //NextAuth SignIn
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        //setIsLoading(false);
                        toast.error('Invalid credentials!');
                    }
                    if (callback?.ok && !callback?.error) {
                        //setIsLoading(true);
                        toast.success('Logged in!');
                    }
                })
                .finally(() => setIsLoading(false));
        };
    };

    const socialActions = (action: string) => {
        setIsLoading(true);
        signIn(action, {
            redirect: false
        })
            .then((callback) => {
                if (callback?.error) {
                    setIsLoading(false);
                    toast.error('Invalid credentials!');
                }
                if (callback?.ok && !callback?.error) {
                    setIsLoading(true);
                    toast.success('Logged in!');
                }
            }).finally(() => setIsLoading(false));
    }

    return (
        <div
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
            <div
                className="bg-white px-4 py-8 shadow sm:rounded-lg sm:ppx-10"
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input

                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Singn In' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialActions('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialActions('google')}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div
                        className="underline cursor-pointer"
                        onClick={toggleVariant}
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AuthForm;