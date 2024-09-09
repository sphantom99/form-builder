import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getForms } from "./gateway";

function useGetAllForms() {
  return useQuery({
    queryFn: getForms,
    queryKey: ["forms"],
  });
}

export default useGetAllForms;
