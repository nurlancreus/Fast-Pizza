import { ReactNode } from "react";
import { Link } from "react-router-dom";

const base =
  "inline-block rounded-full text-sm bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

const styles = {
  primary: `${base} px-4 py-3 md:px-6 md:py-4`,
  small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
  round: `${base} px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
  secondary:
    "inline-block rounded-full font-semibold uppercase tracking-wide transition-colors duration-300 bg-transparent border-2 border-stone-300 hover:text-stone-800 text-stone-400 focus:text-stone-800 focus:bg-stone-300 focus:ring-stone-200 hover:bg-stone-300 px-4 py-2.5 md:px-5 md:py-3.5 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed",
};

type ButtonProps = {
  children: ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  to?: string;
  variant: "primary" | "secondary" | "small" | "round";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({
  children,
  type = "submit",
  disabled = false,
  to,
  variant,
  onClick = undefined,
}: ButtonProps) {
  if (to)
    return (
      <Link to={to} className={styles[variant]}>
        {children}
      </Link>
    );
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles[variant]}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}

export default Button;
