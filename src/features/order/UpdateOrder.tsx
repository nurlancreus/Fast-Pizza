import { useFetcher } from "react-router-dom";
import Button from "@/ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();

  // fetcher.Form do not use navigation state

  return (
    <fetcher.Form method="PATCH">
      <Button variant="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
