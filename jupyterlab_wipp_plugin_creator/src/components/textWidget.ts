import { Widget, PanelLayout } from '@lumino/widgets';
import { ToolbarButton } from '@jupyterlab/apputils';
import { searchIcon, closeIcon } from '@jupyterlab/ui-components';

/**
 * Search widget on top of WIPP Panel.
 */
export class TextWidget extends Widget {
    constructor(
        placeholder: () => string,
        updateWidget: (arg0: string) => void
    ) {
        super();
        this._getPlaceholder = placeholder;

        this.addClass('wipp-pluginCreatorSidebar-text-layout');
        const layout = (this.layout = new PanelLayout());

        // //Title for the UI
        // //not working
        // const txt = new Widget();
        // txt.addClass('wipp-pluginCreatorSidebar-texttitles');
        // this._txt = document.createElement('h1');
        // this._txt = document.createTextNode("Create New Plugin")
        // txt.node.appendChild(this._txt);
        // this._txt = document.createElement('title');
        // layout.addWidget(txt);       


        // // add working header for the UI
        // let title = document.createElement('h1');
        // title.className = 'wipp-pluginCreatorSidebar-textheaders';

        // // not .body .text
        // title.innerText = "Create New Plugin"



        const textField = new Widget();
        textField.addClass('wipp-pluginCreatorSidebar-text');
        this._label = document.createElement('label');
        this._label.textContent= "Create New Plugin"
        this._textField = document.createElement('input');
        // this._textField.label = ""
        this._textField.placeholder = this._getPlaceholder();
        this._textField.oninput = async () => {
            updateWidget(this._textField.value);
        }
        
        // textField.node.appendChild(title);
        this._label.appendChild(this._textField)
        textField.node.appendChild(this._label);
        layout.addWidget(textField);

        // Clear search bar button
        const clearButton = new ToolbarButton({
            tooltip: 'CLEAR Text Field:',
            icon: closeIcon,
            onClick: async () => {
                updateWidget("");
                this._textField.value = "";
            }
        });
        layout.addWidget(clearButton);

        // Search button
        const searchButton = new ToolbarButton({
            icon: searchIcon,
            onClick: async () => {
                updateWidget(this._textField.value);
            }
        });
        layout.addWidget(searchButton);
    }

    onUpdateRequest() {
        this._textField.value = "";
        this._textField.placeholder = this._getPlaceholder();
    }
    // private _txt: HTMLTitleElement;
    private _label: HTMLLabelElement;
    private _textField: HTMLInputElement;
    private _getPlaceholder: () => string;
}
