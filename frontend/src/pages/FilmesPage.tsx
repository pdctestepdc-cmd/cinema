import { DataTable, ApiForm, PageBreadcrumb } from "../components";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { filmesService } from "../services/filmes.service";

export default function FilmesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const closeCreateDialog = () => setCreateOpen(false);


  return (
    <div className="page">

      <PageBreadcrumb items={[{ label: `Listagem de Filmes` }]} />

      <header className="page-header">
        <div>
          <h1 className="page-title">{`Listagem de Filmes`}</h1>
        </div>
      </header>
      <p style={{ margin: "-18px 0 20px 0" }}>{`Gerencie filmes cadastrados, revise status e execute ações recorrentes.`}</p>
      <div className="page-actions">
        <button className="btn btn-primary" type="button" onClick={() => setCreateOpen(true)}>
          <Plus size={16} aria-hidden="true" />
          Adicionar
        </button>
      </div>
      <DataTable load={filmesService.list} reloadToken={reloadToken} columns={[{"key":"titulo","label":"Título"},{"key":"duracao","label":"Duração (min)"},{"key":"genero","label":"Gênero"},{"key":"classificacao","label":"Classificação"},{"key":"sinopse","label":"Sinopse"}]} idKey={"id"} fields={[{"name":"titulo","label":"Título","type":"text","required":true,"readOnly":false},{"name":"duracao","label":"Duração (min)","type":"number","required":true,"readOnly":false},{"name":"genero","label":"Gênero","type":"text","required":true,"readOnly":false},{"name":"classificacao","label":"Classificação","type":"text","required":true,"readOnly":false},{"name":"sinopse","label":"Sinopse","type":"textarea","required":true,"readOnly":false}]} onUpdate={filmesService.update} onDelete={filmesService.remove} />
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
              submit={filmesService.create}
              fields={[{"name":"titulo","label":"Título","type":"text","required":true,"readOnly":false},{"name":"duracao","label":"Duração (min)","type":"number","required":true,"readOnly":false},{"name":"genero","label":"Gênero","type":"text","required":true,"readOnly":false},{"name":"classificacao","label":"Classificação","type":"text","required":true,"readOnly":false},{"name":"sinopse","label":"Sinopse","type":"textarea","required":true,"readOnly":false}]}
              submitLabel="Adicionar"
              
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
