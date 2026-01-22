import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "../auth/ProtectedRoute";
import Invoices from "../pages/Invoices";
import Payments from "../pages/Payments";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* USER */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute roles={["user"]}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute roles={["user"]}>
              <Invoices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute roles={["user"]}>
              <Payments />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/invoices"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Invoices />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}
