FROM nginx:mainline AS run
ARG BUILD_CTX

COPY dist /var/www/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
