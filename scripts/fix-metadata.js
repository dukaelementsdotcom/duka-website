const fs = require('fs');
const path = require('path');

function fixMetadataFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (!['node_modules', '.next', '.git'].includes(file)) {
        fixMetadataFiles(fullPath);
      }
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Check if file has metadata with viewport/themeColor
        if (content.includes('viewport:') || content.includes('themeColor:')) {
          console.log(`Fixing: ${fullPath}`);
          
          // Move viewport and themeColor to separate export
          content = content.replace(
            /export const metadata: Metadata = \{[\s\S]*?\};\s*/g,
            (match) => {
              // Extract viewport and themeColor
              const viewportMatch = match.match(/viewport:\s*([^,}]+)/);
              const themeColorMatch = match.match(/themeColor:\s*([^,}]+)/);
              
              // Remove them from metadata
              let newMetadata = match
                .replace(/,\s*viewport:\s*[^,}]+/, '')
                .replace(/,\s*themeColor:\s*[^,}]+/, '')
                .replace(/viewport:\s*[^,}]+,\s*/, '')
                .replace(/themeColor:\s*[^,}]+,\s*/, '');
              
              // Add viewport export if needed
              let viewportExport = '';
              if (viewportMatch || themeColorMatch) {
                viewportExport = '\n\nexport const viewport: Viewport = {\n';
                if (viewportMatch) {
                  viewportExport += `  viewport: ${viewportMatch[1]},\n`;
                }
                if (themeColorMatch) {
                  viewportExport += `  themeColor: ${themeColorMatch[1]},\n`;
                }
                viewportExport += '};\n';
                
                // Add Viewport import if not present
                if (!content.includes('import type { Viewport }')) {
                  newMetadata = newMetadata.replace(
                    'import type { Metadata }',
                    'import type { Metadata, Viewport }'
                  );
                }
              }
              
              return newMetadata + viewportExport;
            }
          );
          
          fs.writeFileSync(fullPath, content);
        }
      } catch (error) {
        console.error(`Error fixing ${fullPath}:`, error.message);
      }
    }
  });
}

// Start from app directory
const appDir = path.join(__dirname, '../app');
if (fs.existsSync(appDir)) {
  fixMetadataFiles(appDir);
  console.log('✅ Metadata fixes applied!');
} else {
  console.log('❌ app directory not found');
}