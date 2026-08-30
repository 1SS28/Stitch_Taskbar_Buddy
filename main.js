const { app, BrowserWindow, screen, Menu, ipcMain } = require('electron');

const animationNames = ['idle', 'jump', 'fall', 'hurt', 'sleepy'];

function createWindow(){
    const { x: areaX, y: areaY, width, height } = screen.getPrimaryDisplay().workArea;

    const win = new BrowserWindow({
        width: 80,
        height: 80,
        x: areaX + width - 100,
        y: areaY + height - 80,
        transparent: true,
        frame: false,
        resizable: false,
        hasShadow: false,
        skipTaskbar: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
    })

    win.setAlwaysOnTop(true, 'screen-saver');
    win.setVisibleOnAllWorkspaces(true, {visibleOnFullScreen:true});
    win.loadFile('index.html');

    

    ipcMain.on('show-animation-menu', () => {
        const menuItems = animationNames.map(name => ({
            label: name,
            click: () => win.webContents.send('set-animation', name)
        }));

        menuItems.push({type: 'separator'});
        menuItems.push({label: 'Quit', click: () => app.quit()});

        const menu = Menu.buildFromTemplate(menuItems);
        menu.popup();
       
    });
}

app.whenReady().then(() => {
    app.setLoginItemSettings({openAtLogin: true});
    createWindow();
});