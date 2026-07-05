/** Renders a word in the chunky pixel-brick style of the Claude Code CLI
 *  banner: filled bars with a thin echo outline offset down-right. */

const GLYPHS: Record<string, string[]> = {
  U: ['X...X', 'X...X', 'X...X', 'X...X', 'XXXXX'],
  S: ['XXXXX', 'X....', 'XXXXX', '....X', 'XXXXX'],
  A: ['XXXXX', 'X...X', 'XXXXX', 'X...X', 'X...X'],
  M: ['X...X', 'XX.XX', 'X.X.X', 'X...X', 'X...X'],
  Y: ['X...X', 'X...X', 'XXXXX', '..X..', '..X..'],
  O: ['XXXXX', 'X...X', 'X...X', 'X...X', 'XXXXX'],
  B: ['XXXX.', 'X...X', 'XXXX.', 'X...X', 'XXXX.'],
}

export const LETTER_W = 5
export const LETTER_GAP = 1.4
export const BRICK_GAP = 0.18
export const ECHO = 0.5

interface Run {
  x: number
  y: number
  len: number
}

export function runsForWord(word: string): Run[] {
  const runs: Run[] = []
  ;[...word].forEach((ch, li) => {
    const glyph = GLYPHS[ch]
    if (!glyph) return
    const ox = li * (LETTER_W + LETTER_GAP)
    glyph.forEach((row, y) => {
      let x = 0
      while (x < LETTER_W) {
        if (row[x] === 'X') {
          let len = 1
          while (x + len < LETTER_W && row[x + len] === 'X') len += 1
          runs.push({ x: ox + x, y, len })
          x += len
        } else {
          x += 1
        }
      }
    })
  })
  return runs
}

interface PixelWordProps {
  word: string
  color?: string
  className?: string
}

export default function PixelWord({ word, color = '#059669', className }: PixelWordProps) {
  const runs = runsForWord(word)
  const width = word.length * (LETTER_W + LETTER_GAP) - LETTER_GAP + ECHO
  const height = 5 + ECHO
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-label={word}
      role="img"
    >
      {runs.map((r, i) => (
        <rect
          key={`e${i}`}
          x={r.x + ECHO}
          y={r.y + ECHO}
          width={r.len - BRICK_GAP}
          height={1 - BRICK_GAP}
          fill="none"
          stroke={color}
          strokeWidth={0.1}
          opacity={0.8}
        />
      ))}
      {runs.map((r, i) => (
        <rect
          key={`f${i}`}
          x={r.x}
          y={r.y}
          width={r.len - BRICK_GAP}
          height={1 - BRICK_GAP}
          fill={color}
        />
      ))}
    </svg>
  )
}
