/**
 * Backup and Clean Database Script
 * 
 * This script:
 * 1. Backs up all data to a JSON file
 * 2. Cleans the database
 * 
 * Usage: node scripts/backup-and-clean.js
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function backupAndClean() {
  try {
    console.log('🔄 Connecting to MongoDB...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to database\n');
    
    // Fetch all data
    const teams = await mongoose.connection.db.collection('teams').find().toArray();
    const unassigneds = await mongoose.connection.db.collection('unassigneds').find().toArray();
    
    console.log('📊 Current Data:');
    console.log(`   - Teams: ${teams.length} documents`);
    console.log(`   - Unassigned: ${unassigneds.length} documents\n`);
    
    if (teams.length === 0 && unassigneds.length === 0) {
      console.log('ℹ️  Database is already empty. Nothing to backup or delete.\n');
      await mongoose.connection.close();
      process.exit(0);
    }
    
    // Create backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, '../backups');
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backupFile = path.join(backupDir, `backup-${timestamp}.json`);
    const backupData = {
      backupDate: new Date().toISOString(),
      teams,
      unassigneds,
      stats: {
        teamsCount: teams.length,
        unassignedCount: unassigneds.length
      }
    };
    
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log('💾 Backup created:');
    console.log(`   ${backupFile}\n`);
    
    // Delete all documents
    console.log('🗑️  Cleaning database...\n');
    
    const teamsResult = await mongoose.connection.db.collection('teams').deleteMany({});
    const unassignedResult = await mongoose.connection.db.collection('unassigneds').deleteMany({});
    
    console.log('✅ Cleanup Complete:');
    console.log(`   - Teams deleted: ${teamsResult.deletedCount}`);
    console.log(`   - Unassigned deleted: ${unassignedResult.deletedCount}\n`);
    
    console.log('🎉 Database is now clean and ready for new registrations!\n');
    console.log('📁 Backup saved for future reference.');
    
    await mongoose.connection.close();
    console.log('\n👋 Connection closed.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the backup and cleanup
backupAndClean();
