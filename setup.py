from __future__ import annotations

from setuptools import setup


CODETYPO_VERSION = '1.30.2'


setup(
    name='pre_commit_placeholder_package',
    version='0.0.0',
    install_requires=[f'codetypo=={CODETYPO_VERSION}'],
    package_dir={'': 'crates'},
)
