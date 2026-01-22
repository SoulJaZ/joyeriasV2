import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <h2>Admin Panel</h2>
        {children}
      </main>
    </>
  );
}
