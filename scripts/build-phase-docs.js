#!/usr/bin/env node
/**
 * Build phase docs from .cursor/skills/ source of truth.
 * Reads SKILL.md files, extracts content and flowcharts, outputs docs/assets/phase-data.js.
 * Run: node scripts/build-phase-docs.js
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(REPO_ROOT, '.cursor', 'skills');
const OUTPUT_PATH = path.join(REPO_ROOT, 'docs', 'assets', 'phase-data.js');
const REPO_BASE = 'https://github.com/ivanyeors/product-agentic-templates/blob/main';

// Phase manifest: id -> { num, name, desc, expect } (fallbacks when skill missing)
const PHASE_MANIFEST = [
  { id: '00-product-workflow', num: '00', name: 'Product Workflow', desc: 'Master orchestrator for the full lifecycle with HITL gates.', expect: 'Coordinates all phases in sequence. Pauses at every gate for human approval.' },
  { id: '01-product-discovery', num: '01', name: 'Product Discovery', desc: 'Research, personas, PRD.', expect: 'Stakeholder interviews, user research, competitive analysis, problem statement, persona creation, journey mapping, PRD writing.' },
  { id: '02-product-design', num: '02', name: 'Product Design', desc: 'IA, flows, wireframes.', expect: 'Information architecture, user flow design, wireframing, prototype specification, usability testing design, accessibility planning.' },
  { id: '03-frontend-design', num: '03', name: 'Frontend Design', desc: 'Design system, components.', expect: 'Design tokens, atomic component hierarchy, visual design, responsive breakpoints, Figma handoff. Runs parallel with Backend Design.' },
  { id: '04-backend-design', num: '04', name: 'Backend Design', desc: 'API contract, schema, auth.', expect: 'OpenAPI spec, database schema, auth model, integration points. Runs parallel with Frontend Design.' },
  { id: '05-frontend-development', num: '05', name: 'Frontend Development', desc: 'UI implementation.', expect: 'Tech stack, architecture, component development, state management, performance, accessibility. Runs parallel with Backend Implementation.' },
  { id: '06-backend-implementation', num: '06', name: 'Backend Implementation', desc: 'API endpoints, migrations.', expect: 'Project setup, schema migrations, data access, service layer, API endpoints, auth, validation, testing.' },
  { id: '07-integration', num: '07', name: 'Integration', desc: 'Frontend-backend, third-party.', expect: 'API consumption, contract validation, third-party integration (auth, payments, webhooks). Requires both Gate 5 and Gate 6.' },
  { id: '08-qa-testing', num: '08', name: 'QA Testing', desc: 'Test strategy, execution.', expect: 'Unit/integration/E2E testing, visual regression, accessibility audits, performance testing, security review.' },
  { id: '09-deployment', num: '09', name: 'Deployment', desc: 'CI/CD, launch, monitoring.', expect: 'CI/CD pipelines, environment config, infrastructure-as-code, observability, rollback runbooks, release management.' },
  { id: '10-human-intervention', num: '10', name: 'Human Intervention', desc: 'Mid-phase feedback, corrections.', expect: 'Cross-cutting. Structured capture of feedback, scope changes, corrections. Active throughout the workflow.' },
  { id: '11-documentation', num: '11', name: 'Documentation', desc: 'User guides, knowledge transfer.', expect: 'User documentation, technical docs, operations docs, knowledge transfer package. Post-launch.' },
  { id: '12-product-documentation', num: '12', name: 'Product Documentation', desc: 'Documentation hub, handover.', expect: 'Consolidation of all PDLC artifacts into a Product Documentation Hub.' },
];

// Fallback flowcharts (from original phase-data.js) when skill has no mermaid
const FALLBACK_FLOWCHARTS = {
  '00-product-workflow': `flowchart TD
    start([Product Idea]) --> p1[01 Discovery]
    p1 --> g1{Gate 1}
    g1 -->|APPROVED| p2[02 Design]
    g1 -->|REVISE| p1
    p2 --> g2{Gate 2}
    g2 -->|APPROVED| p3[03 Frontend Design]
    g2 -->|APPROVED| p4[04 Backend Design]
    p3 --> g3{Gate 3}
    p4 --> g4{Gate 4}
    g3 --> p5[05 Frontend Dev]
    g4 --> p6[06 Backend Impl]
    p5 --> g5{Gate 5}
    p6 --> g6{Gate 6}
    g5 --> p7[07 Integration]
    g6 --> p7
    p7 --> g7{Gate 7}
    g7 --> p8[08 QA]
    p8 --> g8{Gate 8}
    g8 --> p9[09 Deployment]
    p9 --> g9{Gate 9}
    g9 --> p11[11 Documentation]
    p11 --> g10{Gate 10}
    g10 --> done([DOCUMENTED])

    click p1 "phase.html?phase=01-product-discovery" "01 Product Discovery"
    click p2 "phase.html?phase=02-product-design" "02 Product Design"
    click p3 "phase.html?phase=03-frontend-design" "03 Frontend Design"
    click p4 "phase.html?phase=04-backend-design" "04 Backend Design"
    click p5 "phase.html?phase=05-frontend-development" "05 Frontend Development"
    click p6 "phase.html?phase=06-backend-implementation" "06 Backend Implementation"
    click p7 "phase.html?phase=07-integration" "07 Integration"
    click p8 "phase.html?phase=08-qa-testing" "08 QA Testing"
    click p9 "phase.html?phase=09-deployment" "09 Deployment"
    click p11 "phase.html?phase=11-documentation" "11 Documentation"`,
  '01-product-discovery': `flowchart TD
    start([Product Idea]) --> p1[01 Product Discovery]
    p1 --> g1{Gate 1}
    g1 -->|APPROVED| p2[02 Product Design]
    g1 -->|REVISE| p1

    click p1 "phase.html?phase=01-product-discovery" "01 Product Discovery"
    click p2 "phase.html?phase=02-product-design" "02 Product Design"`,
  '02-product-design': `flowchart TD
    p1[01 Discovery] --> p2[02 Product Design]
    p2 --> g2{Gate 2}
    g2 -->|APPROVED| rmCheck{Release Mode}
    g2 -->|REVISE| p2
    rmCheck -->|FULL| p3[03 Frontend Design]
    rmCheck -->|FULL| p4[04 Backend Design]
    rmCheck -->|MVP| mvp[MVP Scoping]
    mvp --> p3
    mvp --> p4

    click p1 "phase.html?phase=01-product-discovery" "01 Product Discovery"
    click p2 "phase.html?phase=02-product-design" "02 Product Design"
    click p3 "phase.html?phase=03-frontend-design" "03 Frontend Design"
    click p4 "phase.html?phase=04-backend-design" "04 Backend Design"`,
  '03-frontend-design': `flowchart TD
    g2[Gate 2] --> p3[03 Frontend Design]
    p3 --> g3{Gate 3}
    g3 -->|APPROVED| p5[05 Frontend Development]
    g3 -->|REVISE| p3

    click p3 "phase.html?phase=03-frontend-design" "03 Frontend Design"
    click p5 "phase.html?phase=05-frontend-development" "05 Frontend Development"`,
  '04-backend-design': `flowchart TD
    g2[Gate 2] --> p4[04 Backend Design]
    p4 --> g4{Gate 4}
    g4 -->|APPROVED| p6[06 Backend Implementation]
    g4 -->|REVISE| p4

    click p4 "phase.html?phase=04-backend-design" "04 Backend Design"
    click p6 "phase.html?phase=06-backend-implementation" "06 Backend Implementation"`,
  '05-frontend-development': `flowchart TD
    p3[03 Frontend Design] --> p5[05 Frontend Development]
    p5 --> g5{Gate 5}
    g5 -->|APPROVED| p7[07 Integration]
    g5 -->|REVISE| p5

    click p3 "phase.html?phase=03-frontend-design" "03 Frontend Design"
    click p5 "phase.html?phase=05-frontend-development" "05 Frontend Development"
    click p7 "phase.html?phase=07-integration" "07 Integration"`,
  '06-backend-implementation': `flowchart TD
    p4[04 Backend Design] --> p6[06 Backend Implementation]
    p6 --> g6{Gate 6}
    g6 -->|APPROVED| p7[07 Integration]
    g6 -->|REVISE| p6

    click p4 "phase.html?phase=04-backend-design" "04 Backend Design"
    click p6 "phase.html?phase=06-backend-implementation" "06 Backend Implementation"
    click p7 "phase.html?phase=07-integration" "07 Integration"`,
  '07-integration': `flowchart TD
    p5[05 Frontend Dev] --> p7[07 Integration]
    p6[06 Backend Impl] --> p7
    p7 --> g7{Gate 7}
    g7 -->|APPROVED| p8[08 QA Testing]
    g7 -->|REVISE| p7

    click p5 "phase.html?phase=05-frontend-development" "05 Frontend Development"
    click p6 "phase.html?phase=06-backend-implementation" "06 Backend Implementation"
    click p7 "phase.html?phase=07-integration" "07 Integration"
    click p8 "phase.html?phase=08-qa-testing" "08 QA Testing"`,
  '08-qa-testing': `flowchart TD
    p7[07 Integration] --> p8[08 QA Testing]
    p8 --> g8{Gate 8}
    g8 -->|APPROVED| p9[09 Deployment]
    g8 -->|REVISE| p8

    click p7 "phase.html?phase=07-integration" "07 Integration"
    click p8 "phase.html?phase=08-qa-testing" "08 QA Testing"
    click p9 "phase.html?phase=09-deployment" "09 Deployment"`,
  '09-deployment': `flowchart TD
    p8[08 QA] --> p9[09 Deployment]
    p9 --> g9{Gate 9}
    g9 -->|SIGNED OFF| evolve{Evolution?}
    g9 -->|ROLLBACK| p9
    evolve -->|EVOLVE| debt[Technical Debt Audit]
    evolve -->|STAY| p11[11 Documentation]
    debt --> p3[03 Frontend Design]

    click p8 "phase.html?phase=08-qa-testing" "08 QA Testing"
    click p9 "phase.html?phase=09-deployment" "09 Deployment"
    click p11 "phase.html?phase=11-documentation" "11 Documentation"
    click debt "phase.html?phase=03-frontend-design" "03 Frontend Design"`,
  '10-human-intervention': `flowchart TD
    gate[Present gate to human] --> response{Human response?}
    response -->|APPROVED| done([Proceed to next phase])
    response -->|PAUSE| pause([Save state and wait])
    response -->|REVISE| count{Revision cycle?}
    count -->|1 or 2| revise[Revise and re-validate]
    revise --> gate
    count -->|3| escalate[Escalate to human]`,
  '11-documentation': `flowchart TD
    p9[09 Deployment] --> p11[11 Documentation]
    p11 --> g10{Gate 10}
    g10 -->|APPROVED| done([DOCUMENTED])
    g10 -->|REVISE| p11

    click p9 "phase.html?phase=09-deployment" "09 Deployment"
    click p11 "phase.html?phase=11-documentation" "11 Documentation"`,
  '12-product-documentation': `flowchart TD
    p11[11 Documentation] --> p12[12 Product Documentation Hub]
    p12 --> consolidate[Consolidate all PDLC artifacts]
    consolidate --> hub[Documentation Hub]
    hub --> done([Handover complete])

    click p11 "phase.html?phase=11-documentation" "11 Documentation"
    click p12 "phase.html?phase=12-product-documentation" "12 Product Documentation"`,
};

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { frontmatter: {}, body: content };
  const frontmatter = {};
  const yaml = match[1];
  for (const line of yaml.split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) frontmatter[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return { frontmatter, body: content.slice(match[0].length) };
}

function extractMermaidFlowchart(body) {
  const re = /```mermaid\r?\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    if (m[1].includes('flowchart')) return m[1].trim();
  }
  return null;
}

function stripTitle(body) {
  return body.replace(/^#\s+[\d\s—\-]+\s*[^\n]+\n+/i, '').trim();
}

function rewriteLinks(content, phaseId) {
  const skillDir = `.cursor/skills/${phaseId}`;
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    if (href.startsWith('http') || href.startsWith('#')) return `[${text}](${href})`;
    const resolved = href.startsWith('../')
      ? path.normalize(path.join('.cursor/skills', phaseId, href)).replace(/\\/g, '/')
      : `${skillDir}/${href}`;
    const url = `${REPO_BASE}/${resolved}`;
    return `[${text}](${url})`;
  });
}

function buildPhase(manifest, fallbackFlowchart) {
  const skillPath = path.join(SKILLS_DIR, manifest.id, 'SKILL.md');
  const phase = {
    id: manifest.id,
    num: manifest.num,
    name: manifest.name,
    desc: manifest.desc,
    expect: manifest.expect,
    content: null,
  };

  if (!fs.existsSync(skillPath)) {
    return { phase, flowchart: fallbackFlowchart };
  }

  const raw = fs.readFileSync(skillPath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(raw);
  const flowchart = extractMermaidFlowchart(body) || fallbackFlowchart;
  let content = stripTitle(body);
  content = rewriteLinks(content, manifest.id);

  if (frontmatter.description) phase.desc = frontmatter.description;

  phase.content = content;
  return { phase, flowchart };
}

function escapeJsString(str) {
  if (str == null) return 'null';
  return JSON.stringify(str);
}

function main() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error('Error: .cursor/skills/ not found');
    process.exit(1);
  }

  const phases = [];
  const flowcharts = {};

  for (const manifest of PHASE_MANIFEST) {
    const fallback = FALLBACK_FLOWCHARTS[manifest.id];
    const { phase, flowchart } = buildPhase(manifest, fallback);
    phases.push(phase);
    flowcharts[phase.id] = flowchart;
  }

  const phasesJs = phases
    .map(
      (p) =>
        `    { id: ${escapeJsString(p.id)}, num: ${escapeJsString(p.num)}, name: ${escapeJsString(p.name)}, desc: ${escapeJsString(p.desc)}, expect: ${escapeJsString(p.expect)}, content: ${escapeJsString(p.content)} }`
    )
    .join(',\n');

  const flowchartsJs = Object.entries(flowcharts)
    .map(([id, code]) => `    ${escapeJsString(id)}: ${escapeJsString(code)}`)
    .join(',\n');

  const output = `/* Phase data generated from .cursor/skills/ — do not edit manually. Run: node scripts/build-phase-docs.js */
window.PHASE_DATA = {
  PHASES: [
${phasesJs}
  ],
  PHASE_FLOWCHARTS: {
${flowchartsJs}
  },
};
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`Generated ${OUTPUT_PATH}`);
}

main();
