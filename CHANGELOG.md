# Histórico de versões

## v1.1 — 28/10/2026 — Versão JavaScript

Conversão completa de TypeScript para JavaScript.

- Arquivos da aplicação renomeados de `.ts`/`.tsx` para `.js`/`.jsx`, sem anotações de tipo:
  `src/routes/index.jsx`, `src/routes/__root.jsx`, `src/router.jsx`, `src/start.js`,
  `src/server.js` e os quatro arquivos de `src/lib/`.
- Configurações da raiz convertidas para JavaScript: `vite.config.js` e `vitest.config.js`.
- `tsconfig.json` atualizado para apontar para os arquivos `.js` (o arquivo é `.json` e é
  lido pela plataforma pelo nome exato, por isso continua existindo).
- Removidos os componentes de interface em `.tsx` que não eram usados pelo app
  (pastas `src/components/` e `src/hooks/`).
- Testes convertidos para JavaScript: `src/test/setup.js`, `src/test/app-routing.test.jsx`
  e `src/test/task-editing.test.jsx` — 5 testes, todos passando.
- Permanece em TypeScript apenas `src/routeTree.gen.ts`, que é gerado automaticamente
  pela ferramenta de rotas e é sobrescrito a cada mudança de rota.

## v1.0 — Versão inicial em TypeScript

- `v0.3` — Edição do título de uma tarefa já cadastrada, com **Salvar** e **Cancelar**,
  bloqueio de título vazio ou só com espaços e manutenção do título anterior ao cancelar.
- `v0.2` — Marcar tarefa como concluída e removê-la da lista.
- `v0.1` — Lista de tarefas inicial: campo de texto, botão **Adicionar** e contador de pendentes.
