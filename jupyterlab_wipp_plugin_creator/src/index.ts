import { JupyterFrontEnd, JupyterFrontEndPlugin, ILabShell } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils'
import { IMainMenu } from '@jupyterlab/mainmenu'
import { INotebookTracker } from '@jupyterlab/notebook'
import { IConsoleTracker } from '@jupyterlab/console';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { Menu } from '@lumino/widgets';
import { Creator_Sidebar } from './sidebar';


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


    // Create the WIPP sidebar panel
    const sidebar = new Creator_Sidebar(app, notebookTracker, consoleTracker);
    sidebar.id = 'wipp-labextension:plugin';
    sidebar.title.iconClass = 'wipp-pluginCreatorLogo jp-SideBar-tabIcon';
    sidebar.title.caption = 'WIPP Plugin Creator';
    labShell.add(sidebar, 'left', { rank: 200 });
  }
};

export default plugin;
