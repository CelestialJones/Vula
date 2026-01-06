# Como Instalar e Rodar VulaStock - Expo + TypeScript

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Expo Go instalado no celular (disponível na App Store ou Google Play)
- Conta Supabase criada e projeto configurado

## Passo 1: Clonar ou Baixar o Projeto

```bash
# Se estiver em um repositório Git
git clone <seu-repositorio>
cd vulastock-mobile

# Ou descompacte o arquivo ZIP
unzip vulastock-mobile.zip
cd vulastock-mobile
```

## Passo 2: Instalar Dependências

```bash
npm install
```

Se enfrentar problemas com dependências conflitantes:

```bash
npm install --legacy-peer-deps
```

## Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.local.example`:

```bash
cp .env.local.example .env.local
```

2. Abra `.env.local` e preencha com suas credenciais Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

**Onde encontrar essas informações:**
- Acesse seu projeto no Supabase.co
- Vá em Settings → API
- Copie a URL do projeto e a chave anonômica (anon public key)

## Passo 4: Criar Tabelas no Supabase

No SQL Editor do Supabase, execute o seguinte script:

```sql
-- Criar tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de produtos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(100),
  description TEXT,
  min_stock INTEGER DEFAULT 10,
  max_stock INTEGER DEFAULT 100,
  image_url TEXT,
  warehouse_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de estoque
CREATE TABLE stock (
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
CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  location VARCHAR(100),
  batch_number VARCHAR(100),
  reason VARCHAR(100),
  destination VARCHAR(100),
  notes TEXT,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de alertas
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de armazéns
CREATE TABLE warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Passo 5: Rodar a Aplicação

### Opção 1: No Android (se tiver Android Studio)

```bash
npm run android
```

### Opção 2: No iOS (só em Mac)

```bash
npm run ios
```

### Opção 3: Com Expo Go (Recomendado)

```bash
npm start
```

Você verá algo como:

```
$ expo start
Starting dev server...

 ┌─────────────────────────────────────────────────────────────────┐
 │                                                                 │
 │    Expo Go                                                      │
 │    ────────────────────────────────────────────────────────────│
 │                                                                 │
 │    Local:   exp://127.0.0.1:19000                             │
 │    LAN:     exp://192.168.x.x:19000                           │
 │                                                                 │
 │    Press 'w' to open web                                      │
 │    Press 'a' to open Android                                  │
 │    Press 'i' to open iOS                                      │
 │                                                                 │
 └─────────────────────────────────────────────────────────────────┘

> [...]
```

**No celular:**
1. Abra o aplicativo **Expo Go**
2. Clique em **Scan QR Code** (código QR na tela)
3. Escaneie o código QR exibido no terminal

A aplicação carregará em segundos!

## Passo 6: Testar a Aplicação

### Criar uma Conta de Teste

1. Na tela de registro, preencha:
   - Email: `teste@example.com`
   - Senha: `Senha123!`
   - Nome: `Usuário Teste`

2. Clique em "Registrar"

3. Se criado com sucesso, será redirecionado para o Dashboard

### Testar as Funcionalidades

- **Dashboard**: Veja widgets de ações rápidas
- **Produtos**: Crie um novo produto
- **Estoque**: Registre uma entrada
- **Configurações**: Veja dados do perfil

## Troubleshooting

### "npm: command not found"
- Instale Node.js em nodejs.org
- Reinicie o terminal após a instalação

### "Expo Go app not found"
- Baixe Expo Go na App Store ou Google Play
- Certifique-se de que o celular está na mesma rede WiFi

### "Erro: Arquivo não encontrado"
```bash
# Limpe cache do Expo
npm start -- --clear

# Ou
expo start --clear
```

### "TypeError: Cannot find module"
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### "EXPO_PUBLIC_SUPABASE_URL is not set"
- Verifique se `.env.local` foi criado corretamente
- Confirme as variáveis estão preenchidas
- Reinicie o Expo (`npm start --clear`)

### "Erro de conexão Supabase"
- Confirme que a URL do Supabase está correta
- Confirme que a chave anonômica está correta
- Verifique se o projeto Supabase está ativo

## Comandos Úteis

```bash
# Ver versão do Expo
expo --version

# Limpar cache
npm start -- --clear
expo start --clear

# Desinstalar tudo e reinstalar
rm -rf node_modules
npm install

# Testar com legacy peer deps
npm install --legacy-peer-deps

# Rodar especificamente no Android
expo start --android

# Rodar especificamente no iOS
expo start --ios

# Rodar no web
npm run web
```

## Estrutura de Arquivos Importantes

```
src/
├── services/
│   ├── supabase.ts          ← Conecta ao Supabase
│   ├── auth.service.ts      ← Login/Registro
│   ├── product.service.ts   ← Gerenciar produtos
│   └── stock.service.ts     ← Gerenciar estoque
├── context/
│   └── AuthContext.tsx      ← Estado de autenticação global
├── screens/
│   ├── auth/                ← Telas de login/registro
│   ├── dashboard/           ← Dashboard principal
│   ├── products/            ← Gerenciar produtos
│   ├── stock/               ← Registrar movimentações
│   └── settings/            ← Configurações
└── navigation/
    ├── AppNavigator.tsx     ← Navegação principal (tabs)
    └── AuthNavigator.tsx    ← Navegação de autenticação
```

## Próximas Melhorias

Depois de rodar a aplicação, você pode adicionar:

1. Leitura de código de barras
2. Notificações push
3. Modo offline
4. Exportação de relatórios
5. Suporte a múltiplos usuários

## Suporte

Se encontrar problemas:

1. Verifique a documentação oficial:
   - Expo: https://docs.expo.dev
   - React Native: https://reactnative.dev
   - Supabase: https://supabase.com/docs

2. Procure por logs de erro detalhados no terminal

3. Tente limpar cache com `npm start --clear`

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024  
**Status**: Funcional e pronto para produção
