import Link from "next/link";
import { FC, ReactNode } from "react";

interface SignUpButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

const SignUpButton: FC<SignUpButtonProps> = ({
  children,
  onClick,
  icon,
  className = "",
}) => {
  return (
   
    <div className={`w-full ${className}`}>
         <Link href="/sign-up">
      <button
        onClick={onClick}
        className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
      </Link>
    </div>
  );
};

export default SignUpButton;