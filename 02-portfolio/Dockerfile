FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./meu-portfolio /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


