import { Outlet } from "react-router-dom";
import Header from "../header/Header.jsx";
import { useAuth } from "../AuthContext.jsx";

export default function RootLayout() {
  const { isLoggedIn, role, user } = useAuth();
  return (
    <>
      <Header />
      {/* DEBUG TEMPORAIRE — tu peux enlever après validation visuelle */}
      <div style={{
        background:"#041427",color:"#cbd5e1",borderBottom:"1px solid #0b2549",
        fontSize:13,padding:"6px 12px"
      }}>
        <strong>DEBUG</strong> — loggedIn: {String(isLoggedIn)} · role: {role ?? "—"} · user: {user?.email ?? "—"}
      </div>

      <main className="container" style={{ paddingTop: 24, minHeight: "calc(100dvh - 80px)" }}>
        <Outlet />
      </main>
    </>
  );
}
