import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    
    <div>
        <Navbar />
      <h1>Panel de Administración</h1>
      <p>Admin: {user.nombre}</p>
   
    </div>
  );
}
