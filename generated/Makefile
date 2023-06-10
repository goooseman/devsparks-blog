.PHONY: serve build

serve:
	[ ! -e ./content ] && ln -sf ../content/ ./content 
	docker run --rm -it -v $(PWD):/src -p 1313:1313 klakegg/hugo:0.89.4-ext-alpine server

build:
	docker run --rm -it -v $(PWD):/src klakegg/hugo:0.89.4-ext-alpine