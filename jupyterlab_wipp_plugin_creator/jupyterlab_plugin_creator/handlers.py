import json
import os
import subprocess

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

# Create wipp plugin based on user input 
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
        
        path = '/home/kingston/pydev/jupyterlab-extensions/jupyterlab_wipp_plugin_creator/temp'

        # Create new folder 
        if not os.path.exists(path):
            os.makedirs(path)
            print("New directory \temp  is created!")

        # save generated text to temp folder
        pwd = os.getcwd() 
        os.chdir(path)
        data = json.loads(self.request.body.decode("utf-8"))
        form = data['formdata']
        filepaths = data['addedfilepaths']
        requirements = form['requirements']
        # Separate requirements key in the formdata form rest. Write plugin.json and requirements.txt separately 
        form.pop('requirements')
        try:
            with open("plugin.json", "w") as f1:
                f1.write(json.dumps(form))
            with open("requirements.txt", "w") as f2:
                for req in requirements:
                    f2.write(f'{req}\n')
        except Exception as e:
            print(e)
            self.write_error(500)
        
        #copy files to the temp location
        #format cp Src_file1 Src_file2 Src_file3 Dest_directory
        #required 
        try: 
            if filepaths:
                #change from root/temp to root folder
                # previously cp: target './temp' is not a directory because the cwd is in temp
                os.chdir('..')
                # subprocess.call(['sh', './test.sh']) 
                cmds = ["cp"]
                for filepath in filepaths:
                    cmds.append(filepath)

                cmds.append('./temp')
                print(cmds)
                copyfilescmd = subprocess.run(cmds)
        except Exception as e:
            print("error when running bash commands",e)
        #change back to previous working dir
        os.chdir(pwd)


def setup_handlers(web_app):
    handlers = [
        ('/jupyterlab-plugin-creator/createplugin', CreatePlugin)
    ]

    base_url = web_app.settings["base_url"]
    handlers = [(url_path_join(base_url, x[0]), x[1]) for x in handlers]

    host_pattern = ".*$"
    web_app.add_handlers(host_pattern, handlers)