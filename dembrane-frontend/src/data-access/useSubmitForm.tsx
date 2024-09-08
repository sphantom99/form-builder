import { useMutation } from "@tanstack/react-query";
import React from "react";
import { submitForm } from "./gateway";
import { enqueueSnackbar } from "notistack";

function useSubmitForm() {
  return useMutation({
    mutationFn: submitForm,
    mutationKey: ["submitForm"],
    onSuccess: () => {
      enqueueSnackbar("Form submitted", { variant: "success" });
    },
    onError: (error) => {
      if (error.response.status === 401) {
        enqueueSnackbar("Unauthorized", { variant: "error" });
      } else if (error.response.status === 400) {
        enqueueSnackbar(error.response.data, { variant: "error" });
      }
    },
  });
}

export default useSubmitForm;
