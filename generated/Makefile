HUGO_VERSION := 0.89.4
DOCKER_IMAGE := klakegg/hugo:$(HUGO_VERSION)

.PHONY: serve
serve:
	[ ! -e ./content ] && ln -sf ../content/ ./content
	docker run --rm -it -v $(PWD):/src -p 1313:1313 $(DOCKER_IMAGE) server

.PHONY: build
build:
	docker run --rm -it -v $(PWD):/src $(DOCKER_IMAGE)