import PixelWord from './PixelWord'

/** The terminal rendered on the MacBook screen. Layout and copy mirror the
 *  Claude Code welcome screen, with the banner reading USAMA AYOUB. Sized to
 *  the 334x216 screen plane of the mac-draco model. */
export default function Cli() {
  return (
    <div
      className="flex h-[216px] w-[334px] flex-col overflow-hidden rounded-[3px] bg-[#262624] px-3 pb-2 pt-2 font-mono"
      style={{ fontSize: 7.5, lineHeight: 1.5 }}
    >
      <div className="mb-2 flex gap-[5px]" aria-hidden>
        <span className="h-[6px] w-[6px] rounded-full bg-[#f16a5d]" />
        <span className="h-[6px] w-[6px] rounded-full bg-[#f5bf4f]" />
        <span className="h-[6px] w-[6px] rounded-full bg-[#58c33f]" />
      </div>

      <div className="cli-stage-1 mb-3 w-fit rounded-[4px] border border-[#059669] px-2 py-[3px] text-[#faf9f5]">
        <span className="mr-1 text-[#059669]">✻</span> Welcome to the{' '}
        <b>Usama Ayoub!</b> research preview!
      </div>

      <div className="cli-stage-2">
        <PixelWord word="USAMA" className="mb-[6px] w-[172px]" />
        <PixelWord word="AYOUB" className="w-[172px]" />
        <br />
        <p>AI Automations & AI Systems Engineer</p>
        <p>Software Engineer </p>
      </div>

      <div className="cli-stage-3 mt-auto text-[#b3c8f0]">
        <span className="mr-1">🎉</span>
        <span className="text-[#7a9ee8]">Login successful.</span>{' '}
        <span className="text-[#faf9f5]">
          Press <b>Enter</b> to continue
        </span>
        <span className="cli-caret ml-[2px] inline-block h-[8px] w-[4px] translate-y-[1px] bg-[#faf9f5]" />
      </div>
    </div>
  )
}
