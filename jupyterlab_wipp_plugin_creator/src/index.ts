import { JupyterFrontEnd, JupyterFrontEndPlugin, ILabShell } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils'
import { IMainMenu } from '@jupyterlab/mainmenu'
import { INotebookTracker } from '@jupyterlab/notebook'
import { IConsoleTracker } from '@jupyterlab/console';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { Menu } from '@lumino/widgets';
import { Creator_Sidebar } from './sidebar';
import {IStateDB} from '@jupyterlab/statedb'


let filepaths: string[] = [];
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_wipp_plugin_creator:plugin',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu, INotebookTracker, IFileBrowserFactory, ILabShell, IConsoleTracker,IStateDB],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu,
    notebookTracker: INotebookTracker,
    factory: IFileBrowserFactory,
    labShell: ILabShell,
    consoleTracker: IConsoleTracker,
    state: IStateDB
  ) => {
    console.log('JupyterLab extension jupyterlab_plugin_creator is activated!');
    // const { commands } = app;

    // Add a command
    // const command = 'jlab-examples:main-menu';

    // // changed from commands.addCommand(command, {
    // const command = 'jlab-examples/context-menu:open';
    const command = 'jlab-examples:main-menu';

    app.commands.addCommand(command, {
      label: `Will's first command`,
      caption: `Execute Will's first command`,
      execute: (args: any) => {
        console.log(
          `Will's command has been called ${args['origin']}.`
        );
        window.alert(
          `Will's command 2 has been called ${args['origin']}.`
        );
      },
    });
    console.log(`i've modified the wipp plugin but nothing is showing`)
    // // // me messing around
    // mainMenu.fileMenu.addGroup([
    //   {
    //     command: command,
    //   }
    // ], 50 /* rank */);
  
    const dbkey = 'wipp-plugin-creator:data'
  
    // Initialzie dbkey if not in IStateDB
    state.list().then(response => {
      let keys = response.ids as String[];
      if (keys.indexOf(dbkey) === -1) {
        state.save(dbkey, filepaths)
      }
    })


    // Create a menu
    // const tutorialMenu: Menu = new Menu({ commands });
    const tutorialMenu: Menu = new Menu(app);
    tutorialMenu.title.label = 'Main Menu Example';
    mainMenu.addMenu(tutorialMenu, { rank: 80 });

    // Add the command to the menu
    tutorialMenu.addItem({ command, args: { origin: 'from the menu' } });

    // // somehow this would cause a bunch of errors making it fail to build
    // app.commands
    // .execute('terminal:create-new')
    // .then((terminal: WidgetModuleType.Terminal) => {
    //   app.shell.add(terminal, 'right');
    // });  


    // // Create the WIPP sidebar panel
    // const sidebar = new Creator_Sidebar(app, notebookTracker, consoleTracker, filepaths);
    // sidebar.id = 'wipp-labextension:plugin';
    // sidebar.title.iconClass = 'wipp-pluginCreatorLogo jp-SideBar-tabIcon';
    // sidebar.title.caption = 'WIPP Plugin Creator';
    // labShell.add(sidebar, 'left', { rank: 200 });
    
    //this would cause an error, the selectedItems would be undefined.
    //console.log(`testing path: ${factory.tracker.currentWidget!.selectedItems().next()!.path}`)
    // Create command for context menu
    var filepath = ''
    const addFileToPluginContextMenuCommandID = 'wipp-plugin-creator-add-context-menu';
    app.commands.addCommand(addFileToPluginContextMenuCommandID, {
      label: 'Add to the new WIPP plugin',
      iconClass: 'jp-MaterialIcon jp-AddIcon',
      isVisible: () => ['notebook', 'file'].includes(factory.tracker.currentWidget!.selectedItems().next()!.type),
      execute: () =>  {
        filepath = factory.tracker.currentWidget!.selectedItems().next()!.path;
        state.fetch(dbkey).then(response => {
          filepaths = response as string[];
          if (filepaths.indexOf(filepath) === -1) {
            filepaths.push(filepath);
          }
          else {
            console.log(`${filepath} was already added`)
          }
          state.save(dbkey, filepaths);
        })
      }
    })
    state.list().then(response => {console.log(response)})
    // THis would cause Plugin 'jupyterlab_wipp_plugin_creator:plugin' failed to activate.
    //console.log(state.list)

    // Need to fetch outside of execute on click context menu as well to be able to render the sidebar on start
    state.fetch(dbkey).then(response => {
          filepaths = response as string[];

                    // Create the WIPP sidebar panel
          const sidebar = new Creator_Sidebar(app, notebookTracker, consoleTracker, filepaths);
          sidebar.id = 'wipp-labextension:plugin';
          sidebar.title.iconClass = 'wipp-pluginCreatorLogo jp-SideBar-tabIcon';
          sidebar.title.caption = 'WIPP Plugin Creator';
          labShell.add(sidebar, 'left', { rank: 200 });
    })
    

    //This would cause the same error and seems to prevent the code below to not work, i.e. no added context menu option
    // console.log(`Fetching IStateDB storage out of block${state.fetch(filepath)}`)
    // Add command to context menu
    const selectorItem = '.jp-DirListing-item[data-isdir]';
    app.contextMenu.addItem({
      command: addFileToPluginContextMenuCommandID,
      selector: selectorItem
    })
  }
};

export default plugin;
