const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

async function checkPerformance() {
  console.log('📊 Checking website performance...\n');
  
  const url = 'https://www.dukainteriors.com';
  const reportsDir = path.join(__dirname, '../reports');
  
  // Create reports directory
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  try {
    console.log('1. Running Lighthouse analysis...');
    
    const { stdout } = await runCommand(
      `npx lighthouse "${url}" --output=json --output-path="${reportsDir}/lighthouse.json" --chrome-flags="--headless" --only-categories=performance`
    );
    
    if (fs.existsSync(`${reportsDir}/lighthouse.json`)) {
      const report = JSON.parse(fs.readFileSync(`${reportsDir}/lighthouse.json`, 'utf8'));
      
      console.log('\n📈 Performance Score:', Math.round(report.categories.performance.score * 100), '/ 100');
      
      // Show key metrics
      const metrics = {
        'first-contentful-paint': 'First Contentful Paint',
        'largest-contentful-paint': 'Largest Contentful Paint',
        'total-blocking-time': 'Total Blocking Time',
        'cumulative-layout-shift': 'Cumulative Layout Shift'
      };
      
      console.log('\n📊 Core Web Vitals:');
      Object.entries(metrics).forEach(([id, name]) => {
        if (report.audits[id]) {
          console.log(`  ${name}: ${report.audits[id].displayValue}`);
        }
      });
      
      console.log(`\n📁 Report saved to: ${reportsDir}/lighthouse.json`);
    }
    
  } catch (error) {
    console.log('⚠️  Could not run Lighthouse, checking basic metrics...');
  }
  
  // Check image sizes
  console.log('\n2. Checking image sizes...');
  
  const imagesDir = path.join(__dirname, '../public/images');
  if (fs.existsSync(imagesDir)) {
    const getAllFiles = (dir, files = []) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          getAllFiles(fullPath, files);
        } else if (/\.(webp|jpg|jpeg|png)$/i.test(item)) {
          files.push({ path: fullPath, size: stat.size });
        }
      }
      return files;
    };
    
    const images = getAllFiles(imagesDir);
    const totalSizeKB = images.reduce((sum, img) => sum + img.size, 0) / 1024;
    
    console.log(`   Total images: ${images.length}`);
    console.log(`   Total size: ${totalSizeKB.toFixed(1)}KB`);
    
    // Find large images
    const largeImages = images.filter(img => img.size > 200 * 1024); // > 200KB
    if (largeImages.length > 0) {
      console.log(`   ⚠️  Large images (>200KB): ${largeImages.length}`);
      largeImages.slice(0, 3).forEach(img => {
        const relativePath = path.relative(imagesDir, img.path);
        console.log(`      - ${relativePath}: ${(img.size / 1024).toFixed(1)}KB`);
      });
    }
  }
  
  console.log('\n🎉 Performance check complete!');
  console.log('\n💡 Quick tips:');
  console.log('• Run: npm run compress:images (to optimize WebP files)');
  console.log('• Ensure Next.js Image component is used properly');
  console.log('• Check browser caching is working');
}

checkPerformance().catch(console.error);