const {
  app,
  Menu,
  Tray,
  BrowserWindow,
  nativeImage,
  screen,
} = require("electron");
const url = require("url");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  });
}
let win;

function calculateDim(tray) {
  var MaxDimentions = screen.getPrimaryDisplay().workAreaSize;
  let xTray = tray.getBounds().x;
  let yTray = tray.getBounds().y;
  const sep = MaxDimentions.width - xTray;
  console.log(MaxDimentions.height, yTray);
  var myDim = {
    myX: xTray - sep,
    myY: MaxDimentions.height * 0.6, // queda horrible, pasa que me da 1040 en vez de 1080
    myWidth: MaxDimentions.width - (xTray - sep),
    myHeight: MaxDimentions.height * 0.4,
  };
  return myDim;
}

function createWindow() {
  tray = new Tray(nativeImage.createFromPath(__dirname + "/assets/icon.ico"));
  let myDim = calculateDim(tray);
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    resizable: false,
    transparent: true,
    skipTaskbar: false, // si se muestra abajo en la barra de tareas
    width: myDim.myWidth,
    height: myDim.myHeight,
    frame: false, // sin barra de navegacion, ni opciones.
    webPreferences: {
      nodeIntegration: true,
    },
    icon: __dirname + "/assets/icon.ico", // ERA ESTO NENEEEEE vamaas
  });

  win.setPosition(myDim.myX, myDim.myY);

  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });

  win.on("show", () => {}); //  al dope, esperando ser usado
  win.on("hide", () => {}); // al dope esperando ser usado

  win.loadFile("index.html");
}
app.on("ready", createWindow);
