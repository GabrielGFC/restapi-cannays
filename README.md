#

Um projeto base moderno para construção de APIs RESTful utilizando Node.js, TypeScript, Express e PostgreSQL.

---

## Índice

- [1. Pré-requisitos](#1-pré-requisitos)
- [2. Instalação](#2-instalação)
- [3. Configuração do Ambiente](#3-configuração-do-ambiente)
- [4. Rodando o Projeto](#4-rodando-o-projeto)
- [5. Docker](#5-docker)
- [6. Scripts](#6-scripts)
- [7. Autor](#7-autor)


## 1. Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- Yarn


## 2. Instalação

Clone o repositório:

```bash
git clone https://github.com/GabrielGFC/restapi-cannays.git
cd restapi-cannays
```

Instale as dependências:

```bash
yarn install
```


## 3. Configuração do Ambiente

Crie um arquivo `.env` com base no exemplo abaixo:

```dotenv
PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=uma_chave_secreta_segura
```


## 4. Rodando o Projeto

Modo desenvolvimento:

```bash
yarn dev
```

Build de produção:

```bash
yarn build
```

Executar build:

```bash
yarn start
```


## 5. Docker

Subir o projeto com Docker:

```bash
docker-compose up --build
```

Certifique-se de que o `.env` esteja corretamente configurado.


## 6. Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "start": "node dist/server.js",
  "build": "tsc",
  "lint": "eslint . --ext .ts",
  "format": "prettier --write ."
}
```


## 7. Autor

Gabriel de Carvalho  
[linkedin.com/in/gabrielgfc1](https://linkedin.com/in/gabrielgfc1)