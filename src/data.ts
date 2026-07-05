export interface Project {
  title: string
  role: string
  description: string
  stack: string[]
  /** Accent used for the card artwork gradient */
  tint: string
}

/* Mock case studies drawn from real work areas. Replace descriptions with
   client-approved numbers before publishing. */
export const projects: Project[] = [
  {
    title: 'Inbound Reflex',
    role: 'AI lead response system',
    description:
      'Answers, qualifies and books new leads around the clock, faster than any human SDR could.',
    stack: ['n8n', 'Claude', 'HubSpot'],
    tint: '#059669',
  },
  {
    title: 'Pipeline Autopilot',
    role: 'GTM enrichment agent',
    description:
      'Finds, enriches and scores every lead before sales ever opens the CRM.',
    stack: ['Clay', 'Apollo', 'n8n'],
    tint: '#d4a853',
  },
  {
    title: 'Follow-Up Engine',
    role: 'CRM automation',
    description:
      'Sequences that adapt to every reply. No deal in the pipeline goes cold again.',
    stack: ['HubSpot', 'Claude', 'Node.js'],
    tint: '#34d399',
  },
  {
    title: 'AI SDR Desk',
    role: 'Outbound system',
    description:
      'Research, personalization and replies handled end to end for outbound teams.',
    stack: ['Apollo', 'Claude', 'n8n'],
    tint: '#047857',
  },
  {
    title: 'Clinic Ops Backbone',
    role: 'Healthcare backend',
    description:
      'Patient intake, records and scheduling automation built to a zero-loss standard.',
    stack: ['Node.js', 'PostgreSQL', 'Redis'],
    tint: '#e8c97a',
  },
  {
    title: 'This Very Site',
    role: 'Design and WebGL',
    description:
      'The page you are scrolling. A MacBook, a spiral and a deck of cards in WebGL.',
    stack: ['Three.js', 'GSAP', 'React'],
    tint: '#064e3b',
  },
]

export interface Skill {
  name: string
  cat: string
}

export const skills: Skill[] = [
  { name: 'n8n', cat: 'Automation' },
  { name: 'Claude', cat: 'AI agents' },
  { name: 'OpenAI', cat: 'AI agents' },
  { name: 'Clay', cat: 'GTM' },
  { name: 'Apollo', cat: 'GTM' },
  { name: 'Make', cat: 'Automation' },
  { name: 'HubSpot', cat: 'CRM' },
  { name: 'Node.js', cat: 'Backend' },
  { name: 'TypeScript', cat: 'Backend' },
  { name: 'Python', cat: 'Backend' },
  { name: 'PostgreSQL', cat: 'Backend' },
  { name: 'Docker', cat: 'Infrastructure' },
  { name: 'React', cat: 'Web' },
  { name: 'Next.js', cat: 'Web' },
  { name: 'Three.js', cat: 'Web' },
  { name: 'GSAP', cat: 'Web' },
  { name: 'Tailwind', cat: 'Web' },
  { name: 'Figma', cat: 'Design' },
]

export interface ExperienceEntry {
  years: string
  title: string
  org: string
  body: string
}

export const experience: ExperienceEntry[] = [
  {
    years: '2020 to 2024',
    title: 'Backend Systems Engineer',
    org: 'Healthcare orgs and agencies',
    body: 'Four years of production backends where a broken workflow loses patient records or client trust. Reliability was never optional.',
  },
  {
    years: '2023',
    title: 'Open Source Contributor',
    org: 'Axios',
    body: 'Shipped a fix to the HTTP library running in millions of Node apps. Systems must hold up under real traffic, not demos.',
  },
  {
    years: '2024 to 2025',
    title: 'Automation Engineer',
    org: 'Agencies',
    body: '500+ AI workflows shipped on n8n, Clay, Apollo and Claude. Learned what businesses actually buy: boring, reliable automation.',
  },
  {
    years: '2025 to now',
    title: 'AI Automation Engineer and Web Designer',
    org: 'Independent',
    body: 'GTM agents, AI SDRs and CRM automation for founders and agency owners. One system replaces a $20k a year admin hire.',
  },
]

export const email = 'usamabinayoub@gmail.com'
export const socials = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/usama-ayoub' },
  { name: 'GitHub', href: 'https://github.com/usamaayoub' },
]
