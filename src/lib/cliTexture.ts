import { runsForWord, LETTER_W, LETTER_GAP, BRICK_GAP, ECHO } from '../components/PixelWord'

/** Draws the MacBook terminal onto a canvas at a high fixed resolution so it
 *  reads as a real WebGL texture, not CSS-rotated DOM text (which blurs
 *  under drei's Html transform). Design units mirror the old 334x216 CSS
 *  layout; SCALE supersamples so glyphs stay crisp up close. */
const DESIGN_W = 334
const DESIGN_H = 216
const SCALE = 5
export const CANVAS_W = DESIGN_W * SCALE
export const CANVAS_H = DESIGN_H * SCALE

const MONO = '"JetBrains Mono Variable", ui-monospace, monospace'

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawPixelWord(
  ctx: CanvasRenderingContext2D,
  word: string,
  x: number,
  y: number,
  targetWidth: number,
  color: string,
) {
  const runs = runsForWord(word)
  const viewBoxWidth = word.length * (LETTER_W + LETTER_GAP) - LETTER_GAP + ECHO
  const viewBoxHeight = LETTER_W + ECHO
  const cell = targetWidth / viewBoxWidth
  const echoPx = ECHO * cell
  const gapPx = BRICK_GAP * cell

  ctx.globalAlpha = 0.8
  ctx.strokeStyle = color
  ctx.lineWidth = Math.max(1, 0.1 * cell)
  runs.forEach((r) => {
    ctx.strokeRect(x + r.x * cell + echoPx, y + r.y * cell + echoPx, r.len * cell - gapPx, cell - gapPx)
  })

  ctx.globalAlpha = 1
  ctx.fillStyle = color
  runs.forEach((r) => {
    ctx.fillRect(x + r.x * cell, y + r.y * cell, r.len * cell - gapPx, cell - gapPx)
  })

  return viewBoxHeight * cell
}

export interface CliStage {
  showWelcome: boolean
  showBanner: boolean
  showLogin: boolean
  caretOn: boolean
}

export function drawCli(canvas: HTMLCanvasElement, stage: CliStage) {
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  roundRect(ctx, 0, 0, CANVAS_W, CANVAS_H, 3 * SCALE)
  ctx.fillStyle = '#262624'
  ctx.fill()
  ctx.save()
  roundRect(ctx, 0, 0, CANVAS_W, CANVAS_H, 3 * SCALE)
  ctx.clip()

  const padX = 12 * SCALE
  const fontPx = 7.5 * SCALE
  let cursorY = 8 * SCALE

  const dotR = 3 * SCALE
  const dotGap = 5 * SCALE
  ;['#f16a5d', '#f5bf4f', '#58c33f'].forEach((c, i) => {
    ctx.beginPath()
    ctx.arc(padX + dotR + i * (dotR * 2 + dotGap), cursorY + dotR, dotR, 0, Math.PI * 2)
    ctx.fillStyle = c
    ctx.fill()
  })
  cursorY += dotR * 2 + 10 * SCALE

  ctx.textBaseline = 'middle'

  if (stage.showWelcome) {
    const text1 = '✻ Welcome to the '
    const textBold = 'Usama Ayoub!'
    const text2 = ' research preview!'
    ctx.font = `${fontPx}px ${MONO}`
    const w1 = ctx.measureText(text1).width
    ctx.font = `700 ${fontPx}px ${MONO}`
    const wBold = ctx.measureText(textBold).width
    ctx.font = `${fontPx}px ${MONO}`
    const w2 = ctx.measureText(text2).width

    const boxPadX = 8 * SCALE
    const boxH = fontPx * 1.5 + 6 * SCALE
    const boxW = w1 + wBold + w2 + boxPadX * 2
    roundRect(ctx, padX, cursorY, boxW, boxH, 4 * SCALE)
    ctx.strokeStyle = '#059669'
    ctx.lineWidth = 1 * SCALE
    ctx.stroke()

    const textY = cursorY + boxH / 2
    let tx = padX + boxPadX
    ctx.fillStyle = '#059669'
    ctx.font = `${fontPx}px ${MONO}`
    ctx.fillText(text1, tx, textY)
    tx += w1
    ctx.fillStyle = '#faf9f5'
    ctx.font = `700 ${fontPx}px ${MONO}`
    ctx.fillText(textBold, tx, textY)
    tx += wBold
    ctx.font = `${fontPx}px ${MONO}`
    ctx.fillText(text2, tx, textY)
    cursorY += boxH + 14 * SCALE
  } else {
    cursorY += fontPx * 1.5 + 6 * SCALE + 14 * SCALE
  }

  if (stage.showBanner) {
    const wordWidth = 172 * SCALE
    const rowH = drawPixelWord(ctx, 'USAMA', padX, cursorY, wordWidth, '#059669')
    cursorY += rowH + 6 * SCALE
    drawPixelWord(ctx, 'AYOUB', padX, cursorY, wordWidth, '#059669')
    cursorY += rowH + 12 * SCALE

    ctx.fillStyle = '#e8e6e3'
    ctx.font = `${fontPx}px ${MONO}`
    ctx.fillText('AI Automations & AI Systems Engineer', padX, cursorY + fontPx * 0.75)
    cursorY += fontPx * 1.5 + 2 * SCALE
    ctx.fillText('Software Engineer', padX, cursorY + fontPx * 0.75)
  }

  if (stage.showLogin) {
    const y = CANVAS_H - 22 * SCALE
    ctx.font = `${fontPx}px ${MONO}`
    let tx = padX
    ctx.fillStyle = '#faf9f5'
    ctx.fillText('\u{1F389}', tx, y)
    tx += fontPx * 1.3
    ctx.fillStyle = '#7a9ee8'
    ctx.fillText('Login successful.', tx, y)
    tx += ctx.measureText('Login successful. ').width
    ctx.fillStyle = '#faf9f5'
    ctx.fillText('Press ', tx, y)
    tx += ctx.measureText('Press ').width
    ctx.font = `700 ${fontPx}px ${MONO}`
    ctx.fillText('Enter', tx, y)
    tx += ctx.measureText('Enter').width
    ctx.font = `${fontPx}px ${MONO}`
    ctx.fillText(' to continue', tx, y)
    tx += ctx.measureText(' to continue').width

    if (stage.caretOn) {
      ctx.fillStyle = '#faf9f5'
      ctx.fillRect(tx + 4 * SCALE, y - fontPx * 0.5, 4 * SCALE, fontPx)
    }
  }

  ctx.restore()
}
