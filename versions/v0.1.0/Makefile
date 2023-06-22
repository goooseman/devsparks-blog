serve:
	docker run --rm -it -v $(PWD):/src -v $(PWD)/../../content:/src/content -v $(PWD)/../../static:/src/static -p 1313:1313 klakegg/hugo:0.111.3 server

build:
	docker run --rm -it -v $(PWD):/src -v $(PWD)/../../content:/src/content -v $(PWD)/../../static:/src/static klakegg/hugo:0.111.3