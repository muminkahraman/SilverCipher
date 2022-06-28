const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain
const path = require("path");
const isDev = require("electron-is-dev");

app.allowRendererProcessReuse = true

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 600,
        icon: "",
        //resizable: false,
        minHeight: 500,
        minWidth: 750,

        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            webSecurity: false
        }
    });
     

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    //mainWindow.setMenu(null);

}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

ipcMain.on("test", () => {
    
})

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});