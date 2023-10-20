import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

const cls =
  "text-sm text-blue-500 transition-all duration-300 hover:text-blue-600 hover:underline";

type LinkButtonProps = {
  children: ReactNode;
  to: "-1" | string;
};

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();

  if (to === "-1")
    return (
      <button type="button" className={cls} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

export default LinkButton;
