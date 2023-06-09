# This Dockerfile sets up a container with Hugo for building the DevSparks blog.

FROM klakegg/hugo:0.83.1-ext-alpine AS builder

WORKDIR /site
COPY . .

# Install npm packages
RUN apk add --update nodejs nodejs-npm \
    && apk add --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community/ \
        hugo \
    && npm install \
    && npm run build:tailwind

# Build the site
RUN hugo --minify --destination /output

# Copy the built site into a new container to serve it
FROM nginx:alpine
COPY --from=builder /output /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]