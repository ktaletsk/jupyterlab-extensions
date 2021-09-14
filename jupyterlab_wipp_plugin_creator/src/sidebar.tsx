import { JupyterFrontEnd } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook'
import { IConsoleTracker } from '@jupyterlab/console';
import { Widget, PanelLayout } from '@lumino/widgets';
// import { TextWidget } from './textWidget'
import { SchemaForm } from '@deathbeds/jupyterlab-rjsf';
// import { JSONObject, JSONValue } from '@lumino/coreutils';
import { ToolbarButton } from '@jupyterlab/apputils';
import { runIcon } from '@jupyterlab/ui-components';
import { AddedFileWidget } from './addedFilesWidget'
import { IStateDB } from '@jupyterlab/statedb'
import { requestAPI } from './handler';



export class Creator_Sidebar extends Widget {
  /**
   * Create a new WIPP plugin creator sidebar.
   */
  constructor(
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    consoleTracker: IConsoleTracker,
    state: IStateDB
  ) {
    super();

    this.addClass('wipp-pluginCreatorSidebar');

    // Define Widget layout
    let layout = (this.layout = new PanelLayout());

    let title = new Widget();
    let h1 = document.createElement('h1');
    h1.innerText = "Create New Plugin";
    title.node.appendChild(h1);   
    layout.addWidget(title);

    const schema = {
      title: "Plugin Info",
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

    //needed to readjust position of getvalue
    this._addFileWidget = new AddedFileWidget(state)
    layout.addWidget(this._addFileWidget);
    let filepaths= this._addFileWidget.getValue()
    const formData: any = {
      name: "My Plugin",
      version: "0.1.0",
      requirements: [''],
      inputs: [{}],
      outputs: [{}],
      //manually added filepaths to the formData
      filepaths: filepaths
    };
    this._formdata = formData


    this._form = new SchemaForm(schema, { formData: formData });
    layout.addWidget(this._form);

    const refreshButton = new ToolbarButton({
      icon: runIcon,
      onClick: () => { this.submit() }
    });
    layout.addWidget(refreshButton);
  }
  // let filepaths = this._addFileWidget.getValue();
  submit() {
    console.log('Files: ', this._addFileWidget.getValue())
    console.log('Form: ', this._form.getValue())
    // TODO: create API request here
    // It should contain both the form data and the added files
    let request = this._formdata;
    console.log(request)
    console.log(typeof request)
  // return input;
    var fullRequest = {
        method: 'POST',
        body: JSON.stringify(request)
    };



    requestAPI<any>('createplugin', fullRequest)
      .then(response => {
        console.log('Handle json object sent:')
        console.log(response)
      })
      .catch(() => console.log('There is an error making API request.'));
  }
  // ReactDOM.render((
  //   <Form schema={schema}
  //         />
  // ), document.getElementById("app"));
  

  private _addFileWidget: AddedFileWidget;
  private _form: SchemaForm;

  //created because need to access formdata inside submit function
  private _formdata: JSON;
  // private _formdata: JSONObject;

}