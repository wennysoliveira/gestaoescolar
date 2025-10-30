# Sistema de Seleção de Gestores Escolares 2025

Sistema web completo para gerenciar as inscrições do processo seletivo para Gestores Escolares de 2025, desenvolvido com Nuxt 3, Prisma e Tailwind CSS.

## 🚀 Funcionalidades

### Área Pública
- **Formulário de Inscrição**: Formulário completo com 4 seções
  - Informações pessoais e profissionais
  - Upload de documentos obrigatórios
  - Títulos e experiência (opcional)
  - Plano de gestão (período específico: 15/12-19/12/2025)
- **Validações**: CPF, email, telefone, tipos de arquivo
- **Responsivo**: Funciona em desktop e mobile

### Área Administrativa
- **Dashboard**: Lista de inscrições com estatísticas
- **Busca e Filtros**: Por nome, CPF, email, formação
- **Detalhes do Candidato**: Visualização completa com pontuação
- **Download de Documentos**: Acesso a todos os arquivos enviados
- **Autenticação**: Sistema de login seguro

## 🛠️ Tecnologias

- **Frontend/Backend**: Nuxt 3
- **Banco de Dados**: SQLite com Prisma ORM
- **Estilização**: Tailwind CSS
- **Validação**: Zod
- **Autenticação**: Sistema de sessão simples
- **Upload**: Sistema de arquivos local

## 📋 Pré-requisitos

- Node.js 20.17.0 ou superior
- npm ou yarn

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd nuxt_santarita
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Crie o usuário admin inicial**
   ```bash
   node scripts/create-admin.js
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Acesse a aplicação**
   - Página pública: http://localhost:3000
   - Área administrativa: http://localhost:3000/admin
   - Login: admin / admin123

## 📁 Estrutura do Projeto

```
nuxt_santarita/
├── assets/css/           # Estilos CSS
├── components/           # Componentes Vue reutilizáveis
├── composables/          # Composables Vue
├── middleware/           # Middleware de autenticação
├── pages/               # Páginas da aplicação
│   ├── admin/           # Páginas administrativas
│   └── inscricao/       # Páginas de inscrição
├── prisma/              # Schema do banco de dados
├── server/              # APIs e utilitários do servidor
│   ├── api/             # Endpoints da API
│   └── utils/           # Utilitários do servidor
├── scripts/             # Scripts auxiliares
└── uploads/             # Arquivos enviados pelos usuários
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
UPLOAD_DIR="./uploads"
JWT_SECRET="sua-chave-secreta-super-segura"
ADMIN_DEFAULT_USER="admin"
ADMIN_DEFAULT_PASS="admin123"
```

### Banco de Dados

O sistema usa SQLite por padrão. Para usar PostgreSQL ou MySQL:

1. Altere a `DATABASE_URL` no `.env`
2. Altere o provider no `prisma/schema.prisma`
3. Execute `npx prisma db push`

## 📝 Uso

### Para Candidatos

1. Acesse http://localhost:3000
2. Clique em "Fazer Inscrição"
3. Preencha todas as seções do formulário
4. Faça upload dos documentos obrigatórios
5. Envie a inscrição
6. Anote o número do protocolo
7. Entre 15/12-19/12, envie o Plano de Gestão

### Para Administradores

1. Acesse http://localhost:3000/admin
2. Faça login com admin/admin123
3. Visualize todas as inscrições no dashboard
4. Use busca e filtros para encontrar candidatos
5. Clique em "Ver Detalhes" para análise completa
6. Baixe documentos conforme necessário

## 🔒 Segurança

- Sistema de login simples e seguro
- Validação de tipos MIME de arquivos
- Limite de tamanho de arquivo (5MB)
- Autenticação por sessão para área administrativa
- Validação de períodos para uploads

## 📊 Pontuação de Títulos

O sistema calcula automaticamente a pontuação:

- **Formação Acadêmica**:
  - Doutorado: 15 pontos
  - Mestrado: 10 pontos
  - Especialização: 5 pontos

- **Tempo no Magistério**: 1 ponto por ano (máx. 20)

- **Experiência em Gestão**: 3 pontos por ano (máx. 30)

- **Cursos de Formação**: 1 ponto por curso (máx. 20)

## 🚨 Validações Temporais

- **Inscrições**: 30/10/2025 a 15/11/2025
- **Plano de Gestão**: 15/12/2025 a 19/12/2025
- **Recursos**: Períodos específicos conforme cronograma

## 🐛 Solução de Problemas

### Erro de Banco de Dados
```bash
npx prisma db push
```

### Erro de Dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de Upload
Verifique se a pasta `uploads/` existe e tem permissões de escrita.

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Nuxt 3, Prisma ou Tailwind CSS.

## 📄 Licença

Este projeto foi desenvolvido para a Prefeitura Municipal de Santa Rita.

---

**Desenvolvido com ❤️ usando Nuxt 3, Prisma e Tailwind CSS**