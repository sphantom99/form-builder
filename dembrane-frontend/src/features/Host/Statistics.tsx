"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { PieChart } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from "recharts";
import useGetFormResponses from "@/data-access/useGetFormResponses";
import { Navigate, useLocation, useParams } from "react-router-dom";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface FormField {
  id: string;
  type: string;
  label: string;
  value: string;
  options?: string[];
}

interface FormData {
  title: string;
  fields: FormField[];
  description: string;
}

// Mock data - replace this with actual API call in a real application
const mockSubmissions: FormData[] = [
  {
    title: "Customer Satisfaction",
    fields: [
      {
        id: "1",
        type: "text",
        label: "How did you like the app?",
        value: "It was great!",
      },
      {
        id: "2",
        type: "radio",
        label: "How would you rate our service?",
        value: "Excellent",
        options: ["Poor", "Average", "Good", "Excellent"],
      },
      {
        id: "3",
        type: "select",
        label: "Which feature did you like most?",
        value: "User Interface",
        options: ["User Interface", "Performance", "Reliability"],
      },
    ],
    description: "Customer satisfaction survey",
  },
  {
    title: "Customer Satisfaction",
    fields: [
      {
        id: "1",
        type: "text",
        label: "How did you like the app?",
        value: "Could be better",
      },
      {
        id: "2",
        type: "radio",
        label: "How would you rate our service?",
        value: "Good",
        options: ["Poor", "Average", "Good", "Excellent"],
      },
      {
        id: "3",
        type: "select",
        label: "Which feature did you like most?",
        value: "Performance",
        options: ["User Interface", "Performance", "Reliability"],
      },
    ],
    description: "Customer satisfaction survey",
  },
  // Add more mock submissions as needed
];

export default function FormStatistics() {
  const { formId } = useParams();
  if (!formId) {
    <Navigate to="/host/statistics" />;
  }
  const { data, isLoading } = useGetFormResponses(formId);
  const [submissions, setSubmissions] = useState<FormData[]>([]);

  useEffect(() => {
    // In a real application, you would fetch the data from an API here
    setSubmissions(mockSubmissions);
  }, []);

  const processTextFields = (fields: FormField[]) => {
    return fields.filter((field) => field.type === "text");
  };

  const processRadioFields = (fields: FormField[]) => {
    const radioFields = fields.filter((field) => field.type === "radio");
    return radioFields.map((field) => {
      const optionCounts =
        field.options?.reduce(
          (acc, option) => {
            acc[option] = submissions.filter(
              (sub) =>
                sub.fields.find((f) => f.id === field.id)?.value === option
            ).length;
            return acc;
          },
          {} as Record<string, number>
        ) || {};
      return { ...field, optionCounts };
    });
  };

  const processSelectFields = (fields: FormField[]) => {
    const selectFields = fields.filter((field) => field.type === "select");
    return selectFields.map((field) => {
      const optionCounts =
        field.options?.reduce(
          (acc, option) => {
            acc[option] = submissions.filter(
              (sub) =>
                sub.fields.find((f) => f.id === field.id)?.value === option
            ).length;
            return acc;
          },
          {} as Record<string, number>
        ) || {};
      return { ...field, optionCounts };
    });
  };

  const allResponseArrays = data?.data?.map(
    (response) => response.responsejson?.fields
  );
  const allResponses = allResponseArrays?.flat(Infinity) || [];
  const grouped = Object.groupBy(allResponses, (field) => field.label);
  Object.keys(grouped).forEach((key) => console.log(key, grouped[key][0].type));
  //   console.log(grouped);
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen">
      <h1 className="text-2xl font-bold mb-4">Form Statistics</h1>

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="w-1/2">
          {Object.keys(grouped).map((key) => {
            switch (grouped[key][0].type) {
              case "text": {
                return (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>{key}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Responses</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {grouped[key].map((field) => (
                            <TableRow>
                              <TableCell>{field.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                );
              }
              case "radio": {
                const groupedByValue = Object.groupBy(
                  grouped[key],
                  (field) => field.value
                );
                const data = Object.keys(groupedByValue).map((key) => ({
                  value: key,
                  count: groupedByValue[key].length,
                }));
                const chartConfig = {
                  count: {
                    label: "Option",
                  },
                };

                return (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>{key}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <BarChart data={data}>
                          <CartesianGrid />
                          <XAxis dataKey="value" />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar dataKey="count" fill="#000000" />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                );
              }
              case "select": {
                const groupedByValue = Object.groupBy(
                  grouped[key],
                  (field) => field.value
                );
                const data = Object.keys(groupedByValue).map((key) => ({
                  value: key,
                  count: groupedByValue[key].length,
                }));
                const chartConfig = {
                  count: {
                    label: "Option",
                  },
                };

                return (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>{key}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <BarChart data={data}>
                          <CartesianGrid />
                          <XAxis dataKey="value" />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar dataKey="count" fill="#000000" />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                );
              }
            }
          })}
        </div>
      )}
    </div>
  );
}
