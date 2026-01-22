import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

export default function Navbar(){
    const { user, logout } = useAuth();

    if(!user){
        return null;
    }
    return (
    <nav className="navbar">
      <div className="logo">💎 Joyería</div>

      <div className="links">
        <Link to="/orders">Pedidos</Link>
        <Link to="/payments">Pagos</Link>
        <Link to="/invoices">Facturas</Link>

        {user.role === "admin" && (
          <>
            <Link to="/admin/orders">Admin Pedidos</Link>
            <Link to="/admin/users">Usuarios</Link>
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