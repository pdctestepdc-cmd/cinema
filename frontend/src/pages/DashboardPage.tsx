import { Hero, ResourceOverview, PageBreadcrumb } from "../components";
import { filmesService } from "../services/filmes.service";
import { sessaosService } from "../services/sessaos.service";
import { ingressosService } from "../services/ingressos.service";
import { clientesService } from "../services/clientes.service";
import { funcionariosService } from "../services/funcionarios.service";

export default function DashboardPage() {

  return (
    <div className="page">

      <PageBreadcrumb items={[{ label: `Dashboard Cinema Manager` }]} />

      <Hero title={`Cinema Manager`} subtitle={`Gerencie filmes, sessões, ingressos, clientes e funcionários com eficiência.`} />
      <ResourceOverview resources={[{ label: "Filmes", to: "/filmes", load: filmesService.list }, { label: "Sessões", to: "/sessaos", load: sessaosService.list }, { label: "Ingressos", to: "/ingressos", load: ingressosService.list }, { label: "Clientes", to: "/clientes", load: clientesService.list }, { label: "Funcionários", to: "/funcionarios", load: funcionariosService.list }]} />
    </div>
  );
}
