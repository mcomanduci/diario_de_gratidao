# 📔 Diário de Gratidão

Uma aplicação web moderna e completa para registrar e gerenciar entradas diárias de gratidão. Construída com Next.js 16, React 19, e focada em bem-estar mental e hábitos diários positivos.

---

## Resumo Executivo

**Diário de Gratidão** é uma plataforma de journaling focada em privacidade, projetada para ajudar usuários a cultivar gratidão e mindfulness através de reflexões diárias. A aplicação fornece uma interface segura e intuitiva para criar, organizar e refletir sobre momentos de gratidão.

**Por que existe**: Pesquisas mostram que praticar gratidão melhora a saúde mental, reduz o estresse e aumenta o bem-estar geral. Esta aplicação torna o journaling de gratidão acessível, envolvente e sustentável através de recursos como rastreamento de sequências, categorização, melhorias visuais e análises perspicazes.

**Principais Diferenciais**:
- 🔒 **Privacidade em primeiro lugar**: Todos os dados são criptografados e controlados pelo usuário
- 🎨 **UX Moderna**: Design limpo e responsivo com suporte a sons ambientes
- 📊 **Insights**: Análises visuais e estatísticas de gratidão
- 🔄 **Fluido**: Atualizações em tempo real com padrões otimistas de UI
- 🌐 **Serverless**: Infraestrutura escalável pronta para edge

---

## Visão Geral da Arquitetura

### Diagrama da Arquitetura do Sistema

```
┌────────────────────────────────────────────────────────────────┐
│                   Camada Cliente (Navegador)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Next.js App │  │ React 19 UI  │  │  Componentes Cliente │  │
│  │  (App Router)│  │  (RSC)       │  │  (Interatividade)    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼─────────────────┼─────────────────────┼──────────────┘
          │                 │                     │
          ▼                 ▼                     ▼
┌────────────────────────────────────────────────────────────────┐
│                   Servidor Next.js (Edge/Node)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ API Routes   │  │ Componentes  │  │  Server Actions      │  │
│  │ /api/*       │  │ Servidor     │  │  (Form Handlers)     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼─────────────────┼─────────────────────┼──────────────┘
          │                 │                     │
          ▼                 ▼                     ▼
┌────────────────────────────────────────────────────────────────┐
│                        Camada de Serviços                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Better Auth  │  │ Drizzle ORM  │  │  Cloudinary SDK      │  │
│  │ (Lógica Auth)│  │(Camada Dados)│  │  (Storage Imagens)   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼─────────────────┼─────────────────────┼──────────────┘
          │                 │                     │
          ▼                 ▼                     ▼
┌────────────────────────────────────────────────────────────────┐
│                      Serviços Externos                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Neon DB      │  │ Cloudinary   │  │  Resend (Email)      │  │
│  │ (PostgreSQL) │  │ (CDN/Media)  │  │  (Transacional)      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### Módulos e Componentes Principais

#### 📁 **`/app`** - Rotas da Aplicação (App Router)
- **`/dashboard`**: Dashboard principal com lista de diários, calendário, visualizações de timeline
- **`/configuracoes`**: Configurações do usuário (perfil, gerenciamento de senha)
- **`/reset-password`**: Fluxo de redefinição de senha
- **`/api/auth`**: Endpoints de autenticação (Better Auth)
- **`/api/send`**: Rota API para envio de email

#### 📁 **`/actions`** - Server Actions
- **`auth.ts`**: Ações de login, cadastro e redefinição de senha
- **`diarios.ts`**: Operações CRUD para entradas de diário (criar, ler, atualizar, deletar)
- **`upload.ts`**: Handler de upload de imagens Cloudinary
- **`user.ts`**: Gerenciamento de perfil do usuário

#### 📁 **`/components`** - Componentes UI
- **`/dashboard`**: Componentes específicos do dashboard (calendário, timeline, estatísticas, gráficos)
- **`/login`**: Formulários e diálogos de autenticação
- **`/configuracoes`**: Formulários de configurações
- **`/ui`**: Componentes reutilizáveis Shadcn UI

#### 📁 **`/db`** - Camada de Banco de Dados
- **`schema.ts`**: Definições de schema Drizzle ORM (tabelas user, session, diario)
- **`drizzle.ts`**: Inicialização do cliente de banco de dados
- **`/migrations`**: Arquivos de migração SQL

#### 📁 **`/lib`** - Bibliotecas Compartilhadas
- **`auth.ts`**: Configuração do Better Auth
- **`auth-client.ts`**: Utilitários de autenticação do lado do cliente
- **`env.ts`**: Validação de variáveis de ambiente (Zod)
- **`email.ts`**: Utilitários de envio de email (Resend)
- **`data.ts`**: Utilitários de busca e cache de dados
- **`prompts.ts`**: Gerador de prompts diários de gratidão

### Exemplo de Fluxo de Dados: Criando uma Entrada de Diário

```
Usuário preenche formulário → Evento de submit → Server Action (createDiario)
                                                           ↓
                                        Valida com schema Zod
                                                           ↓
                                        Insere no DB via Drizzle ORM
                                                           ↓
                                        Atualiza lógica de sequência do usuário
                                                           ↓
                                        Revalida cache → Atualiza UI
```

---

## Guia de Configuração

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js**: v20.x ou superior ([Download](https://nodejs.org/))
- **pnpm**: v9.x ou superior (Instalar: `npm install -g pnpm`)
- **Git**: Para clonar o repositório
- **PostgreSQL**: Instalação local ou use Neon (recomendado)

### Configuração do Ambiente

Você precisará de contas nos seguintes serviços:

1. **Neon Database** ([neon.tech](https://neon.tech)) - Banco de dados PostgreSQL
2. **Cloudinary** ([cloudinary.com](https://cloudinary.com)) - Armazenamento de imagens
3. **Resend** ([resend.com](https://resend.com)) - Entrega de emails

### Instalação

#### 1. Clone o Repositório

```bash
git clone https://github.com/mcomanduci/diario_de_gratidao.git
cd diario_de_gratidao
```

#### 2. Instale as Dependências

```bash
pnpm install
```

#### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` no diretório raiz:

```bash
# Banco de Dados
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Autenticação
BETTER_AUTH_SECRET="sua-chave-secreta-minimo-32-caracteres"
BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"

# Email (Resend)
RESEND_API_KEY="re_sua_resend_api_key"

# Público
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Importante**: Nunca faça commit do `.env.local` para controle de versão. Ele já está no `.gitignore`.

#### 4. Gere o Schema do Banco de Dados

Execute as migrações Drizzle para criar as tabelas do banco:

```bash
pnpm drizzle-kit push
```

Ou use o comando de migração:

```bash
pnpm drizzle-kit migrate
```

#### 5. Execute o Servidor de Desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### Verifique a Instalação

1. Navegue até `http://localhost:3000`
2. Clique em "Criar conta" para criar uma nova conta
3. Verifique a funcionalidade de email (veja o dashboard Resend)
4. Crie sua primeira entrada de diário
5. Faça upload de uma imagem para testar a integração Cloudinary

---

## Guia de Uso

### Primeiros Passos

#### 1. Criar uma Conta

Navegue até a página inicial e clique em **"Criar conta"**:

```typescript
// Exemplo: Payload de registro de usuário
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "SenhaSegura123!"
}
```

#### 2. Login

Após o registro, faça login com suas credenciais:

- Email: `joao@example.com`
- Senha: Sua senha escolhida

#### 3. Criar Sua Primeira Entrada de Diário

No dashboard:

1. Clique em **"Novo Diário"**
2. Adicione um título (ex: "Lindo Amanhecer")
3. Escreva sua descrição de gratidão
4. Selecione uma categoria: `Família`, `Trabalho`, `Religioso` ou `Outros`
5. Faça upload de uma imagem opcional
6. Clique em **"Salvar"**

### Recursos do Dashboard

#### 📅 **Visualização de Calendário**
Mude para o modo calendário para ver todas as entradas organizadas por data. Dias com entradas são destacados.

#### 📊 **Estatísticas e Insights**
Visualize sua jornada de gratidão:
- **Sequência Atual**: Dias consecutivos com entradas
- **Total de Entradas**: Contagem vitalícia de diários
- **Distribuição por Categoria**: Divisão visual por tipo
- **Gráfico Mensal**: Entradas por mês com tendências

#### 🔍 **Busca e Filtro**
- **Busca**: Encontre entradas por título ou descrição
- **Filtro por Tipo**: Mostre apenas categorias específicas
- **Intervalo de Datas**: Filtre entradas por períodos customizados

#### 🎵 **Sons Ambientes** (Modo Foco)
Habilite sons de fundo calmantes enquanto escreve:
- Sons de chuva
- Ambiente de floresta
- Ondas do oceano
- Ruído branco

### Endpoints da API

#### Endpoints de Autenticação

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/auth/sign-in` | POST | Login do usuário |
| `/api/auth/sign-up` | POST | Registro de usuário |
| `/api/auth/sign-out` | POST | Logout do usuário |
| `/api/auth/reset-password` | POST | Solicitar redefinição de senha |

#### Server Actions (Handlers de Formulário)

```typescript
// Exemplo: Criando uma entrada de diário (de componente cliente)
import { createDiario } from '@/actions/diarios';

const formData = {
  title: "Dia Incrível",
  description: "Grato pela minha família apoiadora",
  type: "Família",
  image: "https://res.cloudinary.com/..."
};

const result = await createDiario(formData);
```

### Exemplos de Cenários de Uso

#### Cenário 1: Rotina Diária de Gratidão

```typescript
// Rotina matinal: Criar entrada
const morningEntry = await createDiario({
  title: "Café da Manhã",
  description: "Grato por uma manhã pacífica com café",
  type: "Outros",
  image: "uploaded-image-url"
});

// Rotina noturna: Revisar estatísticas
const stats = await getUserStats();
console.log(`Sequência atual: ${stats.streak} dias`);
```

#### Cenário 2: Revisão Mensal

```typescript
// Obter todas as entradas do mês passado
const lastMonth = await getDiarios({
  startDate: new Date('2025-10-01'),
  endDate: new Date('2025-10-31'),
  type: 'Família'
});

// Exportar dados
const exportData = await exportUserData();
```

---

## Configuração

### Variáveis de Ambiente

Todas as variáveis de ambiente são validadas usando schemas Zod em `/lib/env.ts`. Aqui está um detalhamento:

#### Configuração do Banco de Dados

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `DATABASE_URL` | ✅ Sim | String de conexão PostgreSQL | `postgresql://user:pass@host/db` |

**Guia de Configuração**:
1. Crie um banco Neon: [neon.tech](https://neon.tech)
2. Copie a string de conexão do dashboard
3. Certifique-se de que `?sslmode=require` está anexado

#### Configuração de Autenticação

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `BETTER_AUTH_SECRET` | ✅ Sim | Chave secreta para assinatura JWT (mín 32 chars) | `sua-chave-super-secreta-aqui-32-chars` |
| `BETTER_AUTH_URL` | ✅ Sim | URL da aplicação para callbacks de auth | `http://localhost:3000` |

**Gerar Secreto**:
```bash
# No Linux/Mac
openssl rand -base64 32

# No Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

#### Configuração do Cloudinary

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `CLOUDINARY_CLOUD_NAME` | ✅ Sim | Nome do seu cloud Cloudinary | `myapp-cloud` |
| `CLOUDINARY_API_KEY` | ✅ Sim | API key do dashboard | `123456789012345` |
| `CLOUDINARY_API_SECRET` | ✅ Sim | API secret (mantenha privado!) | `abcdefghijklmnop` |

**Guia de Configuração**:
1. Cadastre-se em [cloudinary.com](https://cloudinary.com)
2. Navegue até Dashboard → Settings → API Keys
3. Crie uma nova API key ou use a padrão
4. Copie Cloud Name, API Key e API Secret

#### Configuração de Email (Resend)

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `RESEND_API_KEY` | ✅ Sim | API key Resend (começa com `re_`) | `re_123abc456def` |

**Guia de Configuração**:
1. Cadastre-se em [resend.com](https://resend.com)
2. Vá em API Keys → Create API Key
3. Copie a chave (mostrada apenas uma vez!)

#### Configuração Pública

| Variável | Obrigatória | Descrição | Exemplo |
|----------|-------------|-----------|---------|
| `NEXT_PUBLIC_APP_URL` | ✅ Sim | URL pública da aplicação | `https://myapp.com` |

**Nota**: Variáveis prefixadas com `NEXT_PUBLIC_` são expostas ao navegador.

### Arquivos de Configuração

#### `next.config.ts`

```typescript
// Otimização de imagens
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    },
  ],
}

// Cabeçalhos de segurança
headers: [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  // ... mais cabeçalhos de segurança
]
```

#### `drizzle.config.ts`

```typescript
export default defineConfig({
  schema: "./db/schema.ts",      // Definições de schema
  out: "./db/migrations",        // Saída de migrações
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

#### `biome.json` (Linting & Formatação)

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "lineWidth": 80
  }
}
```

### Melhores Práticas de Gerenciamento de Secrets

1. **Nunca faça commit de secrets**: Sempre use `.env.local` (gitignored)
2. **Use gerenciadores de secrets**: Para produção, use Vercel Env Vars, AWS Secrets Manager, etc.
3. **Rotacione secrets regularmente**: Mude API keys a cada 90 dias
4. **Princípio do menor privilégio**: Use chaves somente leitura quando possível
5. **Valide secrets**: Use validação Zod para capturar vars faltando cedo

#### Gerenciamento de Secrets em Produção

**Deploy Vercel**:
```bash
# Adicione secrets via Vercel CLI
vercel env add DATABASE_URL
vercel env add BETTER_AUTH_SECRET
# ... adicione todos os outros secrets
```

**Deploy Docker**:
```bash
# Use Docker secrets
docker secret create db_url /path/to/db_url.txt
```

---

## Testes

### Status Atual dos Testes

⚠️ **Nota**: Este projeto atualmente não possui uma suíte de testes abrangente implementada. A infraestrutura de testes está planejada para lançamentos futuros.

### Estratégia de Testes Recomendada

Para contribuidores implementando testes, siga esta abordagem:

#### Testes Unitários (Jest + React Testing Library)

**Configuração**:
```bash
pnpm add -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

**Estrutura de Teste Exemplo**:
```typescript
// __tests__/lib/utils.test.ts
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('deve mesclar nomes de classes corretamente', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });
});
```

#### Testes de Integração (Playwright)

**Configuração**:
```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

**Teste Exemplo**:
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('usuário pode se cadastrar', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Criar conta');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

#### Testes de API (Server Actions)

```typescript
// __tests__/actions/diarios.test.ts
import { createDiario } from '@/actions/diarios';

describe('createDiario', () => {
  it('deve criar uma entrada de diário', async () => {
    const result = await createDiario({
      title: 'Entrada Teste',
      description: 'Descrição teste',
      type: 'Outros',
      image: 'https://res.cloudinary.com/test.jpg'
    });
    expect(result.success).toBe(true);
  });
});
```

### Executando Testes (Futuro)

Quando os testes forem implementados:

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes E2E
pnpm test:e2e

# Gerar relatório de cobertura
pnpm test:coverage
```

### Metas de Cobertura de Testes

Métricas de cobertura alvo:
- **Testes Unitários**: 80%+ de cobertura para utilitários e lógica de negócio
- **Testes de Integração**: Todos os fluxos críticos do usuário (auth, operações CRUD)
- **Testes E2E**: Caminhos felizes para recursos principais

---

## Deploy

### Deploy Local

Já coberto no [Guia de Configuração](#guia-de-configuração). Execute:

```bash
pnpm dev  # Servidor de desenvolvimento (porta 3000)
```

### Build de Produção

#### Compilar a Aplicação

```bash
# Criar build de produção otimizado
pnpm build

# Iniciar servidor de produção
pnpm start
```

A saída do build estará no diretório `.next/`.

### Plataformas de Deploy

#### Vercel (Recomendado)

Vercel é a plataforma nativa para Next.js e oferece a melhor experiência.

**Deploy via CLI**:
```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Deploy via Integração GitHub**:
1. Faça push do código para GitHub: `git push origin main`
2. Visite [vercel.com/new](https://vercel.com/new)
3. Importe seu repositório GitHub
4. Configure variáveis de ambiente no dashboard Vercel
5. Deploy automático a cada push para `main`

**Variáveis de Ambiente na Vercel**:
- Navegue até Project Settings → Environment Variables
- Adicione todas as variáveis do `.env.local`
- Defina escopo: Production, Preview ou Development

#### Deploy Docker

**Dockerfile** (crie este arquivo):

```dockerfile
FROM node:20-alpine AS base

# Instalar dependências
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Compilar aplicação
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# Imagem de produção
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

**Compilar e Executar**:
```bash
# Compilar imagem Docker
docker build -t diario-gratidao .

# Executar container
docker run -p 3000:3000 \
  -e DATABASE_URL="sua-db-url" \
  -e BETTER_AUTH_SECRET="seu-secret" \
  diario-gratidao
```

#### Outras Plataformas

| Plataforma | Guia |
|----------|-------|
| **Netlify** | Use adaptador Next.js: [docs](https://docs.netlify.com/integrations/frameworks/next-js/) |
| **AWS Amplify** | Siga guia Next.js SSR: [docs](https://docs.amplify.aws/guides/hosting/nextjs/) |
| **Railway** | Conecte repo GitHub, auto-deploy: [railway.app](https://railway.app) |
| **DigitalOcean** | Use App Platform: [docs](https://docs.digitalocean.com/products/app-platform/) |

### Configuração CI/CD

#### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy para Produção

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Instalar pnpm
        run: npm install -g pnpm
        
      - name: Instalar dependências
        run: pnpm install --frozen-lockfile
        
      - name: Executar linter
        run: pnpm lint
        
      - name: Compilar aplicação
        run: pnpm build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          BETTER_AUTH_SECRET: ${{ secrets.BETTER_AUTH_SECRET }}
          # ... adicione todos os outros secrets
          
      - name: Deploy para Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

**Secrets Necessários** (GitHub Settings → Secrets):
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- Variáveis `CLOUDINARY_*`
- `RESEND_API_KEY`
- `VERCEL_TOKEN` (se usar Vercel)

### Migrações de Banco em Produção

**Antes do Deploy**:
```bash
# Gerar arquivos de migração
pnpm drizzle-kit generate

# Revisar migrações em db/migrations/

# Aplicar migrações (no ambiente de produção)
pnpm drizzle-kit migrate
```

**Migração Automatizada** (em CI/CD):
```yaml
- name: Executar Migrações de Banco
  run: pnpm drizzle-kit migrate
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Otimização de Performance

- **Habilitar ISR**: Use `revalidate` para páginas estáticas
- **Otimização de Imagens**: Já configurado via Next.js Image
- **Caching**: Implemente Redis para cache de sessão/dados
- **CDN**: Cloudinary cuida do CDN de imagens automaticamente
- **Edge Functions**: Deploy endpoints auth para edge para menor latência

### Monitoramento e Logging

**Ferramentas Recomendadas**:
- **Sentry**: Rastreamento de erros ([sentry.io](https://sentry.io))
- **Vercel Analytics**: Web Vitals integrado
- **LogRocket**: Replay de sessões
- **DataDog**: APM e monitoramento de infraestrutura

---

## Guia de Contribuição

Recebemos contribuições da comunidade! Siga estas diretrizes para garantir uma colaboração tranquila.

### Começando

1. **Fork do Repositório**: Clique em "Fork" no GitHub
2. **Clone seu Fork**:
   ```bash
   git clone https://github.com/SEU_USUARIO/diario_de_gratidao.git
   cd diario_de_gratidao
   ```
3. **Adicione Remote Upstream**:
   ```bash
   git remote add upstream https://github.com/mcomanduci/diario_de_gratidao.git
   ```

### Estratégia de Branching

Seguimos o modelo de branching **Git Flow**:

- **`main`**: Código pronto para produção (protegido)
- **`develop`**: Branch de integração para features (branch padrão)
- **`feature/*`**: Novas funcionalidades (`feature/add-export-pdf`)
- **`bugfix/*`**: Correções de bugs (`bugfix/fix-streak-calculation`)
- **`hotfix/*`**: Correções emergenciais de produção (`hotfix/security-patch`)

#### Criando uma Branch de Feature

```bash
# Atualize seu main/develop local
git checkout develop
git pull upstream develop

# Crie branch de feature
git checkout -b feature/nome-da-sua-feature

# Faça alterações e commit
git add .
git commit -m "feat: adicionar funcionalidade de exportação PDF"

# Push para seu fork
git push origin feature/nome-da-sua-feature
```

### Convenção de Mensagens de Commit

Usamos a especificação **Conventional Commits**:

```
<tipo>(<escopo>): <assunto>

<corpo>

<rodapé>
```

**Tipos**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Mudanças de estilo de código (formatação, sem mudança de lógica)
- `refactor`: Refatoração de código
- `test`: Adicionando ou atualizando testes
- `chore`: Tarefas de manutenção (dependências, config)

**Exemplos**:
```bash
feat(dashboard): adicionar gráfico mensal de gratidão
fix(auth): resolver email de redefinição de senha não sendo enviado
docs(readme): atualizar instruções de deploy
refactor(actions): simplificar operações CRUD de diário
```

### Estilo de Código e Linting

Este projeto usa **Biome** para linting e formatação.

#### Antes de Fazer Commit

```bash
# Verificar erros de lint
pnpm lint

# Auto-corrigir problemas
pnpm format
```

#### Integração com Editor

**VS Code** (recomendado):
1. Instale a extensão "Biome"
2. Adicione em `.vscode/settings.json`:
   ```json
   {
     "editor.defaultFormatter": "biomejs.biome",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "quickfix.biome": "explicit"
     }
   }
   ```

### Processo de Pull Request

1. **Certifique-se de que sua Branch está Atualizada**:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout feature/sua-feature
   git rebase develop
   ```

2. **Execute Verificações Pré-submissão**:
   ```bash
   pnpm lint        # Sem erros
   pnpm build       # Compila com sucesso
   # pnpm test      # (quando testes forem adicionados)
   ```

3. **Push e Crie PR**:
   ```bash
   git push origin feature/sua-feature
   ```
   - Vá ao GitHub e clique em "Compare & pull request"
   - Target: branch `develop` (não `main`)
   - Preencha template do PR com:
     - Descrição das mudanças
     - Issue relacionada (se aplicável)
     - Screenshots (para mudanças de UI)
     - Passos de teste

4. **Checklist de Revisão de PR**:
   - ✅ Código segue convenções do projeto
   - ✅ Sem console.log ou código de debug
   - ✅ Tipos TypeScript estão devidamente definidos
   - ✅ Server actions incluem tratamento de erros
   - ✅ Mudanças estão documentadas em comentários de código
   - ✅ Sem breaking changes (ou claramente documentadas)

5. **Atender Feedback de Revisão**:
   ```bash
   # Faça as mudanças solicitadas
   git add .
   git commit -m "fix: atender feedback do PR"
   git push origin feature/sua-feature
   ```

### Requisitos de Testes

Quando testes forem implementados, certifique-se:
- ✅ Testes unitários para novas funções utilitárias
- ✅ Testes de integração para novas server actions
- ✅ Testes E2E para novos fluxos de usuário
- ✅ Todos os testes existentes passam

### Documentação

Atualize a documentação quando:
- Adicionar novas features → Atualize README
- Mudar variáveis de ambiente → Atualize seção Configuração
- Adicionar novos endpoints de API → Atualize Guia de Uso
- Corrigir bugs → Adicione à seção Troubleshooting

### Relatório de Issues

**Relatórios de Bug**: Use template "Bug Report"
- Descreva o problema
- Passos para reproduzir
- Comportamento esperado vs real
- Screenshots/logs
- Detalhes do ambiente (SO, navegador, versão Node)

**Solicitações de Feature**: Use template "Feature Request"
- Declaração do problema
- Solução proposta
- Alternativas consideradas
- Contexto adicional

---

## FAQ e Troubleshooting

### Perguntas Frequentes

#### P: Posso fazer self-host desta aplicação?
**R**: Sim! Siga o guia de [Deploy](#deploy) para deploy Docker ou VPS. Certifique-se de ter seu próprio banco de dados e credenciais de serviços.

#### P: Meus dados são criptografados?
**R**: Sim. Senhas são hashadas com bcrypt, e conexões de banco usam SSL. Para criptografia adicional, considere habilitar criptografia a nível de banco no Neon.

#### P: Posso exportar meus dados?
**R**: Sim! Use a funcionalidade "Exportar Dados" nas configurações do dashboard para baixar todas as suas entradas como JSON.

#### P: Qual o tamanho máximo de imagem para uploads?
**R**: O Cloudinary aplica limites baseados no seu plano. Plano gratuito: 10MB por imagem, 25GB de armazenamento total.

#### P: Como a sequência é calculada?
**R**: Sequências incrementam quando você cria pelo menos uma entrada por dia. Perder um dia reseta a sequência para 0.

#### P: Posso usar offline?
**R**: Atualmente, não. A aplicação requer conexão com internet. Suporte offline com sincronização está planejado para lançamentos futuros.

### Erros Comuns e Correções

#### Erro: `DATABASE_URL environment variable is not set`

**Causa**: Arquivo `.env.local` faltando ou inválido.

**Correção**:
1. Crie `.env.local` no diretório raiz do projeto
2. Adicione `DATABASE_URL="sua-connection-string"`
3. Reinicie o servidor dev: `pnpm dev`

#### Erro: `Invalid Cloudinary URL`

**Causa**: Upload de imagem falhou ou configuração Cloudinary errada.

**Correção**:
1. Verifique credenciais Cloudinary em `.env.local`
2. Cheque o dashboard Cloudinary para erros de upload
3. Certifique-se de que `CLOUDINARY_CLOUD_NAME` corresponde exatamente ao seu cloud name

#### Erro: `Session expired` ou `Unauthorized`

**Causa**: Token de sessão expirou ou `BETTER_AUTH_SECRET` mudou.

**Correção**:
1. Limpe cookies do navegador para localhost
2. Faça login novamente
3. Se persistir, regenere `BETTER_AUTH_SECRET` e reinicie o servidor

#### Erro: `Failed to send email`

**Causa**: API key Resend inválida ou domínio não verificado.

**Correção**:
1. Verifique se `RESEND_API_KEY` começa com `re_`
2. Cheque o dashboard Resend para status de verificação de domínio
3. Certifique-se de que o domínio de envio está verificado (use sandbox resend.dev para testes)

#### Erro: Build falha com erros TypeScript

**Causa**: Inconsistências de tipo ou definições de tipo faltando.

**Correção**:
```bash
# Limpar cache Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules
pnpm install

# Recompilar
pnpm build
```

#### Erro: `Hydration mismatch` no console do navegador

**Causa**: Incompatibilidade de renderização servidor/cliente, frequentemente devido a diferenças de data/hora.

**Correção**:
- Certifique-se de que formatação de data é consistente
- Use atributo `suppressHydrationWarning` para conteúdo dinâmico
- Verifique código específico de ambiente rodando no servidor

#### Erro: Imagens não aparecem (404)

**Causa**: Configuração incorreta de imagem Next.js ou URL Cloudinary.

**Correção**:
1. Verifique se `next.config.ts` inclui domínio Cloudinary:
   ```typescript
   images: {
     remotePatterns: [
       { protocol: "https", hostname: "res.cloudinary.com" }
     ]
   }
   ```
2. Reinicie servidor dev após mudanças de config

#### Problemas de Migração de Banco

**Erro**: `Migration failed: table already exists`

**Correção**:
```bash
# Resetar banco (⚠️ DESTRÓI DADOS)
pnpm drizzle-kit drop

# Re-executar migrações
pnpm drizzle-kit push
```

**Erro**: `Schema drift detected`

**Correção**:
```bash
# Gerar nova migração
pnpm drizzle-kit generate

# Aplicar migração
pnpm drizzle-kit migrate
```

### Problemas de Performance

#### Carregamento Lento do Dashboard

**Diagnóstico**:
- Cheque aba network: A query do banco está lenta?
- Cheque logs do servidor para erros

**Soluções**:
1. Adicione índices de banco (já configurados no schema)
2. Implemente paginação para listas grandes de diários
3. Use boundaries de Suspense do React

#### Upload de Imagem Demora Muito

**Soluções**:
1. Comprima imagens antes do upload (use transformações Cloudinary)
2. Mostre indicador de progresso de upload
3. Considere compressão de imagem do lado do cliente

---

## Licença e Créditos

### Licença

Este projeto é licenciado sob a **Licença MIT**.

```
Licença MIT

Copyright (c) 2025 Mateo Comanduci

É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia
deste software e arquivos de documentação associados (o "Software"), para lidar
no Software sem restrição, incluindo, sem limitação, os direitos
de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender
cópias do Software, e permitir que as pessoas a quem o Software é
fornecido o façam, sujeito às seguintes condições:

O aviso de copyright acima e este aviso de permissão devem ser incluídos em todas
as cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU
IMPLÍCITA, INCLUINDO MAS NÃO LIMITADO A GARANTIAS DE COMERCIALIZAÇÃO,
ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO E NÃO VIOLAÇÃO. EM NENHUM CASO OS
AUTORES OU DETENTORES DE COPYRIGHT SERÃO RESPONSÁVEIS POR QUALQUER REIVINDICAÇÃO, DANOS OU OUTRA
RESPONSABILIDADE, SEJA EM AÇÃO DE CONTRATO, ATO ILÍCITO OU DE OUTRA FORMA, DECORRENTE DE,
FORA DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO
SOFTWARE.
```

### Créditos e Agradecimentos

#### Criador do Projeto
- **Mateo Comanduci** ([@mcomanduci](https://github.com/mcomanduci)) - Autor original e mantenedor

#### Dependências Open Source

Este projeto é construído sobre as bases de projetos open-source incríveis:

| Biblioteca | Propósito | Licença |
|---------|---------|---------|
| [Next.js](https://nextjs.org/) | Framework React | MIT |
| [React](https://react.dev/) | Biblioteca UI | MIT |
| [Drizzle ORM](https://orm.drizzle.team/) | ORM de banco | Apache 2.0 |
| [Better Auth](https://www.better-auth.com/) | Autenticação | MIT |
| [Shadcn UI](https://ui.shadcn.com/) | Biblioteca de componentes | MIT |
| [Tailwind CSS](https://tailwindcss.com/) | Framework CSS | MIT |
| [Zod](https://zod.dev/) | Validação de schemas | MIT |
| [Biome](https://biomejs.dev/) | Linter & formatter | MIT |
| [Lucide Icons](https://lucide.dev/) | Biblioteca de ícones | ISC |

#### Agradecimentos Especiais

- **Time Vercel** - Por criar Next.js e plataforma de hosting
- **Time Neon** - Por infraestrutura PostgreSQL serverless
- **Cloudinary** - Por plataforma de gerenciamento de imagens
- **Resend** - Por API de email amigável para desenvolvedores
- **Comunidade Open Source** - Por inspiração e contribuições contínuas

#### Inspiração de Design

- **App Calm** - Padrões de UX de meditação e bem-estar
- **Day One** - Experiência de journaling premium
- **Notion** - Design de interface limpo e moderno

#### Contribuindo

Agradecimentos especiais a todos os contribuidores que ajudaram a melhorar este projeto. Veja [CONTRIBUTORS.md](./CONTRIBUTORS.md) para lista completa.

---

## Suporte e Comunidade

### Obtendo Ajuda

- **Documentação**: Leia este README completamente
- **GitHub Issues**: Reporte bugs ou solicite features
- **GitHub Discussions**: Faça perguntas e compartilhe ideias

### Mantenha-se Atualizado

- ⭐ **Star neste repo** para se manter notificado de atualizações
- 👀 **Watch releases** para novas versões
- 🐦 **Siga o autor** para atualizações do projeto

### Roadmap

Features planejadas para lançamentos futuros:

- [ ] **V2.0**: Prompts de gratidão aprimorados e insights com IA
- [ ] **V2.1**: App mobile (React Native)
- [ ] **V2.2**: Features sociais (compartilhar gratidão com amigos)
- [ ] **V2.3**: Desafios e conquistas de gratidão
- [ ] **V2.4**: Exportar para PDF com templates customizados
- [ ] **V3.0**: Offline-first com capacidades de sincronização

---

## Checklist de Início Rápido

Para referência rápida ao configurar:

- [ ] Node.js 20+ e pnpm instalados
- [ ] Repositório clonado e dependências instaladas (`pnpm install`)
- [ ] `.env.local` criado com todas as variáveis necessárias
- [ ] Banco Neon criado e `DATABASE_URL` configurada
- [ ] Conta Cloudinary criada e API keys adicionadas
- [ ] Conta Resend criada e API key adicionada
- [ ] Migrações de banco executadas (`pnpm drizzle-kit push`)
- [ ] Servidor de desenvolvimento rodando (`pnpm dev`)
- [ ] Conta criada e primeira entrada de diário adicionada
- [ ] Upload de imagem testado com sucesso

---

**Bom journaling de gratidão! 🙏✨**

*Feito com ❤️ pela comunidade open-source*
