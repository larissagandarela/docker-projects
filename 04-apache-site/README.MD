# Projeto 4. Conteinerizar e implantação de um servidor Apache

## Descrição

Neste desafio, o objetivo foi criar e implantar um servidor Apache dentro de um contêiner Docker.

## Estrutura do projeto

- `Dockerfile`
- `index.html`

## Construção do desafio

1. **Implementação do arquivo html:**

O arquivo `index.html` representa a página que será servida pelo Apache dentro do contêiner. Ele foi criado para testar se o servidor está funcionando corretamente e garantir que o site possa ser acessado pelo navegador.

2. **Criação do arquivo Dockerfile:**

Ao conteinerizar um servidor Apache, optei por utilizar a imagem oficial `httpd:latest`  em vez de construir a partir de `ubuntu:latest` e instalar o Apache manualmente. Essa escolha se baseia em eficiência, otimização e praticidade.

A imagem oficial do Apache já vem pré-configurada e otimizada para rodar o servidor web, eliminando a necessidade de instalar e configurar pacotes manualmente. Isso resulta em um processo de build mais rápido e uma imagem final menor, pois não há dependências desnecessárias do Ubuntu. Além disso, essa abordagem reduz potenciais erros e inconsistências, uma vez que a imagem oficial é mantida diretamente pela comunidade do Apache.

No canal do YouTube Tech With Otabek, o instrutor que propôs o desafio utilizou `ubuntu:latest` e instalou manualmente o Apache via apt-get. Apesar dessa abordagem oferecer mais flexibilidade para customizações avançadas, como meu foco era apenas hospedar um site estático ou um backend simples, a imagem oficial do Apache (`httpd:latest`) se mostrou a melhor escolha. Essa opção já vem otimizada, reduzindo o tamanho da imagem e simplificando a configuração. Caso eu precisasse de mais personalizações no ambiente, o Ubuntu poderia ser uma alternativa mais viável.

3. **Construir imagem Docker:**

Para construir a imagem Docker, utilize o seguinte comando:

```bash
docker build -t meu-apache .
```
Esse comando foi praticado em desafios anteriores.

## Como rodar

### Rodar o contêiner

1. Certifique-se de ter o Docker instalado.
2. Execute o comando abaixo para iniciar o contêiner:

```bash
docker run -d -p 8080:80 --name apache-container meu-apache
```