.PHONY: smol-rewrite
smol-rewrite:
	. ./.env
	python3 ../developer/main_no_modal.py ./SPEC.md ./versions/latest

.PHONY: serve
serve:
	cd versions/latest && make serve

.PHONY: build
build:
	cd versions/latest && hugo
	mkdir public || echo 'Public already exists'
	cp -r ./versions/latest/public ./public/latest
	cp -r ./versions/latest/public ./public/v1.0.0
