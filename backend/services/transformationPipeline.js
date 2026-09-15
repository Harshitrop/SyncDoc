import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export class ASTTransformationPipeline {
  // Sanitize raw text or HTML payload against dirty XSS injection fragments (Week 4 Requirement)
  static sanitizePayload(rawContent) {
    const cleanContent = DOMPurify.sanitize(rawContent, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'code', 'pre', 'p', 'h1', 'h2', 'h3', 'ul', 'li', 'table', 'tr', 'td', 'th', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'class', 'style']
    });
    const containsXSS = rawContent !== cleanContent;
    return { cleanContent, containsXSS, original: rawContent };
  }

  // Compile AST Document Tree into clean HTML structure (Week 3 Requirement)
  static compileASTToHTML(documentAST) {
    let htmlOutput = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${documentAST.title}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #0f172a; font-size: 28px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    h2 { color: #1e293b; font-size: 22px; margin-top: 24px; }
    p { font-size: 15px; color: #334155; }
    pre { background: #0f172a; color: #38bdf8; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; }
    .callout { background: #f0fdf4; border-left: 4px solid #10b981; padding: 14px; border-radius: 6px; margin: 16px 0; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 13px; }
    th { background: #f8fafc; font-weight: bold; }
  </style>
</head>
<body>
`;

    documentAST.nodes.forEach(node => {
      const { cleanContent } = this.sanitizePayload(node.content || '');

      switch (node.type) {
        case 'heading':
          const level = node.level || 1;
          htmlOutput += `<h${level}>${cleanContent}</h${level}>\n`;
          break;
        case 'code':
          htmlOutput += `<pre><code>${cleanContent}</code></pre>\n`;
          break;
        case 'callout':
          htmlOutput += `<div class="callout">${cleanContent}</div>\n`;
          break;
        case 'table':
          if (node.tableData && node.tableData.length > 0) {
            htmlOutput += `<table>\n<thead>\n<tr>`;
            node.tableData[0].forEach(header => {
              htmlOutput += `<th>${DOMPurify.sanitize(header)}</th>`;
            });
            htmlOutput += `</tr>\n</thead>\n<tbody>\n`;
            node.tableData.slice(1).forEach(row => {
              htmlOutput += `<tr>`;
              row.forEach(cell => {
                htmlOutput += `<td>${DOMPurify.sanitize(cell)}</td>`;
              });
              htmlOutput += `</tr>\n`;
            });
            htmlOutput += `</tbody>\n</table>\n`;
          }
          break;
        case 'paragraph':
        default:
          htmlOutput += `<p>${cleanContent}</p>\n`;
          break;
      }
    });

    htmlOutput += `</body>\n</html>`;
    return htmlOutput;
  }
}
