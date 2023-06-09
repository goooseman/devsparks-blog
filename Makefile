# Makefile

HUGO_BASE_DOCKER_IMAGE ?= klakegg/hugo:0.87.0-ext-alpine
HUGO_IMAGE ?= devsparks/hugo:latest
CONTAINER_NAME ?= devsparks-blog
PWD ?= $(shell pwd)

.PHONY: serve build deploy

serve:
	podman run --rm -it -v "$(PWD)":/src -p "1313:1313" $(HUGO_BASE_DOCKER_IMAGE) server --buildDrafts

build:
	podman build -t $(HUGO_IMAGE) .
	podman run --rm -v "$(PWD)":/src -p "1313:1313" $(HUGO_IMAGE) --minify --gc --cleanDestinationDir

deploy:
	@if ! command -v ssh >/dev/null ; then \
		echo "ssh not found on your system, please install it before running deploy." && exit 1;\
	fi
	rsync -a ./public/ deploy@devsparks.com:/var/www/devsparks.com --delete
	ssh deploy@devsparks.com "cd /var/www/devsparks.com; /usr/local/bin/hugo --gc"