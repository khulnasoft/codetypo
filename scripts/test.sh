#!/usr/bin/env bash

set -e
set -x

export PYTHONPATH=./codetypo
coverage run -m pytest ${@}
