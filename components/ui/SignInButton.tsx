import Link from "next/link";
import { FC, ReactNode } from "react";

interface SignInButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

const SignInButton: FC<SignInButtonProps> = ({
  children,
  onClick,
  icon,
  className = "",
}) => {
  return (

    <div className={`w-full ${className}`}>
        <Link href="/login">
      <button
        onClick={onClick}
        className="inline-flex w-full items-center justify-center rounded-md px-4 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2  focus:ring-offset-2 "
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
        </Link>
    </div>
  );
};

export default SignInButton;