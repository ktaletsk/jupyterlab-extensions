#!/bin/sh
# Author : Will Xiao
# Time saver for dev/debug
# Have no problem within conda environment for me
# Script follows here:

pip install -e .
jupyter labextension develop . --overwrite
jupyter server extension enable jupyterlab_plugin_creator
jupyter lab