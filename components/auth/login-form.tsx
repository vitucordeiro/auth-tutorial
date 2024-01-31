"use client"


import {Input} from "@/components/ui/input"
import {FormError} from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";

import { useTransition, useState } from "react";
import {login} from "@/actions/login";

import * as z from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";

import {useForm} from 'react-hook-form';

import {Form, FormControl, FormField, FormItem, FormLabel,FormMessage} from "@/components/ui/form";


export const  LoginForm = () =>{
   
    const [ error, SetError ] = useState<string | undefined>("")
    const [ success, SetSuccess ] = useState<string | undefined>("") 
    const [isPending, startTransition ] = useTransition();
   
    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        SetError("");
        SetSuccess("")
        startTransition(()=>{
            login(values)
                .then( (data) => {
                    if(data) {
                        SetError( data.error);
                        
                    }

                })
        })
    }

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email:"",
            password:""
        }}) 

    return(
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account"
            backButtonHref="/register"
            showSocial>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="contact@email.com"
                                            type="email"
                                        />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}/>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="*******"
                                            type="password"
                                        />
                                        </FormControl > 
                                    <FormMessage />
                                </FormItem>
                                )}/>
                    </div>
                    <FormError message={error}/>
                    <FormSucess message={success}/>
                    <Button
                        className="w-full"
                        type="submit"
                    >Login</Button>
                </form>
            </Form>        
        </CardWrapper>
    )
}