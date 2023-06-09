.PHONY: serve build smol-rewrite

serve:
	docker run --rm -it -v $(PWD):/src -p 1313:1313 klakegg/hugo:0.89.4 serve

build:
	docker run --rm -it -v $(PWD):/src klakegg/hugo:0.89.4

smol-rewrite:
	python3 ../developer/main_no_modal.py ./NOTES.md