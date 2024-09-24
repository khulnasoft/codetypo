#!/usr/bin/env bash
set -x

ruff check codetypo example scripts --fix
ruff format codetypo example scripts
