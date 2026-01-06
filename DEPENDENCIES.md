# Guia de Dependências - VulaStock

## Todas as Dependências do Projeto

### Runtime Dependencies

```json
{
  "react": "18.3.1",
  "react-native": "0.76.0",
  "expo": "~52.0.0"
}
```

Estes são as três principais dependências:
- **React**: Framework JavaScript para UI
- **React Native**: Framework para apps móveis nativos
- **Expo**: Plataforma que simplifica o desenvolvimento React Native

### Navegação

```json
{
  "@react-navigation/native": "^7.1.26",
  "@react-navigation/bottom-tabs": "^7.9.0",
  "@react-navigation/native-stack": "^7.9.0",
  "react-native-screens": "3.35.0",
  "react-native-safe-area-context": "4.12.0",
  "react-native-gesture-handler": "~2.20.0"
}
```

Gerenciam a navegação entre telas:
- `@react-navigation/native` - Base da navegação
- `@react-navigation/bottom-tabs` - Menu inferior com abas
- `@react-navigation/native-stack` - Stack de navegação
- `react-native-screens` - Otimização de performance
- `react-native-safe-area-context` - Áreas seguras da tela
- `react-native-gesture-handler` - Gestos (toques)

### UI/Componentes

```json
{
  "react-native-paper": "^5.14.5",
  "@react-native-material/core": "^1.3.10",
  "@expo/vector-icons": "^15.0.3"
}
```

Fornecem componentes Material Design:
- `react-native-paper` - Botões, inputs, cards, etc
- `@react-native-material/core` - Componentes Material adicionais
- `@expo/vector-icons` - Ícones (FontAwesome, MaterialCommunity, etc)

### Backend/Dados

```json
{
  "@supabase/supabase-js": "^2.45.4",
  "axios": "^1.7.7"
}
```

Integração com servidor:
- `@supabase/supabase-js` - Cliente para Supabase (autenticação, banco de dados)
- `axios` - HTTP client (opcional, alternativa a fetch)

### Armazenamento Local

```json
{
  "@react-native-async-storage/async-storage": "1.23.1"
}
```

Salva dados no dispositivo:
- Tokens de autenticação
- Preferências do usuário
- Cache de dados

### Utilitários

```json
{
  "zod": "^3.23.5"
}
```

Validação de dados/schemas.

### Câmera e Galeria

```json
{
  "expo-image-picker": "~17.0.0",
  "expo-camera": "~15.0.0"
}
```

Acesso a câmera e galeria de fotos.

### Outros Pacotes Expo

```json
{
  "expo-constants": "~17.0.0",
  "expo-splash-screen": "~0.29.4",
  "expo-status-bar": "~1.13.0",
  "expo-fonts": "~13.0.0"
}
```

Utilitários do Expo para configurações, fontes, etc.

## Versões Importantes

As versões foram escolhidas cuidadosamente para compatibilidade:

| Pacote | Versão | Por quê? |
|--------|--------|---------|
| React | 18.3.1 | Estável e suportada |
| React Native | 0.76.0 | Última estável com bom suporte |
| Expo | 52.0.0 | Compatível com as acima |
| @react-navigation | 7.x | Última versão, bem testada |
| react-native-paper | 5.14.5 | Suporte completo Material Design 3 |

## Como Instalar Tudo

### Instalação Rápida (Recomendado)

```bash
npm install
```

Isto instala TODAS as dependências listadas em `package.json`.

### Instalar Pacote Individual

Se precisar adicionar um novo pacote:

```bash
npm install nome-do-pacote
```

Exemplo:

```bash
npm install react-native-camera
```

### Instalar Versão Específica

```bash
npm install pacote@versao
```

Exemplo:

```bash
npm install react@18.2.0
```

## Atualizar Dependências

### Verificar Atualizações

```bash
npm outdated
```

Mostra quais pacotes têm atualizações disponíveis.

### Atualizar Tudo

```bash
npm update
```

Atualiza tudo para a versão mais recente compatível.

### Atualizar Um Pacote

```bash
npm install pacote@latest
```

## Possíveis Conflitos e Soluções

### Conflito: Node.js versão

**Problema**: Mensagem como "requires node >=14"

**Solução**:

```bash
node --version
# Se for < 14, atualize em nodejs.org
```

### Conflito: Expo vs React Native

**Problema**: "Incompatible versions"

**Solução**:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Conflito: @react-navigation versões

**Problema**: Múltiplas versões instaladas

**Solução**:

```bash
npm ls @react-navigation/native
# Limpe e reinstale
rm -rf node_modules
npm install
```

## Dependências de Desenvolvimento

```json
{
  "@babel/core": "^7.25.2",
  "@types/react": "^18.3.11",
  "@types/react-native": "^0.76.0",
  "jest": "^29.7.0",
  "typescript": "~5.3.3"
}
```

Usadas apenas durante desenvolvimento:
- **@babel/core** - Transpilador JavaScript
- **@types/react** - Tipos TypeScript para React
- **@types/react-native** - Tipos TypeScript para React Native
- **jest** - Framework de testes
- **typescript** - Suporte TypeScript

## Verificar Instalação

Para verificar se tudo foi instalado corretamente:

```bash
# Verificar Node
node --version

# Verificar npm
npm --version

# Verificar pacotes instalados
npm list

# Verificar versões específicas
npm list react react-native expo

# Começar o app
npm start
```

Se aparecer um QR code no terminal, tudo está funcionando!

## Troubleshooting de Dependências

### "ERESOLVE unable to resolve dependency tree"

```bash
npm install --legacy-peer-deps
```

### "Module not found"

```bash
npm install --save-dev @types/nome-do-pacote
```

### Dependências muito grandes (>500MB)

Isto é normal. Expo e React Native têm muitas dependências.

Reduza com:

```bash
npm prune --production
```

## Próximas Etapas

1. Instale com `npm install`
2. Configure `.env.local`
3. Execute `npm start`
4. Verifique se o QR code aparece
5. Estude o código em `src/`

---

**Última atualização**: 2024  
**Compatível com**: Node.js 16+, npm 7+
