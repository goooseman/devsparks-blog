.PHONY: smol-rewrite
smol-rewrite:
	. ./.env
	python3 ../developer/main_no_modal.py ./NOTES.md ./versions/latest

.PHONY: serve
serve:
	cd versions/latest && make serve

.PHONY: build
build:
	cd versions/latest && hugo
	mkdir public
	ln -s ../versions/latest/public ./public/latest
	ln -s ../versions/latest/public ./public/20230610-v1.0.0-initial-gpt4-8k
