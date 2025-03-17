# Projeto 2. Conteinerizar um Site de Portfólio

## Descrição

Neste desafio, o objetivo foi criar um contêiner Docker para hospedar um site estático de portfólio. 

## Estrutura do projeto

- `meu-portfolio/`
- `Dockerfile`

## Construção do desafio

1. **Implementação do site:**

O site estático que eu conteinerizei foi disponibilizado pelo perfil *codewithsadee* no GitHub, no link: [https://github.com/codewithsadee/vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio). O projeto é um modelo de site pessoal responsivo, compatível com todos os dispositivos, construído utilizando HTML, CSS e JavaScript.


2. **Criação do arquivo Dockerfile:**

Neste segundo desafio, busquei aprimorar a configuração em comparação ao primeiro, tornando o processo mais robusto e seguro. No `Dockerfile`, o que eu fiz foi o seguinte:

Primeiramente, escolhi a imagem oficial do Nginx baseada no Alpine, que já conhecemos. Depois, configurei o diretório de trabalho dentro do contêiner, que é o local onde o Nginx procurará os arquivos a serem servidos. Para evitar conflitos com os arquivos padrão do Nginx, realizei a remoção desses arquivos, assegurando que o site estivesse limpo e preparado para receber o conteúdo personalizado. Em seguida, os arquivos do site foram copiados para o diretório de trabalho do Nginx, tornando-os acessíveis para o servidor. Por fim, expus a porta 80, permitindo o acesso ao site através da porta padrão de HTTP.

Comparado ao primeiro desafio, a principal evolução foi a adição de uma configuração mais segura e controlada. No primeiro `Dockerfile`, o processo era bem simples, sem muitas verificações de segurança. Já neste segundo desafio, a remoção dos arquivos padrão do Nginx e a definição de um diretório de trabalho garantiram que o contêiner estivesse mais alinhado com as boas práticas de segurança e personalização, reduzindo o risco de conflitos. Além disso, o Nginx foi configurado para rodar em primeiro plano, o que ajuda a evitar que o processo do contêiner seja encerrado automaticamente, permitindo um controle mais eficaz da execução. 

3. **Construir imagem Docker:**

Para construir a imagem Docker, utilize o seguinte comando:

```bash
docker build -t portfolio-nginx .
```

O comando docker build é usado para criar uma imagem Docker a partir de um `Dockerfile`. A opção `-t portfolio-nginx` nomeia a imagem criada como `portfolio-nginx`, facilitando a identificação e o uso da imagem posteriormente. O ponto final (.) indica o diretório atual como contexto para o comando, ou seja, onde o `Dockerfile` está localizado. Optei por não usar o Docker Compose para este projeto, pois o contêiner é simples e não exige a configuração de múltiplos serviços, tornando o uso do Compose desnecessário neste caso.

## Como rodar

### Rodar o contêiner

1. Certifique-se de ter o Docker instalado.
2. Execute o comando abaixo para iniciar o contêiner:

```bash
docker run -d -p 8080:80 portfolio-nginx
```