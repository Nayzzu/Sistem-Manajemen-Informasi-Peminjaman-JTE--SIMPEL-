import React from 'react';

export default function Button({
    type = 'button',
    variant = 'primary', // primary, secondary, danger, outline, ghost
    size = 'md', // sm, md, lg
    className = '',
    disabled,
    children,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
        primary: 'bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-200 focus:ring-blue-500 active:scale-[0.98]',
        secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm focus:ring-indigo-500',
        danger: 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500 active:bg-red-700 border border-transparent',
        outline: 'bg-transparent hover:bg-blue-50 text-blue-700 border border-blue-200 hover:border-blue-300 focus:ring-blue-500',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs rounded-md',
        md: 'px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-md',
        lg: 'w-full py-4 rounded-xl font-black text-base',
    };

    // Fallback to defaults if invalid props are passed
    const activeVariant = variants[variant] || variants.primary;
    const activeSize = sizes[size] || sizes.md;

    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`${baseStyles} ${activeVariant} ${activeSize} ${className}`}
        >
            {children}
        </button>
    );
}
