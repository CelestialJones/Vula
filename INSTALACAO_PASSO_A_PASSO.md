# VulaStock - Instalação Completa Passo a Passo

Guia detalhado para instalar e rodar o VulaStock em seu PC/Mac.

## PARTE 1: PREPARAÇÃO (5 minutos)

### Passo 1: Instalar Node.js

1. Acesse https://nodejs.org/
2. Baixe a versão **LTS** (Recomendada)
3. Execute o instalador e siga as instruções
4. Reinicie seu computador
5. Verifique a instalação:

```bash
# Abra o terminal/prompt de comando e execute:
node --version
npm --version

# Você deve ver versões como:
# v18.17.0
# 9.6.7
```

**Windows**: Use "Prompt de Comando" ou PowerShell
**Mac**: Use "Terminal" (Aplicações > Utilitários > Terminal)
**Linux**: Use seu terminal padrão

### Passo 2: Instalar Git

1. Acesse https://git-scm.com/
2. Baixe e instale
3. Verifique:

```bash
git --version
# Deve retornar algo como: git version 2.40.0
```

### Passo 3: Instalar Expo CLI

```bash
npm install -g expo-cli

# Verifique:
expo --version
# Deve retornar: 5.2.0 (ou similar)
```

## PARTE 2: CLONAR O PROJETO (2 minutos)

### Passo 1: Crie uma pasta

```bash
# Windows
mkdir C:\Projetos\VulaStock
cd C:\Projetos\VulaStock

# Mac/Linux
mkdir ~/Projetos/VulaStock
cd ~/Projetos/VulaStock
```

### Passo 2: Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd vulastock-mobile
```

**Se não tiver o repositório em Git**, copie os arquivos manualmente para a pasta.

## PARTE 3: INSTALAR DEPENDÊNCIAS (3-5 minutos)

### Passo 1: Instale as dependências

```bash
npm install
```

Aguarde a conclusão. Você verá:

```
added XXX packages in X.XXXs
```

Se der erro, tente:

```bash
npm install --legacy-peer-deps
```

### Passo 2: Verifique a instalação

```bash
npm list expo react react-native

# Deve mostrar algo como:
# expo@52.0.0
# react@18.3.1
# react-native@0.76.0
```

## PARTE 4: CONFIGURAR SUPABASE (5 minutos)

### Passo 1: Crie conta no Supabase

1. Acesse https://supabase.com/
2. Clique em "Sign In" ou "Sign Up"
3. Use GitHub ou email para registrar
4. Confirme seu email

### Passo 2: Crie um novo projeto

1. Clique em "New Project"
2. Preencha:
   - **Name**: VulaStock
   - **Password**: Uma senha forte (ex: Abc123!@#XyZ)
   - **Region**: Escolha a região mais próxima
3. Clique em "Create new project"
4. Aguarde a criação (pode levar 2 minutos)

### Passo 3: Obtenha as credenciais

1. No dashboard do Supabase, clique em **Settings**
2. Vá para **API** no menu lateral
3. Procure por:
   - **Project URL** (copie)
   - **anon/public** (copie a chave)

### Passo 4: Configure o arquivo .env.local

1. Abra o arquivo `vulastock-mobile/.env.local.example`
2. Copie e renomeie para `.env.local`
3. Abra `.env.local` em um editor de texto
4. Substitua pelos seus valores:

```env
# Cole a URL do seu projeto (exemplo)
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto-123.supabase.co

# Cole a chave anônima (exemplo)
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Salve o arquivo

### Passo 5: Atualize o arquivo de serviço

1. Abra `src/services/supabase.js`
2. Atualize com os mesmos valores:

```javascript
const SUPABASE_URL = "https://seu-projeto-123.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

3. Salve

## PARTE 5: PREPARAR BANCO DE DADOS (10 minutos)

### Passo 1: Acesse o SQL Editor do Supabase

1. Abra https://supabase.com/
2. Abra seu projeto criado
3. No menu lateral, vá para **SQL Editor**
4. Clique em **New Query**

### Passo 2: Execute o script de criação de tabelas

Copie e cole no SQL Editor:

```sql
-- Criar tabela de produtos
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

-- Criar tabela de estoque
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

-- Criar tabela de movimentações
CREATE TABLE IF NOT EXISTS stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50),
  quantity INTEGER NOT NULL,
  location VARCHAR(100),
  batch_number VARCHAR(100),
  reason VARCHAR(100),
  destination VARCHAR(100),
  notes TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de alertas
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de armazéns
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

Clique em **Run** para executar.

## PARTE 6: RODAR O APLICATIVO (1 minuto)

### Opção A: Via Expo Go (Celular - Recomendado)

```bash
# Na pasta do projeto:
npm start
```

Você verá algo como:

```
> expo start

Local:            http://localhost:19000
On Your Network:  http://192.168.1.x:19000

Scan the QR code above with Expo Go to open your app
```

**No celular:**
1. Instale o app "Expo Go" (Android: Play Store, iOS: App Store)
2. Escaneie o QR code com a câmera
3. O app abre automaticamente

### Opção B: Emulador Android

```bash
npm run android
```

Requer Android Studio instalado.

### Opção C: Emulador iOS (Mac apenas)

```bash
npm run ios
```

Requer Xcode instalado.

## PARTE 7: TESTAR O APLICATIVO (2 minutos)

1. Aguarde o app carregar (primeira vez leva 30 seg)
2. Você verá a tela de **Login**
3. Clique em **"Não tem conta? Registre-se"**
4. Preencha:
   - **Nome Completo**: Seu Nome
   - **Email**: seu@email.com
   - **Senha**: Mínimo 6 caracteres
   - **Confirmar Senha**: Mesma senha
5. Clique em **Registrar**
6. Você será logado automaticamente
7. Explore:
   - **Dashboard** - Estatísticas
   - **Produtos** - Criar e listar produtos
   - **Configurações** - Seu perfil

## CHECKLIST FINAL

- [ ] Node.js instalado
- [ ] Git instalado
- [ ] Expo CLI instalado
- [ ] Projeto clonado/copiado
- [ ] `npm install` executado
- [ ] Conta Supabase criada
- [ ] `.env.local` configurado
- [ ] Tabelas criadas no banco
- [ ] App rodando em Expo Go
- [ ] Consegui fazer login

Se todos estiverem marcados, parabéns! Seu app está funcionando!

## TROUBLESHOOTING RÁPIDO

### "npm command not found"
→ Node.js não foi instalado ou PATH não foi atualizado. Reinstale Node.js.

### "Erro de conexão com Supabase"
→ Verifique `.env.local` - URL e chave devem estar corretos

### "Módulo não encontrado"
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### "App não abre no Expo Go"
→ Verifique se o celular está na mesma rede WiFi do PC
→ Tente: `npm start --clear`

### "Erro ao registrar"
→ Verifique se o email já foi usado
→ Tente outro email para teste

## PRÓXIMOS PASSOS

1. Leia o [README.md](./README.md) para mais informações
2. Customize as cores em `src/constants/colors.js`
3. Adicione seus próprios produtos
4. Explore todas as funcionalidades

## SUPORTE

- **Documentação Completa**: [README.md](./README.md)
- **Guia Detalhado**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Dependências**: [DEPENDENCIES.md](./DEPENDENCIES.md)
- **Supabase Docs**: https://supabase.com/docs
- **React Native Docs**: https://reactnative.dev/docs

---

**Tempo Total Esperado**: ~20-30 minutos na primeira vez

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024
