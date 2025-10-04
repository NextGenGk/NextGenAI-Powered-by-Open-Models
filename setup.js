const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Setting up NextGenAI with Clerk v5...');

try {
  // Clean install
  console.log('🧹 Cleaning previous installation...');
  try {
    execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });
  } catch (e) {
    // Windows fallback
    try {
      execSync('rmdir /s /q node_modules', { stdio: 'inherit' });
      execSync('del package-lock.json', { stdio: 'inherit' });
    } catch (e2) {
      console.log('Clean step skipped (files may not exist)');
    }
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

  // Generate Prisma client
  console.log('🗄️ Setting up database...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma db push', { stdio: 'inherit' });

  console.log('✅ Setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Create a Clerk account at https://clerk.com');
  console.log('2. Create a new Clerk application');
  console.log('3. Update your .env file with Clerk keys:');
  console.log('   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
  console.log('   - CLERK_SECRET_KEY');
  console.log('4. Make sure your LLM server is running on http://localhost:12434');
  console.log('5. Run: npm run dev');
  console.log('6. Visit: http://localhost:3000');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\n🔧 Try manual installation:');
  console.log('npm install --legacy-peer-deps');
  process.exit(1);
}