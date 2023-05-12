'use client';

import clsx from "clsx";
import React from "react";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister

} from "react-hook-form";

interface InputProps {
    name: string;
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    value: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: object;
    errors?: FieldErrors;
    register?: UseFormRegister<FieldValues>;
    onChange: () => void;
}

const Input: React.FC<InputProps> = ({
    name,
    label,
    id,
    type,
    placeholder,
    value,
    required,
    disabled,
    readOnly,
    errors,
    register
}) => {
    return (
        <>
            <div>
                <label 
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-900"           
                >
                    {label}
                </label>
                <div className="mt-2">
                    <input
                        id={id}
                        type={type}
                        autoComplete={id}
                        disabled={disabled}
                        placeholder={placeholder}
                        required={required}
                        readOnly={readOnly}
                        {...register(id, { required })}
                        className={clsx(`
                            form-input
                            block 
                            w-full 
                            rounded-md 
                            border-0 
                            py-1.5 
                            text-gray-900 
                            shadow-sm 
                            ring-1 
                            ring-inset 
                            ring-gray-300 
                            placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset 
                            focus:ring-sky-600 
                            sm:text-sm 
                            sm:leading-6`,
                            errors[id] && "focus:ring-rose-500",
                            disabled && "opacity-50 cursor-not-allowed"

                        )}
                    />
                </div>
            </div>
        </>
    );

};

export default Input;