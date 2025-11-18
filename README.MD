# Automação de teste com Playwright

Este repositório contém testes automatizados para a plataforma de testes da Web.

## 🚀 Começando.

Estas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

- **Node.js**: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
- **NPM**: O NPM (Node Package Manager) vem com a instalação do Node.js.

### 🔧 Instalação

Siga estas etapas para configurar o ambiente de desenvolvimento:

1. **Clone o repositório:**
   \`\`\`bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   \`\`\`
2. **Instale as dependências:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Instale o Playwright:**
   \`\`\`bash
   npx playwright install
   \`\`\`
## ⚙️ Executando os testes

Para executar os testes, utilize o seguinte comando:
\`\`\`bash
npx playwright test
\`\`\`

## 📂 Estrutura do Projeto
O projeto está organizado da seguinte forma:

- **/tests**: Contém todos os arquivos de teste.
  - **/Pagina-do-produto**: Testes relacionados à página de produtos.
  - **/carrinho**: Testes para o carrinho de compras.
  - **/checkout**: Testes para o processo de checkout.
  - **/lista-produtos**: Testes para a listagem de produtos.
  - **/overview**: Testes de visão geral do sistema.


<h3>Para execução com a estrutura do Playwright</h3>
Para fazer a execução dos casos de testes com a estrutura do Playwright com sua IDE você vai precisar executar os seguintes comandos no Painel de comandos: 
- **/npx playwright test
Esse comando vai rodar os casos de teste e exibir os resultados dos que passaram e os que falharam, no painel de comando. Álem disso, vai criar uma pasta de resultados de testes que mostrará os resultados mais detalhadamente.

- **/npx playwright test --ui
Esse comando vai rodar e exibir os resultados na inteface visual do própio Playwright. Nessa interface poderá acompanhar o caminho dos testes até o objetivo dos casos na própria aplicação.

- **/npx playwright test --headed
Esse comando vai rodar toda a aplicação já testada num navegador Chromium. Caso algum teste falhe, a aplicação "quebra". Ou seja, demonstrará onde o teste falhou, tornando a automação dos testes mais precisa.

<p>Agora com os casos de testes automatizados você pode seguir para as próximas etapas do desenvolvimento!</p>
