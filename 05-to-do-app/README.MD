# Projeto 5. Conteinerizar aplicativo em React + MongoDB

## Descrição

Este desafio tinha como objetivo dockerizar um aplicativo de lista de tarefas (to-do list) utilizando a stack Node.js e MongoDB. Como já possuía um app com a mesma stack e frontend como adicional, reaproveitei o meu próprio app para realizar a atividade. O endereço do repositório é: [https://github.com/larissagandarela/pet-adoption-app](https://github.com/larissagandarela/pet-adoption-app).

## Estrutura do projeto

- `backend/` - diretorio contendo o código do backend em Node.js e MongoDB.
- `backend/Dockerfile` - arquivo Dockerfile para conteinerizar o backend.
- `frontend/` - diretório contendo o código do frontend em React.js.
- `frontend/Dockerfile` - arquivo Dockerfile para conteinerizar o frontend.
- `docker-compose.yml` - arquivo de configuração na raiz do projeto.

## Construção do desafio

1. **Implementação do sistema:**

O primeiro passo que tomei foi clonar o repositório existente do aplicativo de pet adoption, que já utilizava a stack Node.js e MongoDB, com o objetivo de reaproveitar o código e o frontend. Após clonar o repositório, configurei os arquivos necessários para garantir que a estrutura do projeto estivesse funcional e pronta para ser dockerizada. Também realizei ajustes no código para que o aplicativo pudesse rodar em containers, incluindo a configuração do `Dockerfile` e a adaptação para o uso do `Docker compose`.

2. **Criação do arquivo Dockerfile do backend:**

Para criar o `Dockerfile` do backend, utilizei a imagem oficial do Node.js versão 16 como base, garantindo que o ambiente estivesse adequado para rodar o aplicativo. O processo começou com a definição do diretório de trabalho dentro do container, utilizando o comando `WORKDIR /usr/src/app`.

Em seguida, copiei os arquivos `package.json` e `package-lock.json` para o container para instalar as dependências necessárias. O comando `RUN npm install` foi utilizado para instalar essas dependências.

Depois, copiei o restante dos arquivos do projeto para dentro do container, usando o comando `COPY . .`. Isso garantiu que todos os arquivos necessários para o funcionamento do backend estivessem no container.

Para expor a porta 3000 e permitir que o backend fosse acessível, utilizei o comando EXPOSE 3000. Por fim, defini o comando padrão para iniciar o servidor com `CMD ["npm", "start"]`, que executa o script de inicialização do Node.js.

Com esse `Dockerfile`, o backend ficou pronto para ser containerizado e executado de maneira consistente, independentemente do ambiente em que fosse implantado.

3. **Criação do arquivo Dockerfile do frontend:**

Para a criação do `Dockerfile` do frontend, segui um processo semelhante ao do backend, utilizando a imagem oficial do Node.js versão 16 como base. Primeiro, definei o diretório de trabalho dentro do container com o comando `WORKDIR /usr/src/app`, para garantir que o ambiente de execução do frontend estivesse isolado e organizado.

Em seguida, copiei os arquivos `package.json` e `package-lock.json` para o container, utilizando o comando `COPY package*.json ./`, para que fosse possível instalar as dependências do projeto com o comando `RUN npm install`.

Após a instalação das dependências, copiei o restante dos arquivos do projeto para dentro do container com o comando `COPY . .`. Isso garantiu que o código fonte completo do frontend estivesse disponível dentro do container.

Para que o frontend fosse acessível, expus a porta 3000 usando o comando `EXPOSE 3000`, pois é a porta onde o servidor de desenvolvimento do React roda por padrão.

Por fim, defini o comando padrão para iniciar o servidor de desenvolvimento do React com `CMD ["npm", "start"]`, garantindo que, ao rodar o container, o aplicativo frontend fosse iniciado automaticamente.

Com esse `Dockerfile`, o frontend ficou pronto para ser containerizado, permitindo que o aplicativo seja executado de forma consistente em qualquer ambiente.

4. **Configuração e execução com Docker Compose:**

Para orquestrar os containers e garantir que os serviços do backend, frontend e banco de dados funcionassem de forma integrada, utilizei o Docker Compose. A configuração foi feita em um único arquivo docker-compose.yml, onde defini três serviços: mongo, app (backend) e front (frontend).

No serviço mongo, utilizei a imagem oficial mais recente do MongoDB `(mongo:latest)` e configurei as portas para que o banco de dados fosse acessível na porta 27017. Também criei um volume persistente chamado mongo_data para armazenar os dados do banco, garantindo que não fosse perdido ao reiniciar os containers.

O serviço app, responsável pelo backend, foi configurado para ser construído a partir da pasta `./backend`, onde está localizado o Dockerfile do backend. O serviço depende do MongoDB, o que significa que o container do banco precisa estar em funcionamento antes do container do backend iniciar. A variável de ambiente `MONGO_URI` foi configurada para conectar o backend ao banco de dados MongoDB, com a URI apontando para o container do MongoDB.

Já o serviço front, responsável pelo frontend, foi configurado para ser construído a partir da pasta `./frontend`, com a referência ao Dockerfile do frontend. Esse serviço também expõe a porta 3000 para a comunicação com o usuário e está na mesma rede do backend e do MongoDB, garantindo que todos os containers se comuniquem corretamente.

Para iniciar os serviços e garantir que as imagens dos containers sejam construídas a partir do código mais recente, utilizei o seguinte comando:

```bash
docker-compose up --build
```
Com esse comando, o Docker Compose cria e executa os containers conforme a configuração do arquivo `docker-compose.yml`. Isso permite que o sistema de backend, frontend e banco de dados sejam facilmente gerenciados e rodem de forma consistente em qualquer ambiente.