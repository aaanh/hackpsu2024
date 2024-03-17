"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const ButtonSubmit = ({ value, ...props }: { value: any }) => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full mt-2" disabled={pending} {...props}>
      {pending ? "Loading..." : value}
    </Button>
  );
};

export default ButtonSubmit;
