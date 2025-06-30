# TECNOLOGIAS UTILIZADAS: 

Frontend: React + TypeScript + TailwindCSS

Backend: Node.js + Express + TypeScript

Banco de Dados: PostgreSQL + Prisma ORM

Validação: Zod

Autenticação: JWT (JSON Web Token)

Testes: Jest + Supertest


# INSTRUÇÕES PARA RODAR O PROJETO

# CLONE O REPOSITÓRIO

git clone https://github.com/seu-usuario/nome-do-projeto.git
    cd nome-do-projeto

# Configurar o Backend instalando as dependencias 
    npm install

# Configurar Variáveis de Ambiente
    DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
    JWT_SECRET=sua_chave_secreta
    PORT=3000

# Criar e Migrar o Banco de Dados
    npx prisma migrate dev --name init

# Rodar o Backend
    npm run dev

#  Rodar os Testes
    cd backend
    npm run test