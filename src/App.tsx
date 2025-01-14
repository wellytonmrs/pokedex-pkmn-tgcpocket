import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { LoginForm } from "./components/LoginForm";
import { Layout } from "./components/Layout";
import { useAuthStore } from "./store/useAuthStore";

// Dynamically import pages for code splitting
const LibraryPage = React.lazy(() => import("./pages/LibraryPage"));
const DeckPage = React.lazy(() => import("./pages/DeckPage"));
const DeckDetailPage = React.lazy(() => import("./pages/DeckDetailPage"));

// Create a QueryClient instance
const queryClient = new QueryClient();

// Routes configuration
const routes = [
  { path: "/", element: <LoginForm />, isPrivate: false },
  { path: "/library", element: <LibraryPage />, isPrivate: true },
  { path: "/decks", element: <DeckPage />, isPrivate: true },
  { path: "/deck/:deckId", element: <DeckDetailPage />, isPrivate: true },
];

function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, element, isPrivate }) =>
              isPrivate ? (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PrivateRoute>
                      <Layout>{element}</Layout>
                    </PrivateRoute>
                  }
                />
              ) : (
                <Route key={path} path={path} element={element} />
              )
            )}
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
