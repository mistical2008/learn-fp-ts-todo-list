# Monorepo starter
## Key features
- feature-sliced architecture
- openapi api-client generator
- shared types

![feature-sliced-scheme](https://feature-sliced.design/assets/images/hierarchy-of-concepts-3d899f33a6acd0a9bdc9696c07cce7a1.jpg) 
Верхний уровень представляют слои. Любой верхний слой может зависеть от нижележащего, но не наоборот. Например слой `app` может импортировать все остальные слои, т.к. находится на верхнем уровне иерархии. В то же время слой `shared` не может импортировать ничего за рамками слайса.
`Слайсы` — это секции слоя. В рамках одного слоя слайсы не могут импортировать друг друга. Только из нижележащих слоев.
Более подробно c методологией можно ознакомиться по [ссылке](https://feature-sliced.design/).

## Technological stack
- Frontend:
    - `React.js` (ui)
    - `recharts` (charts)
    - `react-virtual` (virtual lists)
    - `elastic-ui` (ui-components)
    - `react-query` (server state)
    - `effector` (app state)
    - `typescript`
    - `socket.io-client` (websockets)
    - `vitejs` (bundler)
- package manager: `pnpm`

## Project start
```sh
### Install deps and run dev mode
pnpm i -r
pnpm dev
```

### Openapi API-client geneartion
```sh
pnpm api:client:g
```

## Production mode
> WIP: currently breaks
```sh
# Without type checking
pnpm preview:nocheck

# With type checking
pnpm preview
```
