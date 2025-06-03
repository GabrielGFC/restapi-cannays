# 📦 RestAPI Cannays Boilerplate (Express.js • TypeScript • Sequelize)

Um boilerplate mínimo e pronto para uso para construir uma API REST de backend com **Express.js**, **TypeScript** e **Sequelize**. Inclui documentação via Swagger, configuração de ambiente, linting, migrações e testes.

---

## ✨ Funcionalidades

- ⚡ **Express.js** como framework HTTP  
- 📋 **Swagger** para documentação automática da API  
- 🛠 **TypeScript** com suporte completo a tipos  
- 📄 Linting e formatação com **ESLint** + **Prettier**  
- 🐘 **Sequelize** ORM para migrações e modelos de banco de dados  
- 🔐 Exemplo de autenticação baseada em JWT (módulo de Auth)  
- 🧪 **Jest** para testes unitários

---

## 🚀 Pré-requisitos

- **Node.js** >= 18.x  
- **npm** (ou **Yarn**)  
- Um banco de dados relacional (por exemplo, PostgreSQL, MySQL, MariaDB, SQLite)

---
## 📥 Instalação

1. **Clone** o repositório:

   ```bash
   git clone https://github.com/GabrielGFC/restapi-cannays.git
   cd restapi-cannays``

2. **Instale as dependências**:

   ```bash
   npm install
   # ou
   # yarn install
   ```

3. **Crie e preencha** seu arquivo de ambiente:

    * Copie o exemplo:

      ```bash
      cp .env.example .env.development
      ```

    * Edite `.env.development` com seus próprios valores:

      ```ini
      # ── Servidor ─────────────────────────────────────────────────
      PORT=5000
      NODE_ENV=development
      BASE_URL=http://localhost:5000
 
      # ── Banco de Dados ──────────────────────────────────────────
      DB_DIALECT=postgres      # ex.: postgres, mysql, sqlite
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=seu_usuario_db
      DB_PASSWORD=sua_senha_db
      DB_NAME=seu_nome_db
 
      # ── JWT ──────────────────────────────────────────────────────
      JWT_ACCESS_TOKEN_SECRET=sua_chave_secreta_jwt
      JWT_EXPIRES_IN=1h
      ```

4. **(Opcional) Crie um `.env` global** se precisar de múltiplos ambientes (`.env.development`, `.env.test`, `.env.production`).
   – Cada ambiente deve ter sua própria configuração (por exemplo, credenciais de BD diferentes).

---

## 🏃 Executando o Servidor

* **Modo de desenvolvimento** (com recarregamento automático via `ts-node-dev` ou `nodemon`):

  ```bash
  npm run dev
  ```

  Este script irá:

    1. Compilar TypeScript na memória
    2. Iniciar o servidor Express na porta `PORT` (padrão: 5000)
    3. Observar mudanças (reinicia ao atualizar arquivos `.ts`)

* **Modo de produção** (compilar → executar):

  ```bash
  npm run build
  npm start
  ```
## 🛠 Scripts

```jsonc
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",

    "lint": "eslint \"src/**/*.ts\"",
    "lint:fix": "eslint \"src/**/*.ts\" --fix",

    "migration:generate": "sequelize-cli migration:generate --config src/config/sequelizeConfig.js",
    "migration:run": "sequelize-cli db:migrate --config src/config/sequelizeConfig.js",
    "migration:undo": "sequelize-cli db:migrate:undo --config src/config/sequelizeConfig.js",

    "test": "jest --runInBand",
    "test:watch": "jest --watchAll",

    "swagger:generate": "node src/utils/swagger.ts" // se tiver script personalizado para gerar docs do Swagger
  }
}
```

---

## 📂 Estrutura do Projeto

```
├── node_modules
├── src
│   ├── config
│   │   ├── env.ts                 # Carrega e valida variáveis de ambiente
│   │   └── sequelizeConfig.js     # Configuração do Sequelize CLI
│   ├── database
│   │   ├── migrations             # Arquivos de migração do Sequelize
│   │   └── models                 # Definições de modelos Sequelize
│   ├── docs                       # Arquivos YAML/JSON do Swagger (se separado)
│   ├── interfaces                 # Interfaces e DTOs em TypeScript
│   ├── logs                       # (Opcional) Pasta de logs (por exemplo, saída do morgan)
│   ├── middleware                 # Middlewares do Express (ex.: autenticação, tratamento de erros)
│   ├── modules                    # Módulos de funcionalidades (cada pasta contém repositório, serviço, controller, rotas, validadores)
│   │   ├── auth
│   │   ├── user
│   │   └── ...
│   ├── routes                     # Roteador principal que importa roteadores de módulos
│   ├── types                      # Tipos customizados de TypeScript (ex.: extensões de `Express.Request`)
│   ├── utils                      # Funções utilitárias (ex.: logger, formatação de erros, setup do Swagger)
│   └── server.ts                  # Ponto de entrada da aplicação (configuração do Express + montagem de rotas)
├── tests                          # Testes unitários/integrados (espelha `src/`)
│   ├── middleware
│   └── modules
├── .env.example                   # Exemplo de variáveis de ambiente
├── .eslintrc.js                   # Configuração do ESLint
├── .prettierrc                    # Configuração do Prettier
├── jest.config.js                 # Configuração do Jest
├── package.json
└── README.md
```

---

## 🔧 Variáveis de Ambiente

Use `.env.development`, `.env.test` e `.env.production` para manter variáveis separadas por ambiente. No mínimo, você deve fornecer:

```ini
# .env.example

PORT=
NODE_ENV=
BASE_URL=

# Banco de Dados
DB_DIALECT=          # ex.: postgres, mysql, sqlite
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

# JWT
JWT_ACCESS_TOKEN_SECRET=
JWT_EXPIRES_IN=      # ex.: '1h', '7d'
```

---

## 📄 Linting & Formatação

* **Verificar erros de lint**:

  ```bash
  npm run lint
  ```

* **Auto-corrigir formatação**:

  ```bash
  npm run lint:fix
  ```

* **Prettier** está integrado via ESLint (veja `.eslintrc.js`).

---

## 🛠 Sequelize & Migrações

1. **Configure** `src/config/sequelizeConfig.js` (ou `.ts`) com as suas configurações de banco de dados (compatíveis com `.env.*`).

2. **Gerar uma nova migração**:

   ```bash
   npm run migration:generate -- --name create_users_table
   ```

   > Note que é preciso usar `--` antes de `--name` quando executado via npm script.

3. **Executar migrações pendentes**:

   ```bash
   npm run migration:run
   ```

4. **Reverter a última migração**:

   ```bash
   npm run migration:undo
   ```

Todos os arquivos de migração ficam em `src/database/migrations`, e os modelos em `src/database/models`.

---

## 📚 Documentação da API (Swagger)

* **Ponto de montagem**:
  Por padrão, a interface Swagger UI estará disponível em:

  ```
  http://localhost:<PORT>/api-docs
  ```

* **Geração automática**:
  As rotas são anotadas com comentários JSDoc no estilo Swagger. Ao inicializar o servidor, o JSON do Swagger é gerado automaticamente (via `swagger-jsdoc` ou um utilitário personalizado `swagger.ts`).

    * Se precisar gerar manualmente o JSON, execute:

      ```bash
      npm run swagger:generate
      ```

---

## 🔒 Exemplo de Autenticação

O módulo `auth` inclui:

* **Cadastro** (`POST /api/auth/signup`)
* **Login** (`POST /api/auth/signin`)
* **Refresh de Token** (`POST /api/auth/refresh-token`)
* Exemplo de rota protegida (ex.: `GET /api/user/profile`)

Tokens JWT são assinados com `JWT_ACCESS_TOKEN_SECRET` e expiram de acordo com `JWT_EXPIRES_IN`.

---

## 🧪 Testes

* **Executar todos os testes**:

  ```bash
  npm run test
  ```

* **Executar apenas um arquivo de teste**:

  ```bash
  npm run test -- tests/modules/user/user.service.test.ts
  ```

Os testes usam **Jest** e estão localizados em `tests/`. Por padrão, apontam para um banco de dados de teste separado (configure `.env.test` conforme abaixo). Exemplo:

```ini
# .env.test
NODE_ENV=test
DB_DIALECT=sqlite
DB_STORAGE=:memory:
JWT_ACCESS_TOKEN_SECRET=test_jwt_secret
JWT_EXPIRES_IN=1m
```