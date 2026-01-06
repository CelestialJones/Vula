# Guia de Configuração - VulaStock

## Passo a Passo para Setup Completo

### Parte 1: Preparar o Ambiente

#### 1.1 Instalar Node.js

1. Vá para https://nodejs.org/
2. Baixe a versão LTS recomendada
3. Execute o instalador
4. Verifique a instalação:

```bash
node --version
npm --version
```

#### 1.2 Instalar Expo CLI

```bash
npm install -g expo-cli
```

Verifique:

```bash
expo --version
```

#### 1.3 Clonar o Projeto

```bash
git clone <seu-repo-url>
cd vulastock-mobile
```

### Parte 2: Instalar Dependências

```bash
npm install
```

Aguarde a conclusão da instalação. Pode levar alguns minutos.

### Parte 3: Configurar Supabase

#### 3.1 Criar Conta no Supabase

1. Acesse https://supabase.com/
2. Clique em "Sign Up"
3. Use GitHub ou email para criar conta
4. Confirme o email

#### 3.2 Criar Novo Projeto

1. Clique em "New Project"
2. Escolha um nome (ex: "VulaStock")
3. Defina uma senha segura
4. Selecione a região mais próxima
5. Clique em "Create new project"

#### 3.3 Obter Credenciais

1. Após criação, vá para **Settings > API**
2. Copie a **URL do Projeto**
3. Copie a **Chave Anônima** (public)
4. Guarde estas informações

#### 3.4 Criar Arquivo de Ambiente

Na raiz do projeto, crie `.env.local`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
```

**Substitua** `seu-projeto` e `sua-chave-publica` pelos valores reais.

### Parte 4: Configurar Banco de Dados

#### 4.1 Criar Tabelas (No SQL Editor do Supabase)

```sql
-- Usuários (já criada automaticamente pelo Supabase Auth)

-- Produtos
CREATE TABLE products (
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
CREATE TABLE stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  warehouse_id UUID,
  location VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  batch_number VARCHAR(100),
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Movimentações
CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  type VARCHAR(50) CHECK (type IN ('entry', 'exit', 'adjustment', 'transfer')),
  quantity INTEGER NOT NULL,
  location VARCHAR(100),
  batch_number VARCHAR(100),
  reason VARCHAR(100),
  destination VARCHAR(100),
  notes TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Alertas
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  type VARCHAR(50) CHECK (type IN ('low_stock', 'expiry_soon', 'expired')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Armazéns
CREATE TABLE warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Parte 5: Rodar a Aplicação

#### 5.1 Iniciar o Servidor

```bash
npm start
```

Você deve ver um QR code no terminal.

#### 5.2 Executar em Dispositivo/Emulador

**No Android:**

```bash
npm run android
```

**No iOS (Mac):**

```bash
npm run ios
```

**Via Expo Go:**

1. Instale o app "Expo Go" no seu celular
2. Escaneie o QR code do terminal
3. O app abre automaticamente

### Parte 6: Testar a Aplicação

1. Na tela de login, clique em "Registre-se"
2. Crie uma conta de teste
3. Faça login com suas credenciais
4. Explore as funcionalidades:
   - Dashboard
   - Criar produto
   - Registrar entrada
   - Ver relatórios

## Resolução de Problemas Comuns

### Erro: "Cannot find module"

```bash
# Limpe cache
npm cache clean --force

# Reinstale
rm -rf node_modules
npm install
```

### Erro de conexão Supabase

- Verifique `.env.local`
- Certifique-se da URL e chave corretas
- Teste internet
- Verifique se as tabelas existem

### App não abre no emulador

```bash
# Limpe o cache do Expo
expo start --clear

# Ou se não funcionar
npm start -- --clear
```

### Erro de permissão (Android)

1. Abra **Settings** no emulador
2. Vá para **Apps**
3. Encontre "VulaStock"
4. Conceda permissões: Câmera, Galeria, Armazenamento

### Imagens não aparecem

```bash
npm install expo-image-picker@latest
```

## Customização

### Mudar Cores

Edite `src/constants/colors.js`:

```javascript
export const COLORS = {
  primary: "#2E7D32", // Mude a cor
  // ... outras cores
}
```

### Mudar Nome do App

Edite `app.json`:

```json
{
  "expo": {
    "name": "Seu Nome",
    "slug": "seu-slug"
  }
}
```

### Adicionar Novos Produtos/Campos

Edite `src/screens/products/ProductFormScreen.jsx` e adicione campos ao formulário.

## Checklist Final

- [ ] Node.js instalado
- [ ] Expo CLI instalado
- [ ] Projeto clonado
- [ ] npm install executado
- [ ] Conta Supabase criada
- [ ] `.env.local` configurado
- [ ] Tabelas criadas no banco
- [ ] App rodando no emulador/celular
- [ ] Login funcionando
- [ ] Dashboard carregando

Quando todos os itens estiverem marcados, você está pronto!

---

**Precisa de ajuda?** Revise o [README.md](./README.md) para mais informações.
