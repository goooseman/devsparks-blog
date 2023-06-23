HUGO_VERSION := 0.111.3
DOCKER_IMAGE := klakegg/hugo:$(HUGO_VERSION)

serve:
	docker run --rm -it -v $(PWD):/src -v $(PWD)/../../content:/src/content -v $(PWD)/../../static:/src/static -p 1313:1313 $(DOCKER_IMAGE) server --bind 0.0.0.0

build:
	docker run --rm -it -v $(PWD):/src -v $(PWD)/../../content:/src/content -v $(PWD)/../../static:/src/static $(DOCKER_IMAGE) --minify