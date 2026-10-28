import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { Index } from "@/routes/index";

// Helpers that drive the app the same way a user would: type in the add form,
// click the buttons the app renders, then read the title back from the list.
function addTask(title) {
  fireEvent.change(screen.getByPlaceholderText("Nova tarefa..."), { target: { value: title } });
  fireEvent.click(screen.getByRole("button", { name: "Adicionar" }));
}

function rowFor(title) {
  return screen.getByText(title).closest("li");
}

function openEdit(title) {
  fireEvent.click(within(rowFor(title)).getByRole("button", { name: "Editar" }));
}

function removeTask(title) {
  fireEvent.click(within(rowFor(title)).getByRole("button", { name: "Remover" }));
}

function typeDraft(value) {
  fireEvent.change(screen.getByLabelText("Editar título da tarefa"), { target: { value } });
}

describe("Editing a task title", () => {
  beforeEach(() => {
    render(<Index />);
    addTask("Estudar matemática");
  });

  it("saves a new title typed in edit mode", () => {
    openEdit("Estudar matemática");
    typeDraft("Revisar álgebra");
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

    expect(screen.getByText("Revisar álgebra")).toBeInTheDocument();
    expect(screen.queryByText("Estudar matemática")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Editar título da tarefa")).not.toBeInTheDocument();
  });

  it("refuses to save an empty or whitespace-only title and keeps the previous one", () => {
    openEdit("Estudar matemática");
    typeDraft("   ");
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

    expect(screen.getByRole("alert")).toHaveTextContent("O título não pode ficar vazio.");
    expect(screen.getByLabelText("Editar título da tarefa")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.getByText("Estudar matemática")).toBeInTheDocument();
  });

  it("keeps the previous title when editing is cancelled", () => {
    openEdit("Estudar matemática");
    typeDraft("Título descartado");
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.getByText("Estudar matemática")).toBeInTheDocument();
    expect(screen.queryByText("Título descartado")).not.toBeInTheDocument();
  });

  it("still adds, completes and removes tasks alongside editing", () => {
    addTask("Ler o capítulo 3");
    expect(screen.getByText("Ler o capítulo 3")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Concluir tarefa Estudar matemática"));
    expect(screen.getByLabelText("Concluir tarefa Estudar matemática")).toBeChecked();

    removeTask("Ler o capítulo 3");
    expect(screen.queryByText("Ler o capítulo 3")).not.toBeInTheDocument();
    expect(screen.getByText("Estudar matemática")).toBeInTheDocument();
  });
});
