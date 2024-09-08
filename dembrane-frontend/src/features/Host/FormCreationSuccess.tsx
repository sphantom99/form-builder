import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

function FormCreationSuccess() {
  const location = useLocation();
  if (location.state === undefined) {
    return <Navigate to="/host/createForm" />;
  }
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen">
      <div className="text-6xl ">Your Form was created successfully!</div>
      <div className="flex flex-col gap-5">
        <p className="text-3xl">Form Link:</p>
        <div className="flex flex-row gap-5">
          <Link
            to={`${import.meta.env.VITE_APP_URL}/form/${location.state.link}`}
            className="text-lg"
          >{`${import.meta.env.VITE_APP_URL}/form/${location.state.link}`}</Link>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `${import.meta.env.VITE_APP_URL}/form/${location.state.link}`
              );
              enqueueSnackbar("Copied to clipboard", { variant: "success" });
            }}
            className="w-full"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormCreationSuccess;
