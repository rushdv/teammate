# Database Management Scripts

This folder contains utility scripts for managing the TeamMate database.

## 🧹 Available Scripts

### 1. Clean Database (Without Backup)

Deletes all data from the database instantly.

```bash
npm run db:clean
```

**Use case:** When you want to quickly reset the database for new registrations.

---

### 2. Backup and Clean Database

Creates a backup of all data before cleaning the database.

```bash
npm run db:backup-clean
```

**Use case:** When you want to keep a record of old registrations before resetting.

**Backup location:** `backups/backup-[timestamp].json`

---

## 📋 What Gets Deleted

Both scripts delete all documents from:
- ✅ `teams` collection (all team registrations)
- ✅ `unassigneds` collection (all individual registrations)

**Note:** Collections and database structure remain intact. Only documents are deleted.

---

## 💾 Backup File Format

The backup file contains:

```json
{
  "backupDate": "2026-06-30T12:00:00.000Z",
  "teams": [...],
  "unassigneds": [...],
  "stats": {
    "teamsCount": 18,
    "unassignedCount": 2
  }
}
```

---

## ⚠️ Important Notes

1. **No Undo:** Once deleted (without backup), data cannot be recovered
2. **Production Warning:** Be careful when running these on production databases
3. **Backup First:** Use `db:backup-clean` for safer cleanup
4. **Environment:** Scripts read `MONGODB_URI` from `.env.local`

---

## 🔧 Manual Execution

You can also run the scripts directly:

```bash
# Clean only
node scripts/clean-database.js

# Backup and clean
node scripts/backup-and-clean.js
```

---

## 📁 Directory Structure

```
scripts/
├── README.md              # This file
├── clean-database.js      # Simple cleanup script
└── backup-and-clean.js    # Backup + cleanup script

backups/                   # Created automatically
└── backup-[timestamp].json
```

---

## 🆘 Troubleshooting

### Error: MONGODB_URI not found
- Make sure `.env.local` file exists in the project root
- Check that `MONGODB_URI` is properly set in `.env.local`

### Connection timeout
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Check if your IP is whitelisted in MongoDB Atlas

### Permission denied
- Make sure you have write permissions in the project folder
- Check if the scripts have executable permissions

---

## 📞 Need Help?

If you encounter any issues, check:
1. MongoDB Atlas connection status
2. `.env.local` configuration
3. Internet connectivity
4. MongoDB Atlas IP whitelist settings
