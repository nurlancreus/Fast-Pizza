import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

type RouteError = {
  data: string;
  message: string;
};

function Error() {
  const error = useRouteError() as RouteError;

  return (
    <div className="px-4 py-3 md:px-5 md:py-4">
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
