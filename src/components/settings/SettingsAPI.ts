
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getCurrentWindow } from '@tauri-apps/api/window'

export const openSettings = () => {
  const settingsWindow = new WebviewWindow('settings', {
    url: '/settings',
    title: 'Ustawienia',
    width: 700,
    height: 500,
    resizable: true,
    decorations: true,
    focus: true,
    parent: getCurrentWindow(),
  })

  settingsWindow.once('tauri://created', () => {
    console.log('Utworzono okno ustawień')
  })

  settingsWindow.once('tauri://error', (e) => {
    console.error('Błąd przy tworzeniu okna ustawień:', e)
  })
}