import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();

    if (!user) {
        return null;
    }
    return (
        <nav className="navbar">
            <div className="logo">💎 Joyería</div>

            <div className="links">

                {user.role === "user" && (
                    <>
                        <Link to="/orders/me">Mis pedidos</Link>
                        <Link to="/payments">Mis pagos</Link>
                        <Link to="/invoices">Mis facturas</Link>
                    </>
                )}

                {user.role === "admin" && (
                    <>
                        <Link to="/admin">Dashboard</Link>
                        <Link to="/admin/orders">Pedidos</Link>
                        <Link to="/admin/payments">Pagos</Link>
                        <Link to="/admin/users">Usuarios</Link>
                        <Link to="/admin/invoices">Facturas</Link>
                    </>
                )}

            </div>


            <div className="user">
                <span>{user.nombre}</span>
                <button onClick={logout}>Salir</button>
            </div>
        </nav>
    );
}