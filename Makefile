include .env
export

.PHONY: smol-rewrite
smol-rewrite:
	# https://platform.openai.com/docs/models/gpt-4
	OPENAI_DEFAULT_MODEL=gpt-3.5-turbo-16k-0613 OPENAI_DEFAULT_MAX_TOKENS=9000 python3 ../developer/main_no_modal.py ./SPEC.md ./versions/latest

.PHONY: serve
serve:
	cd versions/latest && make serve

.PHONY: build
build:
	cd versions/latest && hugo
	mkdir public || echo 'Public already exists'
	cp -r ./versions/latest/public ./public/latest
	cp -r ./versions/latest/public ./public/v1.0.0
