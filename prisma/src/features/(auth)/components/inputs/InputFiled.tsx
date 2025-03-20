"use client"
import React, { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
    label: string;
    name: string;
    placeholder: string;
    control: any;
    disable?: boolean
    type?: "password"
}

function InputField({ control, label, placeholder, name, disable, type }: InputFieldProps) {


    const [show, setShow] = useState(false);

    return (
        <>

            {
                type === "password" ? <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">
                                {label}
                            </FormLabel>
                            <FormControl className='relative'>
                                <div>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        disabled={disable}
                                        className="border-white text-white" placeholder={placeholder}
                                        {...field}
                                    />
                                    <div className="pwd_controller absolute top-[50%] translate-y-[-50%] right-3">
                                        {
                                            show ? <FaEyeSlash className="text-white" onClick={() => setShow(!show)} /> : <FaEye className="text-white" onClick={() => setShow(!show)} />
                                        }
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> : <FormField
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">
                                {label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disable}
                                    className="border-white text-white" placeholder={placeholder}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            }

        </>
    )
}

export default InputField
