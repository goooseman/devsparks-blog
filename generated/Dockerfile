FROM klakegg/hugo:0.89.4-ext-alpine

COPY . /src
WORKDIR /src

RUN hugo

FROM nginx:1.21.3-alpine

COPY --from=0 /src/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf