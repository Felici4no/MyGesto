# MyGesto - MVP

Plataforma mobile-first para criar e enviar cartões digitais premium com prévia rica no WhatsApp.

## 🚀 Funcionalidades

- **Criação de Cartões**: Templates premium (Essencial, Afetivo, Elegante, etc).
- **Mural ao Vivo**: Feed opcional de envios recentes.
- **Link com Preview (OG Tags)**: Prévia perfeita no WhatsApp com "De -> Para".
- **Pagamento via Stripe**: Pix e Cartão (R$ 9,90 ou R$ 19,90).
- **Entregáveis (PDF)**: Download de PDF (marca d'água grátis / limpo premium).

## 🛠️ Stack Tecnológica

- **Next.js 14+** (App Router, TypeScript)
- **TailwindCSS** (Estilização v4)
- **Supabase** (Postgres Database)
- **Stripe** (Pagamentos & Webhooks)
- **React PDF** (Geração de PDF client-side)
- **Framer Motion** (Animações)

## 📦 Variáveis de Ambiente

Crie um arquivo `.env` ou `.env.local` na raiz com as seguintes chaves:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Supabase (Configurações do Projeto)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key # Necessário para o Webhook

# Stripe (Modo Teste ou Produção)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🏗️ Como Rodar Localmente

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Configure o Banco de Dados (Supabase)**:
   - Vá ao Dashboard do Supabase -> SQL Editor.
   - Execute o conteúdo do arquivo `schema.sql` (na raiz do projeto).
   - Isso criará as tabelas `gifts` e `wall_events` e as políticas de segurança.

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000).

## 💳 Testando Pagamentos (Stripe Webhook)

Para que o pagamento seja confirmado localmente, você precisa encaminhar os webhooks do Stripe para seu localhost.

1. Instale o [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Faça login:
   ```bash
   stripe login
   ```
3. Inicie o listener de webhook:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copie o `whsec_...` exibido no terminal e coloque na variável `STRIPE_WEBHOOK_SECRET` no seu `.env.local`.
5. Realize uma compra no site usando os [cartões de teste do Stripe](https://stripe.com/docs/testing) (ex: `4242 4242...`).

## 🚀 Deploy na Vercel

1. Faça push do código para o GitHub.
2. Importe o projeto na Vercel.
3. Adicione todas as variáveis de ambiente nas configurações do projeto na Vercel.
   - Lembre-se de atualizar `NEXT_PUBLIC_BASE_URL` para sua URL de produção (ex: `https://mygesto.vercel.app`).
   - No Dashboard do Stripe (Developers > Webhooks), adicione um endpoint para `https://mygesto.vercel.app/api/stripe/webhook` e pegue o novo segredo (`whsec_...`) de produção.

## 📂 Estrutura de Pastas

- `src/app`: Rotas e Páginas (App Router).
- `src/components`: Componentes UI reutilizáveis.
  - `/create`: Formulário de criação.
  - `/view`: Visualização do cartão e animação.
  - `/hero`: Landing page.
  - `/pdf`: Layout do PDF.
- `src/lib`: Configurações de serviços (Stripe, Supabase, Utils).
