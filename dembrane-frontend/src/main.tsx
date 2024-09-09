import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./features/Guest/Form.tsx";
import FormBuilder from "./features/Host/FormBuilder.tsx";
import FormCreationSuccess from "./features/Host/FormCreationSuccess.tsx";
import SelectFormForStatistics from "./features/Host/SelectFormForStatistics.tsx";
import FormStatistics from "./features/Host/Statistics.tsx";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome to Dembranes Host portal!</div>,
  },
  {
    path: "/host/createForm",
    element: <FormBuilder />,
  },
  {
    path: "/host/createForm/success",
    element: <FormCreationSuccess />,
  },
  {
    path: "/form/:formLink",
    element: <Form />,
  },
  {
    path: "/host/statistics",
    element: <SelectFormForStatistics />,
  },
  {
    path: "/host/statistics/:formId",
    element: <FormStatistics />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
