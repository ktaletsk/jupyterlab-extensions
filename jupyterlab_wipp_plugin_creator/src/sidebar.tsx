import { JupyterFrontEnd } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook'
import { IConsoleTracker } from '@jupyterlab/console';
import { Widget, PanelLayout } from '@lumino/widgets';
// import { TextWidget } from './textWidget'
import { SchemaForm } from '@deathbeds/jupyterlab-rjsf';
// import { JSONObject } from '@lumino/coreutils';
import { ToolbarButton } from '@jupyterlab/apputils';
import { runIcon } from '@jupyterlab/ui-components';
import {AddedFileWidget} from './addedFilesWidget'



export class Creator_Sidebar extends Widget {
  /**
   * Create a new WIPP plugin creator sidebar.
   */
  constructor(
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    consoleTracker: IConsoleTracker,
    //optional attribute to pass in filenames to avoid creating a second jupyterfrontend shell
    addedfilenames?: string[]
  ) {
    super();

    this.addClass('wipp-pluginCreatorSidebar');

    // Define Widget layout
    let layout = (this.layout = new PanelLayout());

    // // Add input text widget
    // this._text = new TextWidget()
    // layout.addWidget(this._text);

    const schema = {
      title: "Create new plugin",
      type: "object",
      properties: {
        name: {
          type: "string", 
          title: "Name", 
          default: ""
        },
        version: {
          type: "string", 
          title: "Version", 
          default: ""
        },
        requirements: {
          type: "array", 
          items: {
            type: "string"
          }, 
          title: "Requirements"
        },
        inputs: {
          type: "array", 
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                title: "Name"
              },
              description: {
                type: "string",
                title: "Description"
              },
              inputType: {
                type: "string",
                enum: ["collection", "csvCollection", "notebook", "pyramid", "genericData", "stitchingVector"]
              },
              required: {
                type: "boolean",
                title: "Required"
              }
            }
          }, 
          title: "Inputs"
        },
        outputs: {
          type: "array", 
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                title: "Name"
              },
              description: {
                type: "string",
                title: "Description"
              },
              inputType: {
                type: "string",
                enum: ["collection", "csvCollection", "notebook", "pyramid", "genericData", "stitchingVector"]
              },
              required: {
                type: "boolean",
                title: "Required"
              }
            }
          }, 
          title: "Outputs"
        }
      }
    };

    const formData: any = {
      name: "My Plugin",
      version: "0.1.0",
      requirements: [''],
      inputs: [{}],
      outputs: [{}]
    };




    const form = new SchemaForm(schema, {formData: formData});
    layout.addWidget(form);

    const addedfilewidget = new AddedFileWidget(addedfilenames)
    layout.addWidget(addedfilewidget);

    const refreshButton = new ToolbarButton({
      icon: runIcon,
      onClick: () => {console.log(form.getValue())}
    });
    layout.addWidget(refreshButton);
  }

  // private _text: TextWidget;
}