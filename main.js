const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");


let mainWindow;

const isWindows = process.platform === "win32";

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		},
		frame: isWindows ? false : true
	});

	mainWindow.loadURL("https://github.com/GitHubVictorzz/simple_webview_electron");
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (mainWindow === null) createWindow();
});

ipcMain.on(`display-app-menu`, function (e, args) {
	if (isWindows && mainWindow) {
		menu.popup({
			window: mainWindow,
			x: args.x,
			y: args.y
		});
	}
});