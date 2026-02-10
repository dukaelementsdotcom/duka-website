const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressWebPImages() {
  console.log('🔧 Compressing WebP images for better performance...\n');
  
  const imagesDir = path.join(__dirname, '../public/images');
  
  if (!fs.existsSync(imagesDir)) {
    console.log('⚠️  Images directory not found:', imagesDir);
    return;
  }
  
  // Find all WebP files
  const findWebPFiles = (dir, files = []) => {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findWebPFiles(fullPath, files);
      } else if (item.toLowerCase().endsWith('.webp')) {
        files.push(fullPath);
      }
    }
    return files;
  };
  
  const webpFiles = findWebPFiles(imagesDir);
  
  if (webpFiles.length === 0) {
    console.log('✅ No WebP files found to compress');
    return;
  }
  
  console.log(`📊 Found ${webpFiles.length} WebP files\n`);
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let compressedCount = 0;
  
  for (const filePath of webpFiles) {
    try {
      const originalSize = fs.statSync(filePath).size;
      const relativePath = path.relative(imagesDir, filePath);
      
      console.log(`⏳ Compressing: ${relativePath} (${(originalSize / 1024).toFixed(1)}KB)`);
      
      // Create backup
      const backupPath = filePath + '.bak';
      fs.copyFileSync(filePath, backupPath);
      
      // Compress WebP with optimal settings
      await sharp(filePath)
        .webp({ 
          quality: 70,           // Reduced from default 75
          effort: 6,            // Maximum compression
          smartSubsample: true  // Better quality/size ratio
        })
        .toFile(filePath);      // Overwrite original
      
      const compressedSize = fs.statSync(filePath).size;
      const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      // Remove backup if compression was successful
      if (compressedSize < originalSize) {
        fs.unlinkSync(backupPath);
        compressedCount++;
      } else {
        // Restore original if compression didn't reduce size
        fs.copyFileSync(backupPath, filePath);
        fs.unlinkSync(backupPath);
        console.log(`⏭️  No compression needed: ${relativePath}`);
        continue;
      }
      
      totalOriginalSize += originalSize;
      totalCompressedSize += compressedSize;
      
      console.log(`✅ Compressed to: ${(compressedSize / 1024).toFixed(1)}KB (${savings}% saved)`);
      
    } catch (error) {
      console.error(`❌ Error compressing ${filePath}:`, error.message);
    }
  }
  
  console.log('\n📊 Compression Summary:');
  console.log(`✅ Compressed: ${compressedCount}/${webpFiles.length} files`);
  console.log(`📦 Original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📦 After: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💰 Saved: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)}MB`);
  
  if (compressedCount > 0) {
    console.log('\n💡 Next steps:');
    console.log('1. Run: npm run build');
    console.log('2. Test your site performance');
    console.log('3. Check if images still look good');
  }
}

// Run the compression
compressWebPImages().catch(console.error);