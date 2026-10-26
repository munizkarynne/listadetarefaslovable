import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setTasks([...tasks, { id: Date.now(), text: t, done: false }]);
    setText("");
  };

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-foreground">Minhas Tarefas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tasks.filter((t) => !t.done).length} pendente(s)
        </p>
        <form onSubmit={add} className="mt-6 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-1 rounded-lg border bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground hover:opacity-90">
            Adicionar
          </button>
        </form>
        <ul className="mt-6 space-y-2">
          {tasks.length === 0 && (
            <li className="text-center text-sm text-muted-foreground">Nenhuma tarefa ainda.</li>
          )}
          {tasks.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() =>
                  setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                }
                className="h-5 w-5 accent-primary"
              />
              <span className={`flex-1 text-secondary-foreground ${t.done ? "line-through opacity-50" : ""}`}>
                {t.text}
              </span>
              <button
                onClick={() => setTasks(tasks.filter((x) => x.id !== t.id))}
                className="text-sm text-destructive hover:underline"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
