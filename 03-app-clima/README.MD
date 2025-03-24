# Projeto 3. Conteinerizar um Site de Portfólio

## Descrição

Este desafio teve como objetivo desenvolver e implantar um site estático de portfólio dentro de um contêiner Docker, garantindo portabilidade e facilidade de implantação. 

## Estrutura do projeto

- `weather-backend/` - diretorio contendo o código do backend em Flask.
- `weather-backend/Dockerfile` - arquivo Dockerfile para conteinerizar o backend.
- `weather-frontend/` - diretório contendo o código do frontend em React.js.
- `weather-frontend/Dockerfile` - arquivo Dockerfile para conteinerizar o frontend.
- `docker-compose.yml` - arquivo de configuração na raiz do projeto.

## Construção do desafio

1. **Implementação do sistema:**

Para construir o aplicativo meteorológico, comecei configurando o acesso à `API OpenWeatherMap`. Gerei manualmente uma chave de API e armazenei-a de forma segura em um arquivo `.env`, garantindo que não fosse exposta no código-fonte.

Em seguida, desenvolvi o backend utilizando Flask. Instalei as dependências necessárias, como `flask` e `requests`, para lidar com as requisições HTTP e a comunicação com a API de clima. No arquivo `app.py`, implementei uma rota que recebe o nome de uma cidade, consulta a OpenWeatherMap e retorna os dados meteorológicos correspondentes.

Depois, passei para o frontend, onde configurei uma aplicação React do zero. Inicializei o projeto com Create React App e instalei o Axios para fazer as requisições ao backend. O frontend foi projetado para exibir de forma clara as informações climáticas retornadas pela API.

Com o backend e o frontend prontos, avancei para a etapa de conteinerização, garantindo que ambos os serviços pudessem rodar de maneira integrada dentro de contêineres Docker.

2. **Criação do arquivo Dockerfile:**

Com o backend e o frontend implementados, o próximo passo foi a conteinerização de ambos os serviços.

Comecei criando o `Dockerfile` do backend, definindo uma imagem base do Python e instalando as dependências do Flask. Utilizei o arquivo requirements.txt, que se encontra na pasta do backend, para garantir que todas as bibliotecas necessárias fossem instaladas automaticamente dentro do contêiner. Certifiquei-me de copiar apenas os arquivos necessários para dentro do contêiner e configurar corretamente as variáveis de ambiente, incluindo a chave da API armazenada no `.env`. Após finalizar o Dockerfile, realizei testes manuais para garantir que o contêiner estava sendo construído corretamente e que o backend respondia às requisições.

Em seguida, criei o `Dockerfile` do frontend, utilizando uma imagem base do Node.js. O processo envolveu copiar os arquivos do projeto React, instalar as dependências e configurar o ambiente de execução. Também testei manualmente a construção da imagem para verificar se o frontend era servido corretamente e conseguia se comunicar com o backend.

Com os dois `Dockerfiles` funcionando, o próximo passo foi integrar tudo com `Docker Compose` para facilitar a orquestração dos serviços.

3. **Configuração e execução com Docker Compose:**

Para facilitar a execução do projeto, utilizei o Docker Compose, que permite orquestrar os serviços do backend e frontend de forma automatizada. No arquivo `docker-compose.yml`, defini os dois serviços principais:

- Backend: Mapeado na porta `5000`, construído a partir do diretório `weather-backend`.

- Frontend: Mapeado na porta `3000`, construído a partir do diretório `weather-frontend` e configurado para aguardar o backend (depends_on).

Além disso, utilizei a configuração de networks para criar uma rede chamada `weather-network`. Isso permite que o frontend e o backend se comuniquem internamente sem a necessidade de expor IPs estáticos. Assim, dentro do contêiner do frontend, posso fazer requisições para o backend usando `http://backend:5000` ao invés de depender do `localhost`.

Para iniciar os serviços, utilizei o seguinte comando:

```bash
docker-compose up --build
```

O parâmetro --build garante que as imagens sejam reconstruídas caso tenha havido alguma alteração nos arquivos `Dockerfile`. Com isso, o sistema pode ser facilmente iniciado em qualquer ambiente com Docker e Docker Compose instalados.