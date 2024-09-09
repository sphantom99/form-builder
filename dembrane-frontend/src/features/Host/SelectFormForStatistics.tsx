import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllForms from "@/data-access/useGetAllForms";
import React from "react";
import { useNavigate } from "react-router-dom";

function SelectFormForStatistics() {
  const { data, isLoading } = useGetAllForms();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen">
      <h1 className="text-3xl">Form Selection</h1>
      <p>Please select the form you wish to see statistics for:</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-1/2">
          <Select
            onValueChange={(value) => navigate(`/host/statistics/${value}`)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a form" />
            </SelectTrigger>
            <SelectContent>
              {data?.data?.map((form: any) => (
                <SelectItem value={form.uid}>
                  {form.formshapejson?.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export default SelectFormForStatistics;
