HUGO_VERSION := 0.89.4
DOCKER_IMAGE := klakegg/hugo:${HUGO_VERSION}-ext-alpine

serve:
	docker run --rm -it -v $(PWD):/src -p 1313:1313 ${DOCKER_IMAGE} server --bind 0.0.0.0

build:
	docker run --rm -it -v $(PWD):/src -u hugo jguyomard/hugo-builder:0.80.0 hugo

smol-rewrite:
	python3 ../developer/main_no_modal.py ./NOTES.md