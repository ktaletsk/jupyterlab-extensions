import { JupyterFrontEnd, JupyterFrontEndPlugin, ILabShell } from '@jupyterlab/application';
// import { ICommandPalette, showDialog, Dialog } from '@jupyterlab/apputils'
import { ICommandPalette } from '@jupyterlab/apputils'
import { IMainMenu } from '@jupyterlab/mainmenu'
import { INotebookTracker } from '@jupyterlab/notebook'
import { IConsoleTracker } from '@jupyterlab/console';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { requestAPI } from './handler';
import { Menu } from '@lumino/widgets';
// import * as WidgetModuleType from '@jupyterlab/terminal/lib/widget';
/**
 * Initialization data for the jupyterlab_plugin_creator extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_wipp_plugin_creator:plugin',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu, INotebookTracker, IFileBrowserFactory, ILabShell, IConsoleTracker],
  activate: (
    app: JupyterFrontEnd, 
    palette: ICommandPalette,
    mainMenu: IMainMenu,
    notebookTracker: INotebookTracker,
    factory: IFileBrowserFactory,
    labShell: ILabShell,
    consoleTracker: IConsoleTracker
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

    // Create a menu
    // const tutorialMenu: Menu = new Menu({ commands });
    const tutorialMenu: Menu = new Menu( app );
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
    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
  
})
      .catch(reason => {
        console.error(
          `The jupyterlab_plugin_creator server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
