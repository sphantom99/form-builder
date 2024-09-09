import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFormResponses } from "./gateway";

function useGetFormResponses(formId: string) {
  return useQuery({
    queryFn: () => getFormResponses(formId),
    queryKey: ["formResponses", formId],
    enabled: !!formId,
  });
}

export default useGetFormResponses;
