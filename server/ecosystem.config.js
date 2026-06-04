// PM2 Process Manager Configuration
// Run: pm2 start ecosystem.config.js
// Docs: https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: 'royalspice-api',          // Name used in: pm2 status / pm2 reload royalspice-api
      script: 'server.js',             // Entry point
      cwd: '/home/ubuntu/FUTURE_FS_03/server',

      // ── Runtime ─────────────────────────────────────────────
      instances: 1,                    // Use 'max' to use all CPU cores
      exec_mode: 'fork',               // Use 'cluster' with instances: 'max'
      node_args: '--max-old-space-size=512',

      // ── Environment ─────────────────────────────────────────
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },

      // ── Logs ────────────────────────────────────────────────
      out_file: '/home/ubuntu/logs/royalspice-out.log',
      error_file: '/home/ubuntu/logs/royalspice-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,

      // ── Auto-restart ─────────────────────────────────────────
      autorestart: true,
      watch: false,                    // Don't watch files (handled by CI/CD)
      max_memory_restart: '512M',      // Restart if RAM exceeds 512MB
      restart_delay: 3000,             // Wait 3s before restarting on crash

      // ── Health ──────────────────────────────────────────────
      min_uptime: '10s',               // Must stay alive 10s to be considered started
      max_restarts: 10,                // Give up after 10 crashes in a row
    },
  ],
};
