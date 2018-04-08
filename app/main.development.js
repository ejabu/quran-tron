import {app, BrowserWindow, Menu, shell} from 'electron';

let menu;
let template;
let mainWindow = null;
let aboutWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
  const path = require('path'); // eslint-disable-line
  const ejakeren = path.join(__dirname, '../assets/app2.html'); // eslint-disable-line

}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

if (process.platform == 'linux'){
  app.setPath('userData', '/home/'+process.env.USER+'/.ajaba')
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
  }
);

const installExtensions = async() => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) { // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async() => {
  await installExtensions();

  mainWindow = new BrowserWindow({show: false, width: 1024, height: 728, title: 'Qayad'});

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const {x, y} = props;

      Menu.buildFromTemplate([
        {
          label: 'Undo',
          role: 'undo'
        }, {
          label: 'Redo',
          role: 'redo'
        }, {
          type: 'separator'
        }, {
          label: 'Cut',
          role: 'cut'
        }, {
          label: 'Copy',
          role: 'copy'
        }, {
          label: 'Paste',
          role: 'paste'
        }, {
        //   type: 'separator'
        // }, {
        //   label: 'Select all',
        //   role: 'selectall'
        // }, {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(mainWindow);
    });
  }
  else {
    mainWindow.webContents.on('context-menu', (e, props) => {
      const {x, y} = props;

      Menu.buildFromTemplate([
        {
          label: 'Cut',
          role: 'cut'
        }, {
          label: 'Copy',
          role: 'copy'
        }, {
          label: 'Paste',
          role: 'paste'
        // }, {
        //   label: 'Inspect element',
        //   click() {
        //     mainWindow.inspectElement(x, y);
        //   }
        }
      ]).popup(mainWindow);
    });
  }

  if (process.platform === 'darwin') {
    template = [
      {
        label: 'Electron',
        submenu: [
          {
            label: 'About ElectronReact',
            selector: 'orderFrontStandardAboutPanel:'
          }, {
            type: 'separator'
          }, {
            label: 'Services',
            submenu: []
          }, {
            type: 'separator'
          }, {
            label: 'Hide ElectronReact',
            accelerator: 'Command+H',
            selector: 'hide:'
          }, {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          }, {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          }, {
            type: 'separator'
          }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              app.quit();
            }
          }
        ]
      }, {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          }, {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          }, {
            type: 'separator'
          }, {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          }, {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          }, {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          }, {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      }, {
        label: 'View',
        submenu: (process.env.NODE_ENV === 'development')
          ? [
            {
              label: 'Reload',
              accelerator: 'Command+R',
              click() {
                mainWindow.webContents.reload();
              }
            }, {
              label: 'Toggle Full Screen',
              accelerator: 'Ctrl+Command+F',
              click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
              }
            }, {
              label: 'Toggle Developer Tools',
              accelerator: 'Alt+Command+I',
              click() {
                mainWindow.toggleDevTools();
              }
            }
          ]
          : [
            {
              label: 'Toggle Full Screen',
              accelerator: 'Ctrl+Command+F',
              click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
              }
            }
          ]
      }, {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          }, {
            type: 'separator'
          }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      }, {
        label: 'Help',
        submenu: [
          {
            label: 'About',
            click() {
              shell.openExternal('http://electron.atom.io');
            }
          }, {
            label: 'Documentation',
            click() {
              shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
            }
          }, {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://discuss.atom.io/c/electron');
            }
          }, {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/atom/electron/issues');
            }
          }
        ]
      }
    ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [
      {
        label: '&File',
        submenu: [
          {
          //   label: '&Open',
          //   accelerator: 'Ctrl+O'
          // }, {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click() {
              mainWindow.close();
            }
          }
        ]
      }, {
        label: '&View',
        submenu: (process.env.NODE_ENV === 'development')
          ? [
            {
            //   label: '&Reload',
            //   accelerator: 'Ctrl+R',
            //   click() {
            //     mainWindow.webContents.reload();
            //   }
            // }, {
              label: 'Toggle &Full Screen',
              accelerator: 'F11',
              click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
              }
            }, {
              label: 'Toggle &Developer Tools',
              accelerator: 'Alt+Ctrl+I',
              click() {
                mainWindow.toggleDevTools();
              }
            }
          ]
          : [
            {
              label: 'Toggle &Full Screen',
              accelerator: 'F11',
              click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
              }
            }
          ]
      }, {
        label: 'Help',
        submenu: (process.env.NODE_ENV === 'development')
          ? [
          {
            label: 'About',
            click() {
              if (aboutWindow == null){
                aboutWindow = new BrowserWindow({
                                      skipTaskbar: true,
                                      frame: false,
                                      toolbar: false,
                                      width: 524,
                                      height: 254,
                                      title: 'About'});
                // Folder assets dibelakang app
                aboutWindow.loadURL(`file://${__dirname}/../assets/about.html`);
                aboutWindow.openDevTools();

                aboutWindow.webContents.on('did-finish-load', () => {
                  aboutWindow.show();
                  aboutWindow.focus();
                });

                // aboutWindow.on('blur', function() {
                //   aboutWindow.destroy()
                //   aboutWindow = null;
                // });
              }

            }
          },
          {
            label: 'Check for Update',
            click() {
              shell.openExternal('https://aysaar.github.io/quran');
            }
          },
          {
            type: "separator"
          },
          {
            label: 'Version 1.2.0',
            enabled: false,
          }
        ] : [ //Ini kalau Production
          {
            label: 'About',
            click() {
              if (aboutWindow == null){
                aboutWindow = new BrowserWindow({
                                      skipTaskbar: true,
                                      frame: false,
                                      toolbar: false,
                                      width: 524,
                                      height: 254,
                                      title: 'About'});
                // Karena ini akan ke load di Resources
                // Folder assets dibelakang resource dan dibelakang asar.resources
                aboutWindow.loadURL(`file://${__dirname}/../../assets/about.html`);

                aboutWindow.webContents.on('did-finish-load', () => {
                  aboutWindow.show();
                  aboutWindow.focus();
                });


                aboutWindow.on('blur', function() {
                  aboutWindow.destroy()
                  aboutWindow = null;
                });
              }

            }
          },
          {
            label: 'Check for Update',
            click() {
              shell.openExternal('https://aysaar.github.io/quran');
            }
          },
          {
            type: "separator"
          },
          {
            label: 'Version 1.2.0',
            enabled: false,
          }
        ]
      }
    ];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
