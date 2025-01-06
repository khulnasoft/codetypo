CodeTypo: Enhance Your Writing and Coding by Fixing Common Misspellings
======================================================================

.. image:: https://img.shields.io/pypi/pyversions/codetypo
   :alt: PyPI - Python Version

.. image:: https://img.shields.io/pypi/v/codetypo
   :alt: PyPI

.. image:: https://img.shields.io/github/license/khulnasoft/codetypo
   :alt: GitHub

.. image:: https://img.shields.io/github/issues/khulnasoft/codetypo
   :alt: GitHub issues

.. image:: https://img.shields.io/github/forks/khulnasoft/codetypo
   :alt: GitHub forks

.. image:: https://img.shields.io/github/stars/khulnasoft/codetypo
   :alt: GitHub stars

**Codetypo** is a lightweight tool designed to help developers and writers fix common misspellings in their text files. Specially optimized for source code, it skips backslash escapes, which helps maintain the integrity of your code's syntax by avoiding unintended modifications to escape sequences. While Codetypo doesn't rely on a complete dictionary, it detects a curated list of frequent misspellings, catching errors like "adn" while avoiding false positives with niche terms, such as "malloc" or "chmod," which are common in programming but not in general language usage. Whether you're reviewing code, documentation, or any text-based file, Codetypo streamlines the proofreading process, improving accuracy without unnecessary noise.

Useful Links
-------------
- `GitHub Project <https://github.com/khulnasoft/codetypo>`_
- `Repository <https://github.com/khulnasoft/codetypo>`_
- `Releases <https://github.com/khulnasoft/codetypo/releases>`_

Requirements
------------
- Python 3.8 or above

Installation
------------
Install Codetypo using pip:

.. code-block:: sh

   pip install codetypo

Usage
-----
Below are some simple usage examples to demonstrate how the tool works, with brief explanations of what each command achieves for better context understanding. For exhaustive usage information, please check the output of ``codetypo -h``.

Run Codetypo in all files of the current directory:

.. code-block:: sh

   codetypo

Run Codetypo in specific files or directories (specified via their names or glob patterns):

.. code-block:: sh

   codetypo some_file some_dir/ *.ext

Noteworthy Flags
----------------
- ``-w``, ``--write-changes``: Implement the changes recommended by Codetypo. Running without this flag is a dry run. It is recommended to run this with the ``-i`` or ``--interactive`` flag.
- ``-I FILE``, ``--ignore-words=FILE``: Use a list of certain words to allow that are in the Codetypo dictionaries. The format of the file is one word per line.
- ``-L word1,word2,word3,word4``: Allow certain words that are comma-separated.
- ``-x FILE``, ``--exclude-file=FILE``: Ignore whole lines that match those in FILE.
- ``-S``, ``--skip=``: Comma-separated list of files to skip. It accepts globs as well.

Useful Commands
---------------
.. code-block:: sh

   codetypo -d -q 3 --skip="*.po,*.ts,./src/3rdParty,./src/Test"

List all typos found except translation files and some directories. Display them without terminal colors and with a quiet level of 3.

.. code-block:: sh

   codetypo -i 3 -w

Run interactive mode level 3, which allows you to review each suggested correction individually before applying it, and then write changes to file.

Ignoring Words
--------------
Spelling errors are *case-insensitive*, but words to ignore are *case-sensitive*. Use the ``-I`` or ``-L`` flag to specify words to ignore.

### Inline Ignore
Ignore a specific word in a specific location using comments in the source code:

.. code-block:: python

   def wrod(): # codetypo:ignore wrod
       pass

Using a Config File
-------------------
Command line options can also be specified in a config file. Codetypo checks the current directory for ``setup.cfg`` or ``.codetyporc``, or a file specified via ``--config``.

Example in ``setup.cfg``:

.. code-block:: ini

   [codetypo]
   skip = *.po,*.ts,./src/3rdParty,./src/Test
   count =
   quiet-level = 3

Pre-commit Hook
---------------
Codetypo works with `pre-commit <https://pre-commit.com/>`_:

.. code-block:: yaml

   - repo: https://github.com/khulnasoft/codetypo
     rev: v2.2.4
     hooks:
       - id: codetypo

Development Setup
-----------------
Ensure pip, setuptools, and wheel are up to date before installing from source:

.. code-block:: sh

   pip install --upgrade pip setuptools setuptools_scm wheel

Install required dependencies for development:

.. code-block:: sh

   pip install -e ".[dev]"

Run tests:

.. code-block:: sh

   make check

---

Feel free to contribute, report issues, or suggest new features!
