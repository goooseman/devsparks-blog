.PHONY: smol-rewrite
smol-rewrite:
    . ./.env
	python3 ../developer/main_no_modal.py ./NOTES.md ./versions/latest

.PHONY: serve
serve:
    cd versions/latest && make serve