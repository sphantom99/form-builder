import { useMutation } from "@tanstack/react-query";
import React from "react";
import { submitCreateForm } from "./gateway";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function useSubmitCreateForm() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: submitCreateForm,
    mutationKey: ["submitCreateForm"],
    onError: (error) => {
      if (error.response.status === 401) {
        enqueueSnackbar("Unauthorized", { variant: "error" });
      } else if (error.response.status === 400) {
        enqueueSnackbar(error.response.data, { variant: "error" });
      }
    },
    onSuccess: (data) => {
      enqueueSnackbar("Form created", { variant: "success" });
      navigate("/host/createForm/success", { state: { link: data.data } });
    },
  });
}

export default useSubmitCreateForm;
