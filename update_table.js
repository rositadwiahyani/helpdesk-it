const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'admin', 'tickets', 'OperatorTicketTable.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Search Bar
content = content.replace(
    /className="pl-9 pr-4 py-2 text-sm border border-\[#C3C6D1\] rounded focus:outline-none focus:border-\[#0059BB\] w-full md:w-64"/g,
    'className="pl-10 pr-4 py-2 text-[13.5px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full md:w-72 transition-shadow"'
);
content = content.replace(
    /className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"/g,
    'className="w-[18px] h-[18px] absolute left-3.5 top-2 text-slate-400"'
);
content = content.replace(/h-6 bg-gray-300/g, 'h-5 bg-slate-200');

// 2. Toolbar buttons (Category, Advanced, Reset)
content = content.replace(
    /className={`flex h-\[34px\] px-3 items-center gap-2 rounded border border-\[#C3C6D1\] bg-\[#FFF\] cursor-pointer transition-colors \${showCategoryPopup \|\| selectedCategory \? 'bg-slate-100' : 'hover:bg-gray-50'}`}/g,
    'className={`flex h-9 px-3.5 items-center gap-2 rounded-lg border border-slate-200 bg-white cursor-pointer transition-colors ${showCategoryPopup || selectedCategory ? "bg-slate-50 border-slate-300" : "hover:bg-slate-50"}`}'
);
content = content.replace(/text-\[#43474F\] font-iBMPlexSans text-xs font-semibold leading-4 max-w-\[120px\] truncate/g, 'text-slate-600 text-[13px] font-medium leading-4 max-w-[120px] truncate');
content = content.replace(/text-\[#43474F\] font-iBMPlexSans text-xs font-semibold leading-4/g, 'text-slate-600 text-[13px] font-medium leading-4');

content = content.replace(
    /className={`flex h-\[34px\] px-3 items-center gap-2 rounded border border-\[#C3C6D1\] bg-\[#FFF\] cursor-pointer transition-colors \${showAdvanced \? 'bg-slate-100' : 'hover:bg-gray-50'}`}/g,
    'className={`flex h-9 px-3.5 items-center gap-2 rounded-lg border border-slate-200 bg-white cursor-pointer transition-colors ${showAdvanced ? "bg-slate-50 border-slate-300" : "hover:bg-slate-50"}`}'
);
content = content.replace(
    /fill="#43474F"/g,
    'fill="currentColor" className="text-slate-500"'
);

content = content.replace(
    /className="h-\[34px\] px-3 bg-white text-gray-600 border border-\[#C3C6D1\] text-\[13px\] font-semibold rounded hover:bg-gray-50 hover:text-gray-900 transition-colors"/g,
    'className="h-9 px-4 bg-white text-slate-600 border border-slate-200 text-[13px] font-medium rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"'
);

// 3. Ticket count badge
content = content.replace(
    /<div className="ml-2 pl-2 border-l border-gray-300">\s*<span className="flex h-\[34px\] items-center px-2 text-xs font-bold text-blue-600 bg-blue-50 rounded">\s*\{processedTickets.length\} tickets\s*<\/span>\s*<\/div>/g,
    `<div className="ml-2">
        <span className="flex items-center px-2.5 py-1 text-[11.5px] font-semibold text-blue-700 bg-blue-50 border border-blue-100/50 rounded-full">
            {processedTickets.length} tickets
        </span>
    </div>`
);

// 4. Bulk action buttons
content = content.replace(
    /className="py-\[7.5px\] px-3 border border-\[#C3C6D1\] rounded text-\[13px\] font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-200 transition-colors disabled:opacity-50"/g,
    'className="h-9 px-3.5 border border-red-200 rounded-lg text-[13px] font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"'
);
content = content.replace(
    /className=\{`py-\[7.5px\] px-3 border border-\[#C3C6D1\] rounded text-\[13px\] font-semibold transition-colors disabled:opacity-50 \${/g,
    'className={`h-9 px-3.5 border rounded-lg text-[13px] font-medium transition-colors disabled:opacity-50 ${'
);
content = content.replace(/text-orange-600 bg-orange-50 hover:bg-orange-100 hover:border-orange-200/g, 'border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100');
content = content.replace(/text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-200/g, 'border-red-200 text-red-600 bg-red-50 hover:bg-red-100');


// 5. Table Container & Headers
content = content.replace(
    /className="flex flex-col rounded-lg border border-\[#C3C6D1\] bg-\[#FFF\] shadow-sm w-full overflow-hidden"/g,
    'className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm w-full overflow-hidden"'
);
content = content.replace(
    /className="bg-\[#F3F3F6\] border-b border-\[#C3C6D1\]"/g,
    'className="bg-[#FAFAFA] border-b border-slate-200"'
);
content = content.replace(/px-4 py-4/g, 'px-5 py-[14px]');
content = content.replace(/text-\[#43474F\] font-iBMPlexSans text-xs font-semibold tracking-wider/g, 'text-slate-500 text-[11.5px] font-semibold tracking-wider');

// 6. Checkbox size
content = content.replace(
    /className="rounded border-gray-300 w-4 h-4 text-\[#0059BB\] focus:ring-\[#0059BB\] cursor-pointer"/g,
    'className="rounded border-slate-300 w-[15px] h-[15px] text-blue-600 focus:ring-blue-500 cursor-pointer"'
);

// 7. Table Rows
content = content.replace(
    /divide-y divide-\[#C3C6D1\]/g,
    'divide-y divide-slate-100'
);
content = content.replace(
    /className={`hover:bg-slate-50 transition-colors \${index % 2 === 1 \? 'bg-\[#F9F9FC\]' : ''}`}/g,
    'className={`hover:bg-slate-50/80 transition-colors group ${index % 2 === 1 ? "bg-[#FCFCFD]" : "bg-white"}`}'
);

// Fonts and texts
content = content.replace(/text-\[#0059BB\] font-liberationSerif text-sm font-semibold/g, 'text-slate-800 font-mono text-[13px] font-medium');
content = content.replace(/text-\[#43474F\] font-iBMPlexSans text-sm/g, 'text-slate-500 text-[13px]');
content = content.replace(/text-\[#1A1C1E\] font-iBMPlexSans text-sm font-medium/g, 'text-slate-800 text-[13.5px] font-medium');
content = content.replace(/text-\[#1A1C1E\] font-iBMPlexSans text-sm truncate/g, 'text-slate-600 text-[13px] truncate');
content = content.replace(/text-\[#43474F\] font-iBMPlexSans text-\[13px\] font-medium truncate/g, 'text-slate-700 text-[13px] font-medium truncate');
content = content.replace(/text-\[#43474F\] font-iBMPlexSans text-\[12px\]/g, 'text-slate-600 text-[12.5px]');


// 8. Dropdowns
content = content.replace(
    /className="w-full bg-white border border-\[#C3C6D1\] rounded pl-3 pr-8 py-1\.5 text-xs text-slate-700 focus:border-\[#0059BB\] focus:ring-1 focus:ring-\[#0059BB\] outline-none cursor-pointer appearance-none hover:border-slate-300 transition-colors"/g,
    'className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-[7px] text-[12.5px] text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer appearance-none hover:border-slate-300 transition-colors"'
);
content = content.replace(/value=\{ticket\.category_id \|\| ''\}/g, 'value={ticket.category_id ? String(ticket.category_id) : ""}');
content = content.replace(/<option key=\{c\.id\} value=\{c\.id\}>/g, '<option key={c.id} value={String(c.id)}>');
content = content.replace(/value=\{ticket\.dept_id \|\| ''\}/g, 'value={ticket.dept_id ? String(ticket.dept_id) : ""}');
content = content.replace(/<option key=\{dept\.id\} value=\{dept\.id\}>/g, '<option key={dept.id} value={String(dept.id)}>');
// priority string match
content = content.replace(/value=\{ticket\.priority\?\.toLowerCase\(\) \|\| ''\}/g, 'value={ticket.priority?.toLowerCase() || ""}');

// 9. Action Buttons
content = content.replace(
    /className="py-1\.5 px-4 bg-white border border-\[#0059BB\] rounded text-xs font-semibold text-\[#0059BB\] hover:bg-\[#D5E3FF\] transition-colors"/g,
    'className="py-1.5 px-3.5 bg-blue-600 border border-transparent rounded-lg text-[12.5px] font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"'
);
content = content.replace(
    /className="py-1\.5 px-4 bg-white border border-\[#93000A\] rounded text-xs font-semibold text-\[#93000A\] hover:bg-\[#FFDAD6\] transition-colors"/g,
    'className="py-1.5 px-3.5 bg-white border border-red-200 rounded-lg text-[12.5px] font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"'
);

// 10. Fix Priority badge
content = content.replace(/text-\[11px\] font-bold leading-5 w-fit tracking-\[0\.025em\]/g, 'text-[10px] font-bold uppercase tracking-wider leading-none');
content = content.replace(/className={`flex py-0\.5 px-2/g, 'className={`flex py-1 px-2');


fs.writeFileSync(filePath, content, 'utf-8');
console.log('Update success');
