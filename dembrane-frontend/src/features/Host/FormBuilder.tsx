"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormRenderer from "@/components/ui/FormRenderer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSubmitCreateForm from "@/data-access/useSubmitCreateForm";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FieldType = "text" | "radio" | "select";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  options?: string[];
}

interface FormValues {
  fields: FormField[];
  description?: string;
  title?: string;
}

export default function FormBuilder() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fields: [],
      description: "",
      title: "",
    },
  });
  const { mutateAsync, isLoading, data: responseData } = useSubmitCreateForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });
  const [newField, setNewField] = useState<FormField>({
    id: "",
    type: "text",
    label: "",
    options: [],
  });

  const navigate = useNavigate();

  const addField = () => {
    if (newField.label) {
      append({ ...newField, id: Date.now().toString() });
      setNewField({ id: "", type: "text", label: "", options: [] });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    await mutateAsync(data);
  };

  return (
    <div className="flex flex-col justify-center gap-5 px-5  w-screen">
      <h1 className="text-6xl text-center font-bold mb-4">Form Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Describe the Form</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="formTitle">Form Title</Label>
                  <Input
                    id="formTitle"
                    {...register("title" as const)}
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <Label htmlFor="formDescription">Form Description</Label>
                  <Input
                    id="formDescription"
                    {...register("description" as const)}
                    placeholder="Enter form description"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Add New Field</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fieldType">Field Type</Label>
                  <Select
                    value={newField.type}
                    onValueChange={(value: FieldType) =>
                      setNewField({
                        ...newField,
                        type: value,
                        options: value === "text" ? undefined : [],
                      })
                    }
                  >
                    <SelectTrigger id="fieldType">
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Field</SelectItem>
                      <SelectItem value="radio">Radio Group</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fieldLabel">Field Label</Label>
                  <Input
                    id="fieldLabel"
                    value={newField.label}
                    onChange={(e) =>
                      setNewField({ ...newField, label: e.target.value })
                    }
                    placeholder="Enter field label"
                  />
                </div>
                {(newField.type === "radio" || newField.type === "select") && (
                  <div>
                    <Label htmlFor="fieldOptions">
                      Options (comma-separated)
                    </Label>
                    <Input
                      id="fieldOptions"
                      value={newField.options?.join(", ") || ""}
                      onChange={(e) =>
                        setNewField({
                          ...newField,
                          options: e.target.value
                            .split(",")
                            .map((o) => o.trim()),
                        })
                      }
                      placeholder="Option 1, Option 2, Option 3"
                    />
                  </div>
                )}
                <Button onClick={addField} className="w-full">
                  <PlusIcon className="mr-2 h-4 w-4" /> Add Field
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Form Preview</CardTitle>
          </CardHeader>
          <CardContent className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col justify-between h-full"
            >
              <FormRenderer
                fields={fields}
                remove={remove}
                watch={watch}
                register={register}
                control={control}
                mode={"builder"}
              />
              {fields.length > 0 && (
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? "Creating Form..." : "Create Form"}
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
