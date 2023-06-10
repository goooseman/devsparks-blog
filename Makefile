.PHONY: smol-rewrite

smol-rewrite:
	cd ../developer && modal run ./main.py --model=gpt-4 --prompt ../devsparks-blog/NOTES.md --directory ../devsparks-blog/generated