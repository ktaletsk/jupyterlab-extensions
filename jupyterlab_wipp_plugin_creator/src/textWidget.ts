
import { Widget } from '@lumino/widgets';
import { requestAPI } from './handler';

/**
 * Search widget on top of WIPP Panel.
 */
export class TextWidget extends Widget {
    constructor() {
        super();

        // this.addClass('wipp-pluginCreatorSidebar-text-layout');
        // const layout = (this.layout = new PanelLayout());  

        // // add working header for the UI
        let linebreak = document.createElement('br');
        let linebreak2 = document.createElement('br');
        let linebreak3 = document.createElement('br');
        let linebreak4 = document.createElement('br');
        let linebreak5 = document.createElement('br');

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
                description:textfield4.value
            } 
            // return input;
            var fullRequest = {
                method: 'POST',
                body: JSON.stringify(request)
            };
            
            requestAPI<any>('createplugin', fullRequest)
            .then(response => {
                console.log('Handle json object sent:')
                console.log(response)
                // this.handleResponse(response);
                })
                .catch(() => console.log('There is an error making API request.'));
        }

        /*************************************************
         * Inputs Section
         **************************************************/


        let linebreak6 = document.createElement('br');
        let linebreak7 = document.createElement('br');
        let linebreak8 = document.createElement('br');
        let linebreak9 = document.createElement('br');
        // let linebreak10 = document.createElement('br');
        // let linebreak11= document.createElement('br');

        let title2 = document.createElement('h2');
        title2.className = 'wipp-pluginCreatorSidebar-title2';
        title2.innerText = "Input Dir";
        this.node.appendChild(title2);   
        this.node.appendChild(linebreak6)





        let inputdirdiv = document.createElement('div');

        let inputlabel = document.createElement('label');
        inputlabel.textContent= "Name:";
        inputdirdiv.appendChild(inputlabel);
        let inputtextfield = document.createElement('input');
        inputtextfield.placeholder = 'input directory'
        inputdirdiv.appendChild(inputtextfield);
        inputdirdiv.appendChild(linebreak7);
        // this.node.appendChild(inputname_widget);

        let inputlabel1 = document.createElement('label');
        inputlabel1.textContent= "Description:";
        inputdirdiv.appendChild(inputlabel1);
        let inputtextfield1 = document.createElement('input');
        inputtextfield1.placeholder = 'input directory'
        inputdirdiv.appendChild(inputtextfield1);
        inputdirdiv.appendChild(linebreak8);

        let inputlabel2 = document.createElement('label');
        inputlabel2.textContent= "Type:";
        inputdirdiv.appendChild(inputlabel2);
        // note type in the createElement('select ') compiles but causes runtime error, String contains an invalid character ""
        let inputdropdown = document.createElement('select'), opt1 = document.createElement('option'), opt2 = document.createElement('option');
        opt1.value = '1';
        opt2.value = '2';
        opt1.textContent = 'ImageCollection';
        opt2.textContent = 'CsvCollection';
        inputdropdown.appendChild(opt1);
        inputdropdown.appendChild(opt2);
        inputdirdiv.appendChild(inputdropdown);
        inputdirdiv.appendChild(linebreak9);

        this.node.appendChild(inputdirdiv);
        /**************************************************
         * Input section ends
         *************************************************/



        

        let collapsebutton = document.createElement('button');
        // can't use .addclass, that method belongs to lumino widget
        collapsebutton.classList.add('collapsible-button');
        collapsebutton.innerHTML = 'Optional Fields'
        let collapsediv = document.createElement('div');
        collapsediv.classList.add('collapsible-content');

        let collapsep = document.createElement('p');
        
        // collapsediv.appendChild(collapsep)
        /**********************************************
        Collapsed fields
        ************************************************/
        let hlabel = document.createElement('label');
        hlabel.textContent= "Name:";
        collapsediv.appendChild(hlabel);
       

        let htextfield = document.createElement('input');
        collapsediv.appendChild(htextfield);
        // this.node.appendChild(collapsediv);
        collapsediv.appendChild(linebreak5);

        // let label2 = document.createElement('label');
        // label2.textContent= "Version:";
        // collapsediv.appendChild(label2);
        // let textfield2 = document.createElement('input');
        // collapsediv.appendChild(textfield2);
        // collapsediv.appendChild(linebreak3);
        // // this.node.appendChild(collapsediv);
    
        // let label3 = document.createElement('label');
        // label3.textContent= "Title:";
        // collapsediv.appendChild(label3);
        // let textfield3 = document.createElement('input');
        // collapsediv.appendChild(textfield3);
        // collapsediv.appendChild(linebreak4);

        // let label4 = document.createElement('label');
        // label4.textContent= "Description:";
        // collapsediv.appendChild(label4);
        // let textfield4 = document.createElement('input');
        // collapsediv.appendChild(textfield4);
        // collapsediv.appendChild(linebreak);

        /**********************************************
        Collapsed fields ends
        ************************************************/
        collapsebutton.onclick = async () =>
        {    /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
            collapsediv.classList.toggle("active");
             /* Toggle between hiding and showing the active panel */
            // var panel = collapsebutton.nextElementSibling;
            if (collapsep.style.display === "block") {
            collapsep.style.display = "none";
            console.log('collaspse button toggled')
            } else {
            collapsep.style.display = "block";
    }
        }

        collapsediv.appendChild(collapsep)
        this.node.appendChild(collapsebutton);
        this.node.appendChild(collapsediv);
    }
}
