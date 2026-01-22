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
                {/* USER */}
                <Route path="/invoices" element={
                    <ProtectedRoute role="user">
                        <Invoices />
                    </ProtectedRoute>
                } />

                {/* ADMIN */}
                <Route path="/admin/invoices" element={
                    <ProtectedRoute role="admin">
                        <Invoices />
                    </ProtectedRoute>
                } />

                {/* ADMIN */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                {/* ADMIN */}
                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                {/* ADMIN */}
                <Route
                    path="/admin/payments"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <Payments />
                        </ProtectedRoute>
                    }
                />

                {/* DEFAULT */}
                <Route path="*" element={<Navigate to="/login" />} />

            </Routes>
        </BrowserRouter>
    );
}
