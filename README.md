# 🎬 CineTrack

Aplicação desenvolvida em **React (Next.js)** para **gerenciar e explorar filmes**.  
O projeto permite cadastrar, editar, remover e buscar filmes reais através da **TMDB API**, aplicando conceitos modernos de **JavaScript**, **reatividade**, **Hooks**, **Context API** e **integração com APIs externas**.

---

## 📖 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Instalação e Execução](#-instalação-e-execução)
- [Configuração da TMDB API](#-configuração-da-tmdb-api)
- [Uso da Aplicação](#-uso-da-aplicação)
- [Deploy na Vercel](#-deploy-na-vercel)
- [Estilos e UI](#-estilos-e-ui)
- [Solução de Problemas](#-solução-de-problemas)
- [Créditos](#-créditos)

---

## 🎯 Visão Geral

O **CineTrack** é um sistema CRUD que permite ao usuário gerenciar uma lista de filmes localmente, armazenando-os no **LocalStorage** do navegador, além de integrar com a **TMDB API** para buscar filmes reais.

O projeto tem fins educacionais e visa demonstrar boas práticas de desenvolvimento com React e Next.js, incluindo **Context API**, **Hooks**, **CSS puro**, e **consumo de APIs REST**.

---

## ✅ Funcionalidades

### 🔹 CRUD de Filmes
- Adicionar, editar e remover filmes
- Campos: título, gênero, ano, nota (0–10) e crítica
- Dados salvos automaticamente no **LocalStorage**

### 🔹 Busca Local
- Campo de busca por título entre os filmes cadastrados

### 🔹 Integração com TMDB
- Busca filmes reais por nome usando a **The Movie Database API**
- Exibição em **cards organizados em grade (5 por linha)**
- Cada card possui um botão **“➕ Adicionar”**
- Alerta JavaScript confirma o sucesso da adição

### 🔹 Interface Reativa
- Atualização automática da interface a cada modificação
- Mensagens de feedback de ações do usuário

---

## 🧰 Tecnologias

| Categoria | Ferramenta |
|------------|-------------|
| **Framework** | Next.js (App Router) |
| **Biblioteca UI** | React 18 |
| **Linguagem** | TypeScript / JavaScript moderno (ES6+) |
| **Estado Global** | Context API + Hooks |
| **Estilos** | CSS puro (Flexbox + Grid) |
| **API Externa** | TMDB API |
| **Persistência Local** | LocalStorage |
| **Deploy** | Vercel |

---

## 🧱 Arquitetura do Projeto

```cinetrack/
├─ src/
│ ├─ app/
│ │ ├─ filmes/ # Página CRUD local
│ │ ├─ busca/ # Página de busca na TMDB
│ │ ├─ layout.tsx # Layout global
│ │ └─ globals.css # Estilos globais e fonte padrão
│ │
│ ├─ componentes/
│ │ ├─ FormularioFilme.tsx # Formulário de cadastro/edição
│ │ ├─ TabelaFilmes.tsx # Tabela dos filmes locais
│ │ └─ ResultadoBusca.tsx # Lista de filmes da TMDB
│ │
│ ├─ contexto/
│ │ └─ FilmesContext.tsx # Contexto global dos filmes
│ │
│ ├─ utils/
│ │ ├─ armazenamento.ts # Funções de salvar/carregar LocalStorage
│ │ └─ tmdb.ts # Função buscarFilmesTMDB()
│ │
│ ├─ estilos/
│ │ └─ filmes.css # Estilos específicos do CRUD
│ │
│ └─ types/ (opcional)
│
├─ .env.local # Variável da API TMDB
├─ package.json
└─ README.md
```


---

## 💻 Instalação e Execução

### 📦 Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm**, **yarn** ou **pnpm**

### ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/sergiodiogoti/front-cine-track

# Acesse a pasta
cd cinetrack

# Instale as dependências
npm install


# Executando localmente
npm run dev

#Acesse em:
👉 http://localhost:3000/filmes


#Configuração da TMDB API
1. Criar conta e obter a chave

Acesse https://www.themoviedb.org

Vá até o seu perfil → Configurações → API

Gere uma API Key (v3 auth)

2. Criar o arquivo .env.local

#Crie o arquivo na raiz do projeto:
NEXT_PUBLIC_TMDB_KEY=SUA_CHAVE_DA_API_TMDB