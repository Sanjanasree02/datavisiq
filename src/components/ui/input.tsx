// src/components/ui/input.tsx
import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border rounded px-3 py-2 ${className}`} // Add any Tailwind CSS classes you want here
        {...props}
      />
    );
  }
);

Input.displayName = 'Input'; // This is important for debugging
