# 📔 Diário de Gratidão

Uma aplicação web moderna para registrar e gerenciar seus momentos de gratidão diários. Construída com as mais recentes tecnologias do ecossistema Next.js e React.

## ✨ Funcionalidades

- 🔐 **Autenticação Completa**: Login, registro e recuperação de senha
- 📝 **Gerenciamento de Diários**: Criar, editar e excluir diários de gratidão
- 🏷️ **Categorização**: Organize seus diários por tipo (Família, Trabalho, Religioso, Outros)
- 🔍 **Busca e Filtros**: Encontre rapidamente seus registros
- 🖼️ **Upload de Imagens**: Adicione imagens aos seus diários via Cloudinary
- 👤 **Perfil de Usuário**: Gerencie suas informações e segurança da conta
- 🎨 **Interface Moderna**: Design limpo e responsivo com Shadcn UI
- ⚡ **Performance**: Caching otimizado com Next.js 16 e React 19

## 🚀 Tecnologias

### Core

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática

### UI & Estilização

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn UI](https://ui.shadcn.com/)** - Componentes UI acessíveis e customizáveis
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de UI sem estilo
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### Backend & Database

- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript-first
- **[Neon Database](https://neon.tech/)** - PostgreSQL serverless
- **[Better Auth](https://www.better-auth.com/)** - Autenticação moderna

### Validação & Forms

- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários

### Upload & Storage

- **[Cloudinary](https://cloudinary.com/)** - Gerenciamento de imagens na nuvem
- **[Next Cloudinary](https://next.cloudinary.dev/)** - Integração Cloudinary/Next.js

### Ferramentas de Desenvolvimento

- **[Biome](https://biomejs.dev/)** - Linter e formatador ultrarrápido
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Migrações de banco de dados

## 📋 Pré-requisitos

- Node.js 20+
- pnpm (gerenciador de pacotes)
- Conta no Neon Database
- Conta no Cloudinary
- Serviço de email (Resend)

## 🔧 Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd diario
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env.local` na raiz do projeto:

   ```env
   # Database
   DATABASE_URL=sua_url_do_neon_database

   # Better Auth
   BETTER_AUTH_SECRET=sua_chave_secreta
   BETTER_AUTH_URL=http://localhost:3000

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu_cloud_name
   CLOUDINARY_API_KEY=sua_api_key
   CLOUDINARY_API_SECRET=seu_api_secret

   # Resend (Email)
   RESEND_API_KEY=sua_resend_api_key
   ```

4. **Execute as migrações do banco de dados**

   ```bash
   pnpm drizzle-kit push
   ```

5. **Inicie o servidor de desenvolvimento**

   ```bash
   pnpm dev
   ```

6. **Acesse a aplicação**

   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
diario/
├── app/                      # App Router do Next.js
│   ├── dashboard/           # Página do dashboard
│   ├── configuracoes/       # Página de configurações
│   └── page.tsx             # Página de login/home
├── components/              # Componentes React
│   ├── dashboard/          # Componentes do dashboard
│   ├── configuracoes/      # Componentes de configurações
│   ├── login/              # Componentes de autenticação
│   └── ui/                 # Componentes UI (Shadcn)
├── actions/                # Server Actions
│   ├── diarios.ts          # Ações CRUD de diários
│   ├── user.ts             # Ações de usuário
│   └── upload.ts           # Upload de imagens
├── lib/                    # Utilitários e configurações
│   ├── data.ts             # Queries cacheadas
│   ├── auth.ts             # Configuração Better Auth
│   ├── constants.ts        # Constantes da aplicação
│   └── utils.ts            # Funções utilitárias
├── db/                     # Configuração do banco de dados
│   ├── drizzle.ts          # Cliente Drizzle
│   └── schema.ts           # Schemas do banco
└── types/                  # Definições TypeScript
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia o servidor de desenvolvimento

# Build
pnpm build            # Cria build de produção
pnpm start            # Inicia servidor de produção

# Qualidade de Código
pnpm lint             # Verifica problemas com Biome
pnpm format           # Formata código com Biome

# Database
pnpm drizzle-kit push     # Aplica schemas ao banco
pnpm drizzle-kit studio   # Abre Drizzle Studio
```

## 🔑 Funcionalidades Principais

### Autenticação

- Login com email e senha
- Registro de novos usuários
- Recuperação de senha via email
- Sessões seguras com Better Auth

### Diários de Gratidão

- Criar novos diários com título, descrição, tipo e imagem
- Editar diários existentes
- Excluir diários com confirmação
- Visualizar lista de todos os diários

### Busca e Filtros

- Busca por título de diário
- Filtro por tipo (Família, Trabalho, Religioso, Outros)
- Contador de resultados

### Perfil do Usuário

- Atualizar nome de usuário
- Alterar senha
- Avatar personalizado

## 🎨 Design System

O projeto utiliza o **Shadcn UI** com o tema **Blue**, proporcionando:

- Interface limpa e moderna
- Componentes acessíveis (WCAG)
- Responsividade em todos os dispositivos
- Modo de foco e estados visuais claros

## ⚡ Otimizações de Performance

- **React Cache**: Deduplicação de queries no mesmo request
- **Component Caching**: Componentes cacheados com `use cache`
- **Server Components**: Renderização no servidor por padrão
- **Image Optimization**: Otimização automática via Next.js Image
- **Code Splitting**: Carregamento otimizado de código

## 🔒 Segurança

- Headers de segurança configurados (CSP, HSTS, etc.)
- Validação de entrada com Zod
- SQL injection protection via Drizzle ORM
- Senhas criptografadas com bcrypt
- Sessões seguras com Better Auth

## 📝 Licença

Este projeto é privado e proprietário.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando as melhores práticas do ecossistema Next.js

---

**Versão**: 0.1.0  
**Node**: 20+  
**Package Manager**: pnpm
