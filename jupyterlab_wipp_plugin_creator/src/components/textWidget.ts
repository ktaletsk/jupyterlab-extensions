import { Widget, PanelLayout } from '@lumino/widgets';
import { ToolbarButton } from '@jupyterlab/apputils';
// @ts-expect-error
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

        // Search input bar for imageCollections
        const textField = new Widget();
        textField.addClass('wipp-pluginCreatorSidebar-text');
        this._textField = document.createElement('input');
        this._textField.placeholder = this._getPlaceholder();
        this._textField.oninput = async () => {
            updateWidget(this._textField.value);
        }
        textField.node.appendChild(this._textField);
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

        // // Search button
        // const searchButton = new ToolbarButton({
        //     icon: searchIcon,
        //     onClick: async () => {
        //         updateWidget(this._textField.value);
        //     }
        // });
        // layout.addWidget(searchButton);
    }

    onUpdateRequest() {
        this._textField.value = "";
        this._textField.placeholder = this._getPlaceholder();
    }

    private _textField: HTMLInputElement;
    private _getPlaceholder: () => string;
}
