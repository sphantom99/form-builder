import { Button } from "@/components/ui/button";
import FormRenderer from "@/components/ui/FormRenderer";
import useSubmitForm from "@/data-access/useSubmitForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function Form() {
  const { formLink } = useParams();
  if (!formLink) {
    return <div>Form not found</div>;
  }
  const { register, control, handleSubmit, watch } = useForm();
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      axios.get(`${import.meta.env.VITE_APP_API_URL}/forms/${formLink}`),
    queryKey: ["form", formLink],
  });
  const { mutateAsync, isLoading: isLoadingSubmit } = useSubmitForm();

  const onSubmit = async (answers) => {
    mutateAsync({ answers, formId: data.data.uid });
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-4"
        >
          <FormRenderer
            fields={data.data.formshapejson.fields}
            watch={watch}
            control={control}
            register={register}
            description={data.data.formshapejson.description}
            title={data.data.formshapejson.title}
          />
          <Button type="submit">
            {isLoadingSubmit ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default Form;
