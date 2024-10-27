import React from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProductViewPage from "./pages/ProductPage";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/products" element={<ProductViewPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Navigate to="/signup" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>{" "}
          </Router>{" "}
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
