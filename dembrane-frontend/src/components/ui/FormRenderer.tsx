import { watch } from "fs";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { renderField } from "@/lib/utilityComps";
import { register } from "module";

type TFormRendererProps = {
  fields: any;
  remove: any;
  watch: any;
  register: any;
  control: any;
  mode: "builder" | "renderer";
  title: string;
  description: string;
};
function FormRenderer(props: TFormRendererProps) {
  const { fields, remove, watch, register, control, mode } = props;
  const title = props.title ?? watch("title");
  const description = props.description ?? watch("description");
  return (
    <div>
      <div className="text-center p-5">
        <p className="text-center text-3xl">{title}</p>
        <p className="">{description}</p>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <div className="flex-grow">
            {renderField(field, index, register, control)}
          </div>
          {mode === "builder" && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
export default FormRenderer;
