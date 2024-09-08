import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormBuilder from "./features/Host/FormBuilder.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import FormCreationSuccess from "./features/Host/FormCreationSuccess.tsx";
import Form from "./features/Guest/Form.tsx";
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
    element: <Form />
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
