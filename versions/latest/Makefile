HUGO_VERSION := 0.89.4
DOCKER_IMAGE := klakegg/hugo:$(HUGO_VERSION)

.PHONY: serve
serve:
	docker run --rm -it -v $(PWD):/src -v $(PWD)/../../content:/src/content -p 1313:1313 $(DOCKER_IMAGE) server

.PHONY: build
build:
	ls
	ln -s ../../content ./content
	hugo
	ln -s ../../assets ./public/assets