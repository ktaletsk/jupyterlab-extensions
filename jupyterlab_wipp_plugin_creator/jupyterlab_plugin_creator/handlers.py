import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado


class WippHandler(APIHandler):
    @property
    def wipp(self):
        return self.settings["wipp"]

# class textFieldHandler(WippHandler):
#     @tornado.web.authenticated
#     def get(self):
#         response = self.wipp.check_api_is_live()
#         self.finish(json.dumps(response))

class RouteHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        self.finish(json.dumps({
            "xyz": "This is /jupyterlab-plugin-creator/get_example endpoint!"
        }))


def setup_handlers(web_app):




    handlers = [
    ('/jupyterlab-plugin-creator/registerText', WippRegisterText),
    # ('/wipp/ui_urls', WippUiUrls),
    # ('/wipp/register', WippRegisterNotebook),
    # ('/wipp/imageCollections', WippImageCollections),
    # ('/wipp/imageCollections/search', WippImageCollectionsSearch),
    # ('/wipp/csvCollections', WippCsvCollections),
    # ('/wipp/csvCollections/search', WippCsvCollectionsSearch)
    ]

    base_url = web_app.settings["base_url"]
    handlers = [(url_path_join(base_url, x[0]), x[1]) for x in handlers]

    host_pattern = ".*$"
    web_app.add_handlers(host_pattern, handlers)
    # base_url = web_app.settings["base_url"]
    # route_pattern = url_path_join(base_url, "jupyterlab-plugin-creator", "get_example")
    # handlers = [(route_pattern, RouteHandler)]
    # web_app.add_handlers(host_pattern, handlers)





class WippRegisterText(WippHandler):
    @tornado.web.authenticated
    def post(self):
        """
        POST request handler, registers notebook in WIPP

        Input format:
            {
              'path': '/home/jovyan/sample.ipynb',
              'name': 'my-notebook-7',
              'description': 'Image segmentation notebook'
            }
        """

        #data is python dictionary sent from front end
        data = json.loads(self.request.body.decode("utf-8"))
        print(data)
        # if all(key in data for key in ("path","name","description")):
        #     try:

                # response = self.wipp.register_notebook(data["path"], data["name"], data["description"])
        #         self.finish(json.dumps(response))
        #     except:
        #         self.write_error(500)
        # else:
        #     self.write_error(400)

