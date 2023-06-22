-include .env 
export

.PHONY: smol-rewrite
smol-rewrite:
	# https://platform.openai.com/docs/models/gpt-4
	USE_FULL_PROJECT_PROMPT= OPENAI_DEFAULT_MODEL=gpt-4 OPENAI_DEFAULT_MAX_TOKENS=0 python3 ../developer/main_no_modal.py ./SPEC.md ./versions/latest

smol-debug:
	# https://platform.openai.com/docs/models/gpt-4
	USE_FULL_PROJECT_PROMPT=True OPENAI_DEFAULT_MODEL=gpt-3.5-turbo-16k-0613 OPENAI_DEFAULT_MAX_TOKENS=9000 python3 ../developer/debugger_no_modal.py --directory ./versions/latest 'REPLACEME'


.PHONY: serve
serve:
	cd versions/latest && make serve

.PHONY: build
build:
	cd versions/v0.0.0 && hugo
	mkdir public || echo 'Public already exists'
	cp -r ./versions/v0.0.0/public ./public/v0.0.0

	cd versions/v0.1.0 && hugo
	mkdir public || echo 'Public already exists'
	cp -r ./versions/v0.1.0/public ./public/v0.1.0

	cd versions/v1.0.0 && hugo
	mkdir public || echo 'Public already exists'
	cp -r ./versions/v1.0.0/public ./public/latest
	cp -r ./versions/v1.0.0/public ./public/v1.0.0
