FROM nginx:1.27
COPY dist /usr/share/nginx/html
COPY distrib/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080