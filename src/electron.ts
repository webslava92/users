import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import electronReload from "electron-reload";
import { AppDataSource } from "./utils/connectionOptions";
import sqlite3 from "sqlite3";

let win: BrowserWindow | null;
const ipc = ipcMain;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const database = new sqlite3.Database("./db.sqlite3", (err) => {
  if (err) console.error("Database opening error", err);
});

if (isDev) {
  electronReload(__dirname, {});
}

function createWindow() {
  win = new BrowserWindow({
    width: isDev ? 1000 : 500,
    height: 650,
    minWidth: 500,
    minHeight: 650,
    resizable: true,
    movable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !!isDev,
    },
  });

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.on("closed", () => {
    win = null;
  });

  win.on("maximize", () => {
    win && win.webContents.send("isMaximized");
  });

  win.on("unmaximize", () => {
    win && win.webContents.send("isRestored");
  });

  ipc.on("minimizeApp", () => {
    win && win.minimize();
  });

  ipc.on("maximizeRestoreApp", () => {
    if (win) {
      if (win.isMaximized()) {
        win.restore();
      } else win.maximize();
    }
  });

  ipc.on("closeApp", () => {
    win && win.close();
  });

  ipc.on("asynchronous-message", (event, arg) => {
    console.log(arg);
    const sql = arg;
    database.all(sql, (err, rows) => {
      event.reply("asynchronous-reply", (err && err.message) || rows);
    });
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
