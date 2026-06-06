import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import "./index.css";
import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/Error/ErrorBoundary.jsx";
const queryClient = new QueryClient();

function App() {

  return (
    <React.Fragment>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div className="bg-main-background overflow-hidden">
            <Suspense fallback={null}>
              <RouterProvider router={routes} />
            </Suspense>
          </div>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;