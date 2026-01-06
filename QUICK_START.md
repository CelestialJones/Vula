# Início Rápido - VulaStock

Guia resumido para colocar a app funcionando em 5 minutos.

## 1. Preparar (2 min)

```bash
# Clone
git clone <url>
cd vulastock-mobile

# Instale dependências
npm install

# Aguarde 1-2 minutos...
```

## 2. Configurar Supabase (2 min)

### Crie `.env.local`:

```bash
cp .env.local.example .env.local
```

### Edite `.env.local` com suas credenciais:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave
```

**Onde pegar as credenciais:**
1. Vá para https://supabase.com/
2. Abra seu projeto
3. Settings > API
4. Copie URL e chave

## 3. Rodar (1 min)

```bash
npm start
```

Escaneie o QR code com Expo Go (celular).

## 4. Testar (Imediato)

1. Clique em "Não tem conta? Registre-se"
2. Crie uma conta de teste
3. Faça login
4. Explore: Dashboard → Produtos → Movimentações

## Pronto!

Seu app está rodando. Para mais detalhes, leia:
- [README.md](./README.md) - Documentação completa
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Guia detalhado
- [DEPENDENCIES.md](./DEPENDENCIES.md) - Info das dependências

## Problemas?

```bash
# Se algo der erro, tente:
npm cache clean --force
rm -rf node_modules
npm install
npm start
```

**Dica**: Use um emulador ou Expo Go no celular para melhor experiência.

---

**Tempo total esperado**: 5 minutos se tiver Node.js instalado.
