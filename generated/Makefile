.PHONY: serve build

serve:
	docker run --rm -it -v $(PWD):/src -p 1313:1313 klakegg/hugo:0.89.4 serve

build:
	docker run --rm -it -v $(PWD):/src klakegg/hugo:0.89.4