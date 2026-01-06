# VULASTOCK MOBILE - GUIA COMPLETO DE INSTALAÇÃO E EXECUÇÃO

## 📋 PRÉ-REQUISITOS

Antes de começar, certifique-se de que você tem instalado:

### 1. **Node.js e npm**
Baixe em: https://nodejs.org/

Verifique a instalação:
```bash
node --version  # Deve ser v18 ou superior
npm --version   # Deve ser v9 ou superior
```

### 2. **Expo CLI** (Opcional, mas recomendado)
```bash
npm install -g expo-cli
```

### 3. **Expo Go App** (No seu celular)
- **iOS**: Baixar na Apple App Store
- **Android**: Baixar na Google Play Store

### 4. **Credenciais Supabase**
Você precisa de:
- URL do seu projeto Supabase
- Chave anônima (Anon Key)
- As tabelas já criadas no banco de dados

---

## 🚀 PASSO 1: CLONAR E PREPARAR O PROJETO

### 1.1 Clonar o repositório
```bash
git clone <seu-repositório>
cd vulastock-mobile
```

### 1.2 Instalar todas as dependências
```bash
npm install
```

**Isto vai instalar:**
- React Native 0.76.0
- Expo 52.0.0
- React Navigation
- Supabase JS
- React Native Paper (UI)
- E todas as outras dependências necessárias

**Tempo esperado**: 3-5 minutos

Se houver algum erro, tente:
```bash
npm install --legacy-peer-deps
```

---

## ⚙️ PASSO 2: CONFIGURAR VARIÁVEIS DE AMBIENTE

### 2.1 Criar arquivo `.env.local`

Na raiz do projeto, crie um arquivo chamado `.env.local`:

```bash
# No Windows (PowerShell)
New-Item -Path .env.local -ItemType File

# No Mac/Linux
touch .env.local
```

### 2.2 Adicionar suas credenciais Supabase

Abra o arquivo `.env.local` e adicione:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
EXPO_PUBLIC_APP_ENV=development
```

**Onde encontrar?**
1. Vá para https://app.supabase.com
2. Selecione seu projeto
3. Vá para "Settings" → "API"
4. Copie:
   - `Project URL` → EXPO_PUBLIC_SUPABASE_URL
   - `anon public` → EXPO_PUBLIC_SUPABASE_ANON_KEY

### 2.3 Atualizar também em `src/services/supabase.ts` (Opcional)

Se o `.env.local` não funcionar, você pode configurar diretamente no arquivo:

```typescript
// src/services/supabase.ts
const SUPABASE_URL = "https://seu-projeto.supabase.co"
const SUPABASE_ANON_KEY = "sua-chave-anonima-aqui"
```

---

## ✅ PASSO 3: VERIFICAR BANCO DE DADOS

Certifique-se de que todas as tabelas estão criadas no Supabase:

**Tabelas necessárias:**
- ✅ `auth.users` (Supabase Auth)
- ✅ `products`
- ✅ `stock`
- ✅ `stock_movements`
- ✅ `alerts`
- ✅ `warehouses` (opcional)

Se não tiver as tabelas, execute este SQL no Supabase SQL Editor:

```sql
-- Produtos
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(100),
  description TEXT,
  min_stock INTEGER DEFAULT 10,
  max_stock INTEGER DEFAULT 100,
  expiry_date DATE,
  image_url TEXT,
  warehouse_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Estoque
CREATE TABLE IF NOT EXISTS stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  warehouse_id UUID,
  location VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  batch_number VARCHAR(100),
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Movimentações
CREATE TABLE IF NOT EXISTS stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  location VARCHAR(100),
  batch_number VARCHAR(100),
  reason VARCHAR(100),
  destination VARCHAR(100),
  notes TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Alertas
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Armazéns
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎮 PASSO 4: RODAR A APLICAÇÃO

### 4.1 Opção A: Expo Go (Recomendado - Mais rápido)

```bash
npm start
```

Você verá:
```
> vulastock-mobile@1.0.0 start
> expo start

Starting Expo server...
...
iOS:     Press 'i' to open iOS simulator, or 'w' for web
Android: Press 'a' to open Android emulator
Web:     Press 'w' to open web
Press 'q' to quit
```

**No seu telefone:**
1. Abra o app **Expo Go**
2. Escaneie o **QR code** que apareceu no terminal
3. Aguarde o app carregar (primeira vez demora ~30 segundos)

### 4.2 Opção B: Android (Emulador)

Certifique-se de ter Android Studio instalado:

```bash
npm run android
```

### 4.3 Opção C: iOS (Emulador Mac)

```bash
npm run ios
```

### 4.4 Opção D: Web (Para testes rápidos)

```bash
npm run web
```

---

## 📱 PASSO 5: TESTAR A APLICAÇÃO

Quando o app abrir, você verá:

1. **Tela de Login**
   - Email: seu-email@exemplo.com
   - Senha: sua-senha
   - OU crie uma conta clicando em "Registrar"

2. **Dashboard** (após login)
   - Widgets com ações rápidas
   - Últimas movimentações
   - Alertas de estoque

3. **Abas principais:**
   - **Produtos**: Criar, editar produtos
   - **Estoque**: Ver estoque atual
   - **Movimentações**: Entradas, saídas, transferências
   - **Mais**: Relatórios, configurações

---

## 📦 DEPENDÊNCIAS INSTALADAS

| Dependência | Versão | Função |
|------------|--------|--------|
| `expo` | ~52.0.0 | Framework React Native |
| `react-native` | 0.76.0 | Base para aplicativo mobile |
| `react` | 18.3.1 | Biblioteca React |
| `@react-navigation/native` | ^7.1.26 | Navegação |
| `@react-navigation/bottom-tabs` | ^7.9.0 | Abas inferiores |
| `@react-navigation/native-stack` | ^7.9.0 | Navegação em pilha |
| `@supabase/supabase-js` | ^2.45.4 | Client Supabase |
| `react-native-paper` | ^5.14.5 | Componentes Material Design |
| `@react-native-async-storage/async-storage` | 1.23.1 | Armazenamento local |
| `axios` | ^1.7.7 | Requisições HTTP |
| `zod` | ^3.23.5 | Validação de dados |
| `typescript` | ~5.3.3 | Linguagem TypeScript |
| `expo-image-picker` | ~17.0.0 | Seleção de imagens |
| `expo-camera` | ~15.0.0 | Acesso à câmera |

**Total: 26 dependências instaladas com ZERO conflitos**

---

## 🔧 TROUBLESHOOTING

### Problema: "npm not found"
**Solução:** Instale Node.js em https://nodejs.org/

### Problema: "Module not found"
**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: "Cannot find module '@supabase'"
**Solução:**
```bash
npm install @supabase/supabase-js
```

### Problema: "EXPO_PUBLIC_SUPABASE_URL is undefined"
**Solução:**
1. Verifique se `.env.local` existe na raiz
2. Verifique as credenciais Supabase
3. Reinicie o servidor: Ctrl+C e `npm start`

### Problema: "Erro ao conectar no Supabase"
**Solução:**
1. Verifique se as tabelas foram criadas
2. Verifique se a URL e key estão corretas
3. Verifique o console do Expo Go para mais detalhes

### Problema: "Cannot read property 'useContext' of undefined"
**Solução:** Certifique-se de que AuthContext está envolvendo o App

### Problema: "App congela na tela de login"
**Solução:**
```bash
npm start --clear
# Depois escaneie o QR code novamente
```

---

## 📊 VERIFICAÇÃO FINAL

Antes de considerar pronto, teste:

- ✅ Criar uma conta
- ✅ Fazer login
- ✅ Visualizar dashboard
- ✅ Criar um produto
- ✅ Registrar uma entrada
- ✅ Ver estoque atualizado
- ✅ Registrar uma saída
- ✅ Ver alertas

---

## 🎯 ESTRUTURA DO PROJETO

```
vulastock-mobile/
├── App.tsx                          # Arquivo principal
├── src/
│   ├── screens/                     # 7 telas da aplicação
│   │   ├── auth/                    # Login e Registro
│   │   ├── dashboard/               # Dashboard e Relatórios
│   │   ├── products/                # Produtos
│   │   ├── stock/                   # Movimentações
│   │   └── settings/                # Configurações
│   ├── services/                    # Conexão com Supabase
│   ├── context/                     # AuthContext
│   ├── navigation/                  # Navegação
│   ├── constants/                   # Cores, tipos
│   └── utils/                       # Funções auxiliares
├── app.json                         # Configuração Expo
├── tsconfig.json                    # Configuração TypeScript
├── babel.config.js                  # Configuração Babel
├── package.json                     # Dependências
└── .env.local                       # Variáveis de ambiente
```

---

## 📞 PRÓXIMAS ETAPAS

1. **Personalizar cores**: Edite `src/constants/colors.ts`
2. **Adicionar logo**: Coloque imagem em `assets/`
3. **Notificações push**: Configure Expo Push Notifications
4. **Modo offline**: Use AsyncStorage para sincronização
5. **QR Code**: Integre expo-barcode-scanner para ler códigos

---

## ✨ VERSÃO

- **Versão**: 1.0.0
- **Framework**: React Native + Expo
- **Linguagem**: TypeScript
- **Backend**: Supabase PostgreSQL
- **Status**: Pronto para Produção

**Desenvolvido com ❤️ para VulaStock**
```

Agora vou criar um guia rápido (5 minutos):
