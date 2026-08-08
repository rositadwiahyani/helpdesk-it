const fs = require('fs');
const path = require('path');

const pages = [
    'tickets/page.tsx',
    'tickets-processing/page.tsx',
    'tickets-rejected/page.tsx',
    'tickets-resolved/page.tsx'
];

pages.forEach(p => {
    const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'operator', p);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace(/className="mb-8 flex items-center justify-between"/g, 'className="mb-14 flex items-center justify-between"');
        fs.writeFileSync(filePath, content, 'utf-8');
    }
});
console.log('Update pages success');
