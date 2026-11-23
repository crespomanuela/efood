# efood

Aplicação de delivery de restaurantes desenvolvida em React como projeto do curso.

🔗 **Deploy:** https://efood-ochre-one.vercel.app/

## Funcionalidades

- Listagem de restaurantes na página inicial
- Página de perfil de cada restaurante com o cardápio
- Conteúdo carregado via API
- Modal com detalhes do produto
- Carrinho de compras com Redux (adicionar e remover itens)
- Checkout em etapas: entrega, pagamento e confirmação do pedido

## Tecnologias

- React + TypeScript
- Vite
- Redux Toolkit / React Redux
- React Router DOM
- Styled Components
- ESLint
- Deploy na Vercel

## Como rodar localmente

```bash
git clone https://github.com/crespomanuela/efood.git
cd efood
npm install
npm run dev
```

## Estrutura

```
src/
├── components/   # Cart, Checkout, Footer, Header, Hero, Modal, Product, Restaurant
├── pages/        # Home e Perfil
├── store/        # Configuração do Redux e reducers
├── routes.tsx    # Rotas da aplicação
└── styles.ts     # Estilos globais
```
