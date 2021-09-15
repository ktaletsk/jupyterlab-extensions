#!/bin/sh
# Author : Will Xiao
# Script follows here:

pip install -e .
jupyter labextension develop . --overwrite
jupyter server extension enable jupyterlab_plugin_creator
jupyter lab