# Aplicação de Registro de Livros

Esta aplicação permite que os usuários registrem os livros que leram, atribuam uma nota e compartilhem uma breve opinião sobre cada leitura. É um sistema simples para manter um histórico pessoal dos livros lidos e armazenar suas impressões sobre eles.

## Funcionalidades

- Adicionar novos livros com título, nota e uma breve descrição/opinião.
- Exibir a lista de livros em uma tabela paginada.
- Permitir a edição e remoção de registros de livros.
- Realizar buscas rápidas pelo título do livro.
- Interface amigável e fácil de navegar.
- Esta aplicação é ideal para pessoas que gostam de acompanhar e documentar suas leituras, guardando suas opiniões de forma organizada.


## Tecnologias Utilizadas

### Frontend

- **React**: Biblioteca principal para construção da interface de usuário.
- **React Router DOM**: Gerenciamento de rotas no lado do cliente.
- **Vite**: Ferramenta de build e desenvolvimento rápida e otimizada.
- **React Hook Form**: Gerenciamento de formulários de forma simples e performática.
- **Zod**: Validação de dados com segurança de tipos.
- **TanStack React Query**: Gerenciamento de estado de dados assíncronos.
- **Jotai**: Gerenciamento de estado global simples e reativo.
- **Axios**: Biblioteca para requisições HTTP.
- **ESLint & Prettier**: Ferramentas de linting e formatação de código para garantir qualidade e consistência.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, garantindo maior robustez no desenvolvimento.

### Backend

- **Laravel**: Framework PHP robusto e expressivo para construção de aplicações web.
- **PHP 8.2**: Linguagem de programação utilizada no backend, conhecida por sua flexibilidade e desempenho.
- **Laravel Sanctum**: Solução simples para autenticação de API, oferecendo segurança e facilidade de uso.
- **Laravel Sail**: Ferramenta de desenvolvimento local com Docker para facilitar a configuração e o uso de containers.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de dados, conhecido por sua confiabilidade e desempenho.
- **Docker**: Plataforma para criação, deployment e execução de containers, usada para facilitar a configuração do ambiente de desenvolvimento.


## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:DaviAbranges/Teste-tecnico-zievo.git
```
```bash
cd Teste-tecnico-zievo
```

### Iniciando o backend

1. Entre na pasta api

   ```bash
   cd api
   ```

2. Abra o seu editor de código e configure as variáveis de ambiente no arquivo `.env`:


```
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=library
DB_USERNAME=root
DB_PASSWORD=root
```
**Observação**: Mude as credenciais de acordo com sua necessidade. Caso esteja usando um banco de dados diferente ou um ambiente de produção, atualize o nome do banco, o usuário e a senha para as configurações correspondentes.

3. Suba o ambiente Docker:
  ```bash
docker-compose up -d
```

5. Instale as dependências do backend:

```bash
composer install
```

5. Rode as migrations necessarias:

```bash
php artisan migrate
```

6. Rodar o servidor local:
```bash
php artisan serve
```

### Iniciando o frontend

1. Entre na pasta web:

```bash
cd Teste-tecnico-zievo/web
```

2. Instale as dependências do frontend:

```bash
npm install
```

3. Inicie a aplicacao web:

```bash
npm run dev
```

## Como Usar

### Registro e Login

- Registre-se na aplicação e faça login.
- O token de autenticação será armazenado localmente para gerenciar o acesso.

### Gerenciamento de livros

- Após o login, você poderá visualizar seus livros e criar novos.
- Os livros serão listados em uma tabela com opções de ações.
- Um formulário para criação de novos livros será renderizado na mesma página.
```
├── api
│   ├── app
│   ├── artisan
│   ├── bootstrap
│   ├── composer.json
│   ├── composer.lock
│   ├── config
│   ├── database
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── phpunit.xml
│   ├── postcss.config.js
│   ├── public
│   ├── README.md
│   ├── resources
│   ├── routes
│   ├── storage
│   ├── tailwind.config.js
│   ├── tests
│   ├── vendor
│   └── vite.config.js
└── web
    ├── eslintrc.json
    ├── index.html
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── public
    ├── README.md
    ├── src
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts

```










