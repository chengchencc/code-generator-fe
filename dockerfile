FROM nginx:alpine

# volumes:
#   - /srv/nginx/nginx.conf:/etc/nginx/nginx.conf
#   - /srv/nginx/conf.d:/etc/nginx/conf.d
#   - /srv/nginx/html:/usr/share/nginx/html
#   - /var/log/nginx:/var/log/nginx

COPY dist/ /usr/share/nginx/html/

COPY ./docker/nginx/conf.d /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]