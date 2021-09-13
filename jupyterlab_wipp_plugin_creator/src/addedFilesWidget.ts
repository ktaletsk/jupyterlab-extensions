import { Widget } from '@lumino/widgets';
// import { requestAPI } from './handler';

export class AddedFileWidget extends Widget {
    constructor(addedfilenames:string[]) {
        super();
        let text = 'Added Files: <br>'
        let addedfilediv = document.createElement('p');
        for (let i = 0; i < addedfilenames.length; i++) {
            text += addedfilenames[i] + "<br>";
          } 
        addedfilediv.innerHTML = text
        console.log(text)
        this.node.appendChild(addedfilediv)

    }
}