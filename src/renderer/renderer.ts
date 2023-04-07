import electron from 'electron';
const { ipcRenderer } = electron;

export function sendAsync(message: any) {
  console.log({ message })
  return new Promise((resolve) => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message', message);
  });
}
