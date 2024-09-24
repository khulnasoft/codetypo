#!/usr/bin/env bash

set -e
set -x

export PYTHONPATH=./codetypo/tests
coverage run -m pytest ${@}
