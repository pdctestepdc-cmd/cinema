import { DataTable, ApiForm, PageBreadcrumb } from "../components";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { sessaosService } from "../services/sessaos.service";
import { filmesService } from "../services/filmes.service";

export default function SessoesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const closeCreateDialog = () => setCreateOpen(false);


  return (
    <div className="page">

      <PageBreadcrumb items={[{ label: `Listagem de Sessões` }]} />

      <header className="page-header">
        <div>
          <h1 className="page-title">{`Listagem de Sessões`}</h1>
        </div>
      </header>
      <p style={{ margin: "-18px 0 20px 0" }}>{`Gerencie sessões cadastrados, revise status e execute ações recorrentes.`}</p>
      <div className="page-actions">
        <button className="btn btn-primary" type="button" onClick={() => setCreateOpen(true)}>
          <Plus size={16} aria-hidden="true" />
          Adicionar
        </button>
      </div>
      <DataTable load={sessaosService.list} reloadToken={reloadToken} columns={[{"key":"horario","label":"Horário"},{"key":"sala","label":"Sala"},{"key":"preco","label":"Preço"},{"key":"filmeId","label":"Filme"}]} idKey={"id"} fields={[{"name":"horario","label":"Horário","type":"date","required":true,"readOnly":false},{"name":"sala","label":"Sala","type":"text","required":true,"readOnly":false},{"name":"preco","label":"Preço","type":"number","required":true,"readOnly":false},{"name":"filmeId","label":"Filme","type":"number","required":true,"readOnly":false,"relation":{"endpoint":"/api/filmes","valueKey":"id","labelKey":"titulo"}}]} relationLoaders={{ "filmeId": filmesService.list }} onUpdate={sessaosService.update} onDelete={sessaosService.remove} />
      {createOpen && createPortal(
        <div className="dialog-overlay" role="presentation" onClick={closeCreateDialog}>
          <section
            className="dialog-content shadcn-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="dialog-header">
              <div>
                <h2 id="create-dialog-title" className="dialog-title">Adicionar</h2>
                <p className="dialog-description">Preencha os dados para criar um novo registro.</p>
              </div>
              <button className="icon-btn" type="button" onClick={closeCreateDialog} aria-label="Fechar">
                <X size={16} aria-hidden="true" />
              </button>
            </header>
            <ApiForm
              submit={sessaosService.create}
              fields={[{"name":"horario","label":"Horário","type":"date","required":true,"readOnly":false},{"name":"sala","label":"Sala","type":"text","required":true,"readOnly":false},{"name":"preco","label":"Preço","type":"number","required":true,"readOnly":false},{"name":"filmeId","label":"Filme","type":"number","required":true,"readOnly":false,"relation":{"endpoint":"/api/filmes","valueKey":"id","labelKey":"titulo"}}]}
              submitLabel="Adicionar"
              relationLoaders={{ "filmeId": filmesService.list }}
              onSuccess={() => {
                setCreateOpen(false);
                setReloadToken((value) => value + 1);
              }}
            />
          </section>
        </div>,
        document.body
      )}
    </div>
  );
}
