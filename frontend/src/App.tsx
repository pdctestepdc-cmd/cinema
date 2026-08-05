import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import FilmesPage from "./pages/FilmesPage";
import ClientesPage from "./pages/ClientesPage";
import FuncionariosPage from "./pages/FuncionariosPage";
import IngressosPage from "./pages/IngressosPage";
import SessoesPage from "./pages/SessoesPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <AppShell brand={`Cinema Manager`} links={[{"label":"Início","to":"/"},{"label":"Filmes","to":"/filmes"},{"label":"Clientes","to":"/clientes"},{"label":"Funcionarios","to":"/funcionarios"},{"label":"Ingressos","to":"/ingressos"},{"label":"Sessões","to":"/sessaos"}]} layout="sidebar">
      <Routes>
          <Route path="/filmes" element={<FilmesPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/funcionarios" element={<FuncionariosPage />} />
          <Route path="/ingressos" element={<IngressosPage />} />
          <Route path="/sessaos" element={<SessoesPage />} />
          <Route path="/" element={<DashboardPage />} />
      </Routes>
    </AppShell>
  );
}
