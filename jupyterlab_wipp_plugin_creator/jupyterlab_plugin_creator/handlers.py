import json
import os

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado


class CreatePlugin(APIHandler):
    @tornado.web.authenticated
    def post(self):
        """
        POST request handler, creates a new plugin.

        Input format:
            {
              'name': '',
              'version': '',
              'title': '',
              'description': ''
            }
        """

        data = json.loads(self.request.body.decode("utf-8"))
        try:
            with open("plugin.json", "w") as file:
                file.write(json.dumps(data))
        except:
            self.write_error(500)

def setup_handlers(web_app):
    handlers = [
        ('/jupyterlab-plugin-creator/createplugin', CreatePlugin)
    ]

    base_url = web_app.settings["base_url"]
    handlers = [(url_path_join(base_url, x[0]), x[1]) for x in handlers]

    host_pattern = ".*$"
    web_app.add_handlers(host_pattern, handlers)