
import { Widget } from '@lumino/widgets';
import { requestAPI } from '../handler';

/**
 * Search widget on top of WIPP Panel.
 */
export class TextWidget extends Widget {
    constructor(
        placeholder: () => string,
        updateWidget: (arg0: string) => void
    ) {
        super();
        // this._getPlaceholder = placeholder;

        // this.addClass('wipp-pluginCreatorSidebar-text-layout');
        // const layout = (this.layout = new PanelLayout());
`   `




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
        let linebreak = document.createElement('br');
        let linebreak2 = document.createElement('br');
        let linebreak3 = document.createElement('br');
        let linebreak4 = document.createElement('br');
        // H1 Block ///////////////////////////////
        let title = document.createElement('h1');
        title.className = 'wipp-pluginCreatorSidebar-title';
        title.innerText = "Create New Plugin";
        this.node.appendChild(title);   
        this.node.appendChild(linebreak)
        //////////////////////////////////////////

        let inputname_widget = document.createElement('div');
        
        // const textField = new Widget();
        // textField.addClass('wipp-pluginCreatorSidebar-text');
        let label = document.createElement('label');
        label.textContent= "Name:";
        inputname_widget.appendChild(label);
       

        let textfield = document.createElement('input');
        inputname_widget.appendChild(textfield);
        // this.node.appendChild(inputname_widget);
        inputname_widget.appendChild(linebreak2);

        let label2 = document.createElement('label');
        label2.textContent= "Version:";
        inputname_widget.appendChild(label2);
        let textfield2 = document.createElement('input');
        inputname_widget.appendChild(textfield2);
        inputname_widget.appendChild(linebreak3);
        // this.node.appendChild(inputname_widget);
    
        let label3 = document.createElement('label');
        label3.textContent= "Title:";
        inputname_widget.appendChild(label3);
        let textfield3 = document.createElement('input');
        inputname_widget.appendChild(textfield3);
        inputname_widget.appendChild(linebreak4);

        let label4 = document.createElement('label');
        label4.textContent= "Description:";
        inputname_widget.appendChild(label4);
        let textfield4 = document.createElement('input');
        inputname_widget.appendChild(textfield4);
        inputname_widget.appendChild(linebreak);

        let button = document.createElement('button');
        button.innerHTML = 'Generate plugin.json'
        inputname_widget.appendChild(button);
        this.node.appendChild(inputname_widget);

        button.onclick = async () => 
        {   
            let request = {
                name: textfield.value,
                version:textfield2.value,
                title:textfield3.value,
                description:textfield3.value
            } 
            // return input;
            var fullRequest = {
                method: 'POST',
                body: JSON.stringify(request)
            };
            
            requestAPI<any>('registerText', fullRequest)
            .then(response => {
                console.log('Handle json object sent:')
                console.log(response)
                // this.handleResponse(response);
                })
                .catch(() => console.log('There is an error making API request.'));
        }


        // let helpbutton = document.createElement('button');
        // helpbutton.className = 'help'
        // helpbutton.

        // const clearButton = new ToolbarButton({
        //     tooltip: 'CLEAR SEARCH BAR:',
        //     icon: closeIcon,
        //     onClick: async () => {
        //         updateWidget("");
        //         this._searchBar.value = "";
        //     }
        // });

        
        // this._textField = document.createElement('input');
        // // this._textField.label = ""
        // this._textField.placeholder = this._getPlaceholder();
        // this._textField.oninput = async () => {
        //     updateWidget(this._textField.value);
        // }
        
        // // textField.node.appendChild(title);

        // title.appendChild(this._label)
        // title.appendChild(this._textField)
        // textField.node.appendChild(this._label);
        // layout.addWidget(textField);

        // // Clear search bar button
        // const clearButton = new ToolbarButton({
        //     tooltip: 'CLEAR Text Field:',
        //     icon: closeIcon,
        //     onClick: async () => {
        //         updateWidget("");
        //         this._textField.value = "";
        //     }
        // });
        // layout.addWidget(clearButton);

        // // Search button
        // const searchButton = new ToolbarButton({
        //     icon: searchIcon,
        //     onClick: async () => {
        //         updateWidget(this._textField.value);
        //         let input = {
        //             name: this._textField.value

        //         } 
        //         return input
        //     }
        // });
        // layout.addWidget(searchButton);
    }

//     onUpdateRequest() {
//         this._textField.value = "";
//         this._textField.placeholder = this._getPlaceholder();
//     }
//     // private _txt: HTMLTitleElement;
    // private _label: HTMLLabelElement;
//     private _textField: HTMLInputElement;
//     private _getPlaceholder: () => string;
//     // private _someElement: 
// 
}
