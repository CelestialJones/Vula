# VulaStock - Aplicativo Móvel de Controle de Estoque

Aplicativo moderno para controle de estoque em armazém desenvolvido com React Native + Expo e Supabase.

## Características

- ✅ Autenticação segura com Supabase
- ✅ Cadastro avançado de produtos
- ✅ Registros de entrada, saída e transferência
- ✅ Dashboard com estatísticas em tempo real
- ✅ Alertas de estoque baixo e validade próxima
- ✅ Relatórios detalhados
- ✅ Controle por lote e localização
- ✅ Interface intuitiva e responsiva

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16 ou superior) - [Baixar](https://nodejs.org/)
- **npm** ou **yarn** - Vem com Node.js
- **Expo CLI** - `npm install -g expo-cli`
- **Git** - [Baixar](https://git-scm.com/)

### Para Android

- **Android Studio** (recomendado) - [Baixar](https://developer.android.com/studio)
- **Android SDK** (versão 21 ou superior)
- **Emulador Android** ou dispositivo físico com USB Debug ativado

### Para iOS (Mac apenas)

- **Xcode** - App Store
- **CocoaPods** - `sudo gem install cocoapods`

## Instalação

### 1. Clone o repositório

```bash
git clone <seu-repo-url>
cd vulastock-mobile
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure o Supabase

Crie um arquivo `.env.local` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

**Como obter as credenciais:**

1. Acesse [Supabase Dashboard](https://supabase.com/)
2. Crie um novo projeto ou selecione o existente
3. Vá para **Settings > API**
4. Copie a URL do projeto e a chave anônima
5. Cole no arquivo `.env.local`

### 4. Atualize a configuração do Supabase

Abra o arquivo `src/services/supabase.js` e atualize com suas credenciais:

```javascript
const SUPABASE_URL = "https://seu-projeto.supabase.co"
const SUPABASE_ANON_KEY = "sua-chave-anonima"
```

## Rodando a Aplicação

### Opção 1: Com Expo Go (Mais rápido)

```bash
npm start
# ou
yarn start
```

Escaneie o QR code com:
- **Android**: Use o app Expo Go
- **iOS**: Use a câmera nativa (iOS 11+)

### Opção 2: Emulador Android

```bash
npm run android
```

### Opção 3: Emulador iOS (Mac apenas)

```bash
npm run ios
```

## Estrutura do Projeto

```
vulastock-mobile/
├── src/
│   ├── screens/          # Telas do aplicativo
│   │   ├── auth/         # Login e registro
│   │   ├── dashboard/    # Dashboard e relatórios
│   │   ├── products/     # Gestão de produtos
│   │   ├── stock/        # Movimentações
│   │   └── settings/     # Configurações
│   ├── services/         # Integração com Supabase
│   ├── navigation/       # Navegação entre telas
│   ├── context/          # Contexto de autenticação
│   ├── components/       # Componentes reutilizáveis
│   ├── constants/        # Constantes (cores, roles)
│   ├── styles/           # Tema global
│   ├── utils/            # Funções utilitárias
│   └── hooks/            # Custom hooks
├── App.jsx               # Entrada principal
├── app.json              # Configuração do Expo
├── package.json          # Dependências
└── README.md             # Este arquivo
```

## Funcionalidades Principais

### 1. Autenticação

- Criar conta com email e senha
- Login seguro
- Recuperação de senha
- Logout

### 2. Dashboard

- Estatísticas gerais
- Últimas movimentações
- Alertas importantes
- Atalhos para ações rápidas

### 3. Produtos

- Criar novo produto
- Buscar e filtrar produtos
- Editar informações
- Upload de foto
- Controle de estoque mínimo/máximo

### 4. Movimentações

- **Entrada**: Registrar chegada de produtos
- **Saída**: Registrar retirada de produtos
- **Transferência**: Mover produtos entre localizações
- **Histórico**: Visualizar todas as movimentações

### 5. Relatórios

- Estatísticas de movimentações
- Histórico completo filtrado
- Análise por tipo de movimento

## Dados de Teste

Use as credenciais abaixo para testar (se disponíveis no seu Supabase):

```
Email: teste@vulastock.com
Senha: senha123
```

**Criar uma conta de teste:**
1. Abra o app
2. Clique em "Não tem conta? Registre-se"
3. Preencha os dados e clique em "Registrar"

## Requisitos do Banco de Dados

Certifique-se de que as seguintes tabelas existem no Supabase:

- **users** - Dados dos usuários
- **products** - Catálogo de produtos
- **stock** - Estoque por localização
- **stock_movements** - Histórico de movimentações
- **alerts** - Alertas do sistema
- **warehouses** - Armazéns disponíveis

## Solução de Problemas

### "Erro de conexão com Supabase"

- Verifique se o `.env.local` está correto
- Verifique a URL e chave do Supabase
- Teste a conexão internet

### "Módulo não encontrado"

```bash
npm install
# Limpe o cache
npm cache clean --force
# Reinstale as dependências
rm -rf node_modules
npm install
```

### "Erro ao fazer login"

- Verifique se o usuário existe no Supabase
- Confirme email e senha estão corretos
- Teste no Supabase Dashboard direto

### "Problemas com imagens"

```bash
# Reinstale o expo-image-picker
npm install expo-image-picker@latest
```

## Dependências Principais

| Pacote | Versão | Propósito |
|--------|--------|----------|
| React Native | 0.76.0 | Framework móvel |
| Expo | 52.0.0 | Plataforma de desenvolvimento |
| Supabase | 2.45.4 | Backend e autenticação |
| React Navigation | 7.x | Navegação entre telas |
| React Native Paper | 5.14.5 | Componentes Material Design |
| AsyncStorage | 1.23.1 | Armazenamento local |

## Variáveis de Ambiente

Crie um arquivo `.env.local` com:

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=sua_url_aqui
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui

# Opcional
EXPO_PUBLIC_APP_ENV=development
```

## Performance

- Otimizado para mobile (Android e iOS)
- Suporte offline com AsyncStorage
- Sincronização automática com Supabase
- Carregamento eficiente de imagens

## Segurança

- Autenticação JWT com Supabase
- Senhas hasheadas
- Tokens armazenados com segurança
- Row Level Security (RLS) no banco de dados

## Contribuindo

Se encontrar bugs ou tiver sugestões:

1. Abra uma issue no GitHub
2. Descreva o problema/sugestão
3. Inclua screenshots se possível

## Suporte

Para suporte técnico:

- Documentação: [Supabase Docs](https://supabase.com/docs)
- React Native: [React Native Docs](https://reactnative.dev/)
- Expo: [Expo Docs](https://docs.expo.dev/)

## Licença

Projeto VulaStock © 2025. Todos os direitos reservados.

---

## Próximos Passos

Após instalação:

1. Configure o Supabase com seus dados
2. Crie uma conta de teste
3. Explore as funcionalidades
4. Customize as cores/temas conforme necessário

**Versão:** 1.0.0  
**Última atualização:** 2024
