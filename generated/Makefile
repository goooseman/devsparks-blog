.PHONY: serve build

HUGO_VERSION := 0.91.2
DOCKER_IMAGE := klakegg/hugo:${HUGO_VERSION}-ext-alpine

serve:
	docker run --rm -it -v $(PWD):/src -p 1313:1313 $(DOCKER_IMAGE) server --bind 0.0.0.0

build:
	docker run --rm -it -v $(PWD):/src $(DOCKER_IMAGE) build