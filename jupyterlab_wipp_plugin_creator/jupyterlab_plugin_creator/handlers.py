import json
import os
import subprocess
import random
import string

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

# Create wipp plugin based on user input 
class CreatePlugin(APIHandler):
    @tornado.web.authenticated
    def post(self):
        """
        POST request handler,
        
        Creates a temp folder with random name,
        Generates plugin.json, requirements.txt, dockerfile,
        Copies files
        Builds dockerimage,

        Input format:
            {
                'formdata':
                    {
                    'name': '',
                    'version': '',
                    'title': '',
                    'description': ''
                    }
                'filepaths':
                    string[]
            }

        """

        pwd = os.getcwd()
        # not cryptographically secure
        randomname = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        tempenv = os.getenv('PLUGIN_TEMP_LOCATION')
        if tempenv:
            os.chdir(tempenv)
            print(f"New directory {randomname} is created!")
        else:
            if os.path.isfile('./temp'):
                os.makedirs('./temp')
            os.chdir('./temp')
            print(f"Env variable PLUGIN_TEMP_LOCATION not found, new directory temp/{randomname} is created!")
        os.makedirs(f'./{randomname}')
        os.chdir(f'./{randomname}')
        # path = f'/home/kingston/pydev/jupyterlab-extensions/jupyterlab_wipp_plugin_creator/{randomname}'
        randomfolderpath = os.getcwd()
        # print('Creating build file, requirements.txt and plugin.json')
        # Generate files to temp folder
         
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
            with open("Dockerfile", "w") as f3:
                #writelines only accept a sequence, str[]
                #\\\n\ first two \\ are single \ in docker file, \n new line and then \for the python inline line continuation, this however causes the tab to be registered 
                f3.writelines([f"FROM python:3.8-alpine","\n","COPY VERSION /\n","\n","ARG EXEC_DIR=\"/opt/executables\"\n","ARG DATA_DIR=\"/data\"\n","RUN mkdir -p ${EXEC_DIR} \\\n\
    && mkdir -p ${DATA_DIR}/inputs \\\n\
    && mkdir ${DATA_DIR}/outputs\n\n","RUN pip install -r requirements.txt\n\n","COPY src ${EXEC_DIR}/\n","WORKDIR ${EXEC_DIR}\n\n","ENTRYPOINT \[\"python3\", \"main.py\"\]"])

        except Exception as e:
            print('Error writing files: ',e)
            self.write_error(500)
        
        #Copy files to temp location
        #format cp Src_file1 Src_file2 Src_file3 Dest_directory
        try: 
            if filepaths:
                #change from root/temp to root folder otherwise './temp' is not a directory because the cwd is in temp
                # os.chdir('..')
                os.chdir(pwd)
                cmds = ["cp"]
                for filepath in filepaths:
                    cmds.append(filepath)
                # cmds.append(f'./{randomname}')
                cmds.append(randomfolderpath)
                print(cmds)
                #Run the `cp file1 file2 file3 ./temp` command
                copyfilescmd = subprocess.run(cmds)
                print('copy command return code: ',copyfilescmd.returncode)
        except Exception as e:
            print("error when running copy command",e)
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