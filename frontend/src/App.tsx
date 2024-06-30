import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

import { Provider } from "react-redux";
import { store } from "./services/redux/store";
import ProtectedRoutes from "./layout/ProtectedRoutes";

//persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import LandingPage from "./pages/LandingPage";

//toast
import { Toaster } from "sonner";
import SignInPage from "./pages/SignInPage";

const persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LandingPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/SignUp",
    element: <SignUpPage />,
  },
  {
    path: "/SignIn",
    element: <SignInPage />,
  },
  {
    path: "/HomePage",
    element: (
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main>
          <Toaster position="top-center" duration={1500} />
          <RouterProvider router={router} />
        </main>
      </PersistGate>
    </Provider>
  );
}

export default App;
