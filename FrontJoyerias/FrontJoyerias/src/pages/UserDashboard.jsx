import { useAuth } from "../auth/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Bienvenido, {user.nombre}</h1>
      <p>Rol: {user.role}</p>
    </div>
  );
}
