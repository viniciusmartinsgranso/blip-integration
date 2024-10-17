# Aplicação Web de Contatos e Conversas do Chatbot BLiP

## Descrição do Projeto
Este projeto é uma **aplicação web** desenvolvida para exibir **contatos e conversas** de um **chatbot** integrado à plataforma **BLiP**. A aplicação utiliza a API do BLiP para obter informações de contatos e suas respectivas conversas, oferecendo **paginação**, autenticação por chave de API e uma interface amigável para navegação entre as rotas.

## Funcionalidades Principais
A aplicação possui três rotas principais, cada uma com funcionalidades específicas:

### 1. **Rota de Login (`/login`)**
- O usuário deve inserir uma **chave de API válida** do bot da plataforma BLiP.
- A chave é **validada** e, em caso de sucesso, é **armazenada de forma persistente** para uso nas demais rotas.
- Caso a chave seja inválida, a aplicação exibe uma mensagem de erro e não permite o acesso às demais rotas.

### 2. **Rota Raiz (`/`)**
- Após o **login bem-sucedido**, o usuário é redirecionado para a rota raiz.
- A rota exibe uma **lista paginada dos contatos** do bot.
- O **número de contatos exibidos por página** é configurável (por exemplo, 10 contatos por página).
- O usuário pode **clicar em um contato** para ser redirecionado para a **página de conversa** desse contato.

### 3. **Rota de Conversa do Contato (`/contato/:id`)**
- Exibe a **conversa completa** com o contato selecionado.
- As mensagens são obtidas através da **API do BLiP** e incluem tanto as enviadas quanto as recebidas.

## Instalação

Siga os passos abaixo para executar a aplicação localmente:

1. **Clone o Repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd nome-do-repositorio

2. **Instale as Dependências**:
- Certifique-se de ter o Node.js na versão 20.12.1 instalado. Em seguida, execute:
   ```bash
   git clone <url-do-repositorio>
   cd nome-do-repositorio
  
3. **Execute a aplicação**
- Após iniciar a aplicação, acesse pelo navegador:
   ```bash
  http://localhost:4200

