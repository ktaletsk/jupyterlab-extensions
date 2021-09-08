import { JupyterFrontEnd } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook'
import { IConsoleTracker } from '@jupyterlab/console';
import { Widget, PanelLayout } from '@lumino/widgets';
import { TextWidget } from './textWidget'


export class Creator_Sidebar extends Widget {
    /**
     * Create a new WIPP plugin creator sidebar.
     */
    constructor(
      app: JupyterFrontEnd,
      notebookTracker: INotebookTracker,
      consoleTracker: IConsoleTracker,
    ) {
        super();

        this.addClass('wipp-creator_sidebar');

        // Define Widget layout
        let layout = (this.layout = new PanelLayout());

        // Add input text widget
        this._text = new TextWidget()        
        layout.addWidget(this._text);

    }

    private _text: TextWidget;
}