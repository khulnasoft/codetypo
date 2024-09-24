DICTIONARIES := codetypo_lib/data/dictionary*.txt codetypo_lib/tests/data/*.wordlist

PHONY := all check check-dictionaries sort-dictionaries trim-dictionaries check-dist pytest pypi ruff clean

all: check-dictionaries codetypo.1

check: check-dictionaries check-dist pytest ruff

codetypo.1: codetypo.1.include Makefile
	PYTHONPATH=. help2man codetypo --include codetypo.1.include --no-info --output codetypo.1
	sed -i '/\.SS \"Usage/,+2d' codetypo.1

check-dictionaries:
	@for dictionary in ${DICTIONARIES}; do \
		if grep -E -n "^\s*$$|\s$$|^\s" $$dictionary; then \
			echo "Dictionary $$dictionary contains leading/trailing whitespace and/or blank lines.  Trim with 'make trim-dictionaries'"; \
			exit 1; \
		fi; \
	done
	@if command -v pytest > /dev/null; then \
		pytest codetypo_lib/tests/test_dictionary.py; \
	else \
		echo "Test dependencies not present, install using 'pip install -e \".[dev]\"'"; \
		exit 1; \
	fi

sort-dictionaries:
	pre-commit run --all-files file-contents-sorter

trim-dictionaries:
	@for dictionary in ${DICTIONARIES}; do \
		sed -E -i.bak -e 's/^[[:space:]]+//; s/[[:space:]]+$$//; /^$$/d' $$dictionary && rm $$dictionary.bak; \
	done

check-dist:
	$(eval TMP := $(shell mktemp -d))
	python -m build -o $(TMP)
	twine check --strict $(TMP)/*
	rm -rf $(TMP)

ruff:
	pre-commit run --all-files ruff

pytest:
	@if command -v pytest > /dev/null; then \
		pytest codetypo_lib; \
	else \
		echo "Test dependencies not present, install using 'pip install -e \".[dev]\"'"; \
		exit 1; \
	fi

clean:
	rm -rf codetypo.1

mypy:
	mypy .
