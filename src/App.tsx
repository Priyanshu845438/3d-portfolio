import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider, useLoading } from "./context/LoadingProvider";
import Loading from "./components/Loading";

import ErrorBoundary from "./components/utils/ErrorBoundary";

const AppContent = () => {
  const { isLoading, loading } = useLoading();
  return (
    <>
      {isLoading && <Loading percent={loading} />}
      <Suspense>
        <MainContainer>
          <Suspense>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </ErrorBoundary>
  );
};

export default App;
