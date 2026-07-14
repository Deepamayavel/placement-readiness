const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DATE = '2026-07-14';

// 1. Update attendance.json
const attPath = path.join(ROOT, 'attendance.json');
let attendance = {};
if (fs.existsSync(attPath)) {
  const content = fs.readFileSync(attPath, 'utf8').replace(/^\uFEFF/, '');
  attendance = JSON.parse(content);
}

const students = Object.keys(attendance);

students.forEach(roll => {
  if (!attendance[roll]) attendance[roll] = {};
  attendance[roll][DATE] = 'present';
});
fs.writeFileSync(attPath, JSON.stringify(attendance, null, 2), 'utf8');

// 2. Update scoreboard.json
const scorePath = path.join(ROOT, 'scoreboard.json');
let scoreboard = {};
if (fs.existsSync(scorePath)) {
  const content = fs.readFileSync(scorePath, 'utf8').replace(/^\uFEFF/, '');
  scoreboard = JSON.parse(content);
}
students.forEach(roll => {
  if (!scoreboard[roll]) scoreboard[roll] = { total: 0, byDay: {} };
  if (!scoreboard[roll].byDay) scoreboard[roll].byDay = {};
  
  scoreboard[roll].byDay[DATE] = 100; // Give 100 points
  
  // Recalculate total
  let total = 0;
  for (const [day, score] of Object.entries(scoreboard[roll].byDay)) {
    total += score;
  }
  scoreboard[roll].total = total;
});
fs.writeFileSync(scorePath, JSON.stringify(scoreboard, null, 2), 'utf8');

// 3. Create folders and markdown files
const activitiesDir = path.join(ROOT, 'activities', DATE);
if (!fs.existsSync(activitiesDir)) fs.mkdirSync(activitiesDir, { recursive: true });

students.forEach(roll => {
  const rollDir = path.join(activitiesDir, roll);
  if (!fs.existsSync(rollDir)) fs.mkdirSync(rollDir, { recursive: true });

  const readmeContent = `# Sample Submission for ${roll}\n\nThis is an automated sample submission for testing the UI.\n\n## Features Implemented\n- ✅ Dynamic Markdown Rendering\n- ✅ Date parsing\n- ✅ Syntax highlighting\n\n\`\`\`javascript\nconsole.log("Hello from ${roll}");\n\`\`\``;
  const reflectionContent = `# Reflection for ${DATE}\n\nToday I learned how to integrate Next.js dynamic routing with local Markdown files. It was an excellent exercise!`;
  const promptsContent = `# AI Prompts Used\n\n1. **User**: How do I build a markdown viewer in Next.js?\n2. **AI**: You can use \`react-markdown\` along with Tailwind Typography!`;

  fs.writeFileSync(path.join(rollDir, 'README.md'), readmeContent, 'utf8');
  fs.writeFileSync(path.join(rollDir, 'reflection.md'), reflectionContent, 'utf8');
  fs.writeFileSync(path.join(rollDir, 'prompts.md'), promptsContent, 'utf8');
});

console.log(`Successfully generated sample data for ${students.length} students on ${DATE}.`);
