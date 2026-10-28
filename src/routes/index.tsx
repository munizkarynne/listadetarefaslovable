import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minhas Tarefas" },
      { name: "description", content: "Lista de tarefas simples para demonstração em aula." },
      { property: "og:title", content: "Minhas Tarefas" },
      { property: "og:description", content: "Lista de tarefas simples para demonstração em aula." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Task = { id: number; text: string; done: boolean };

export function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [editError, setEditError] = useState("");
  const draftInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId !== null) draftInputRef.current?.focus();
  }, [editingId]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setTasks([...tasks, { id: Date.now(), text: t, done: false }]);
    setText("");
  };

  const toggle = (id: number) =>
    setTasks(tasks.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const remove = (id: number) => setTasks(tasks.filter((x) => x.id !== id));

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setDraft(task.text);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft("");
    setEditError("");
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = draft.trim();
    if (!next) {
      setEditError("O título não pode ficar vazio.");
      return;
    }
    setTasks(tasks.map((x) => (x.id === editingId ? { ...x, text: next } : x)));
    cancelEdit();
  };

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto w-full max-w-lg rounded-2xl border bg-card p-6 shadow-lg sm:p-8">
        <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tasks.filter((t) => !t.done).length} pendente(s)
        </p>
        <form onSubmit={add} className="mt-6 flex flex-wrap gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nova tarefa..."
            className="min-w-0 flex-1 rounded-lg border bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground hover:opacity-90">
            Adicionar
          </button>
        </form>
        <ul className="mt-6 space-y-2">
          {tasks.length === 0 && (
            <li className="text-center text-sm text-muted-foreground">Nenhuma tarefa ainda.</li>
          )}
          {tasks.map((t) =>
            t.id === editingId ? (
              <li key={t.id} className="rounded-lg bg-secondary px-3 py-3 sm:px-4">
                <form onSubmit={saveEdit} className="flex flex-wrap items-center gap-2">
                  <input
                    ref={draftInputRef}
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value);
                      if (editError) setEditError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") cancelEdit();
                    }}
                    aria-label="Editar título da tarefa"
                    className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-secondary-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent"
                  >
                    Cancelar
                  </button>
                </form>
                {editError && (
                  <p role="alert" className="mt-2 text-sm text-destructive">
                    {editError}
                  </p>
                )}
              </li>
            ) : (
              <li
                key={t.id}
                className="flex flex-wrap items-center gap-2 rounded-lg bg-secondary px-3 py-3 sm:gap-3 sm:px-4"
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                  aria-label={`Concluir tarefa ${t.text}`}
                  className="h-5 w-5 shrink-0 accent-primary"
                />
                <span
                  className={`min-w-0 flex-1 text-secondary-foreground ${
                    t.done ? "line-through opacity-50" : ""
                  }`}
                >
                  {t.text}
                </span>
                <button
                  onClick={() => startEdit(t)}
                  className="text-sm text-primary hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => remove(t.id)}
                  className="text-sm text-destructive hover:underline"
                >
                  Remover
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </main>
  );
}