.PHONY: serve build

serve:
	docker-compose up

build:
	docker run --rm -v $(PWD):/src -u hugo klakegg/hugo:0.89.4-ext-alpine shell -c "hugo"