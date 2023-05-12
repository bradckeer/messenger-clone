'use client';

import clsx from 'clsx';

interface ButtonProps {
    type?: 'button' |'submit' |'reset' | undefined
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    warning?: boolean;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    warning,
    className,
    disabled
}) => {
    return(
        <button 
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`
                flex
                justify-center
                rounded-md
                px-3
                py-2
                text-sm
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
            `,
            disabled && 'opacity-50 cursor-default',
            fullWidth && 'w-full',
            secondary ? 'text-gray-900' : 'text-white',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            warning && 'bg-yellow-500 hover:bg-yellow-600 focus-visible:outline-yellow-600',
            !secondary && !danger && !warning && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
            )}
        >
            {children}
        </button>
    )
}

export default Button;