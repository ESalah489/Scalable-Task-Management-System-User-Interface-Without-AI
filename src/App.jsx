import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import "./index.css";
import React, { Suspense  } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/Error/ErrorBoundary.jsx";
import SocketListener from "./services/sockets/SocketListener.jsx";
const queryClient = new QueryClient();

function App() {

  return (
    <React.Fragment>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <SocketListener>
          <div className="bg-main-text overflow-hidden">
            <Suspense fallback={null}>
              <RouterProvider router={routes} />
            </Suspense>
          </div>
          </SocketListener>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;