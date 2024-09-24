#!/usr/bin/env bash

set -e
set -x

mypy codetypo
ruff check codetypo example scripts
ruff format codetypo example --check
