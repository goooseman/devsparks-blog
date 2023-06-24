docker run -d --name remark42 \
  --hostname remark42 \
  --restart always \
  --env-file .env \
  -e LETSENCRYPT_HOST=r42.goooseman.dev \
  -e LETSENCRYPT_EMAIL=goooseman@me.com \
  -e VIRTUAL_HOST=r42.goooseman.dev \
  -e REMARK_URL=https://r42.goooseman.dev \
  -e SECRET \
  -e AUTH_TELEGRAM=true \
  -e AUTH_EMAIL_ENABLE=true \
  -e NOTIFY_ADMINS=email,telegram \
  -e NOTIFY_USERS=email,telegram \
  -e SITE=localhost,devsparks.goooseman.dev \
  -e DEBUG=true \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=5 \
  -v $PWD/var:/srv/var \
  umputun/remark42:latest
