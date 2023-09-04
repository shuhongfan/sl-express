export function resizeRem() {
  const docEl = document.documentElement
  const clientWidth = docEl.clientWidth
  if (!clientWidth) return
  document.getElementById('screen-container').style.fontSize = 100 * (clientWidth / 1920) + 'px'
}
