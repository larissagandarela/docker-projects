# Projeto 1 - Site Estático com Nginx

## Descrição
Este projeto consiste em hospedar um site estático em um contêiner Docker utilizando o Nginx.

O meu objetivo neste desafio foi configurar um servidor Nginx para servir um site simples, composto por arquivos estático. O Nginx será responsável por fornecer esses arquivos aos usuários.

## Estrutura do projeto

- `meu-site/`
- `Dockerfile`
- `docker-compose.yml`

## Construção do desafio

1. **Implementação do site:**

A implementação do site estático não interfere diretamente na atividade de hospedagem. A ideia principal foi garantir que os arquivos HTML e CSS, que compõem o site, estejam organizados na pasta `meu-site/`. Embora o conteúdo do site não seja o foco principal do desafio, ele pode ser personalizado para refletir qualquer tipo de página estática, como uma página de apresentação, por exemplo. O importante é garantir que o Nginx consiga servir esses arquivos corretamente.

A pasta `meu-site/` contém os arquivos principais:

- `index.html`
- `estilo.css`

2. **Criação do arquivo Dockerfile:**

O arquivo `Dockerfile` é essencial para criar a imagem Docker que será usada para rodar o Nginx dentro de um contêiner. Ele define como o contêiner será construído e configurado. O Nginx, por ser um servidor web leve e altamente configurável, foi escolhido por sua eficiência em servir sites estáticos. No `Dockerfile`, o que fiz foi:

- **Base da imagem**: utilizei a imagem oficial do Nginx, que já vem configurada com o servidor pronto para ser executado. Nesse exemplo, optei por utilizar a imagem Alpine por ser mais leve.
- **Cópia dos arquivos**: os arquivos do site, localizados na pasta `meu-site/`, são copiados para o diretório de trabalho do Nginx, que é `/usr/share/nginx/html`, onde o Nginx procura os arquivos para servir.
- **Exposição da porta**: a porta 80 foi exposta para permitir que o contêiner seja acessado na porta padrão do HTTP.

O `Dockerfile` garante que a configuração do servidor esteja isolada e pronta para ser executada em qualquer máquina que tenha o Docker instalado, trazendo a vantagem de portabilidade e consistência no ambiente de execução.

3. **Criação do arquivo docker-compose.yml:**

O `docker-compose.yml` facilita a execução e a configuração do contêiner Nginx de forma mais simples e automatizada. O Docker Compose permite que eu defina, configure e execute vários contêineres como parte de um serviço. Neste caso, ele é usado para construir e rodar o contêiner Nginx a partir do `Dockerfile`.

No arquivo `docker-compose.yml`, criei um serviço chamado `nginx`, que será responsável por construir e executar o contêiner a partir do `Dockerfile`. A configuração também mapeia a porta 80 do contêiner para a porta 80 da máquina local, garantindo que o site seja acessível no navegador. Além disso, utilizei um volume para garantir que os arquivos do site, localizados na pasta `meu-site/`, sejam sincronizados e servidos pelo Nginx no contêiner. Para melhorar a organização e garantir a comunicação entre contêineres, criei uma rede customizada chamada `nginx-network` com o driver `bridge`.

Optei por utilizar o Docker Compose porque ele facilita a gestão do projeto, permitindo construir e executar o contêiner com um único comando, além de facilitar a escalabilidade, caso o projeto precise de novos serviços no futuro. Embora fosse possível realizar o desafio apenas com o Docker, o Docker Compose oferece uma abordagem mais limpa, prática e consistente, especialmente em ambientes de desenvolvimento, tornando a expansão do projeto mais simples.

## Como rodar

### Usando Docker e Docker Compose

1. Certifique-se de ter o Docker instalado.
2. Execute o comando abaixo para iniciar o contêiner:

```bash
docker-compose up --build