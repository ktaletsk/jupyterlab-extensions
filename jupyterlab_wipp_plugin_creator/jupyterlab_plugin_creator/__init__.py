
import json
from pathlib import Path

from ._version import __version__
from wipp_client.wipp import Wipp
# import wipp_client

HERE = Path(__file__).parent.resolve()

with (HERE / "labextension" / "package.json").open() as fid:
    data = json.load(fid)

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": data["name"]
    }]



from .handlers import setup_handlers


def _jupyter_server_extension_points():
    return [{
        "module": "jupyterlab_plugin_creator"
    }]


def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension.

    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    # be careful these will not necessarily cause compilation error or pylance linter error, but HTTP 404 making the entire backend not run
    # print("wipp module loaded from ", wipp_client.wipp.__file__)
    # print(wipp_client.wipp.__file__)
    # print("wipp module loaded from ", Wipp.__file__)
    server_app.web_app.settings["wipp-plugin-creator"] = Wipp()
    # print(Wipp.__file__)
    # print('Inside init function ', dir(server_app.web_app.settings["wipp"]))
    # print(f"Wipp object created, {server_app.web_app.settings['wipp']}")
    setup_handlers(server_app.web_app)
    server_app.log.info("Registered HelloWorld extension at URL path /jupyterlab-plugin-creator")
    

# For backward compatibility with notebook server - useful for Binder/JupyterHub
load_jupyter_server_extension = _load_jupyter_server_extension

