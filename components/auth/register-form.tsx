"use client"


import {Input} from "@/components/ui/input"
import {FormError} from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";

import { useTransition, useState } from "react";
import {register} from "@/actions/register";

import * as z from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";

import {useForm} from 'react-hook-form';

import {Form, FormControl, FormField, FormItem, FormLabel,FormMessage} from "@/components/ui/form";


export const RegisterForm = () =>{
   
    const [ error, SetError ] = useState<string | undefined>("")
    const [ success, SetSuccess ] = useState<string | undefined>("") 
    const [isPending, startTransition ] = useTransition();
   
    const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
        SetError("");
        SetSuccess("")
        startTransition(()=>{
            register(values)
                .then( (data) => {
                    SetError( data.error);
                    SetSuccess( data.success);
                })
        })
    }

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email:"",
            password:"",
            name:""
        }}) 

    return(
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/login"
            showSocial>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                    <div className="space-y-4">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder= "Your name"
                                            type="name"
                                        />
                                        </FormControl > 
                                    <FormMessage />
                                </FormItem>
                                )}/>
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
                    >Create an account</Button>
                </form>
            </Form>        
        </CardWrapper>
    )
}