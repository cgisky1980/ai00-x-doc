# Wiki.js 部署笔记（Windows + SQLite MVP）

环境
- 操作系统：Windows（PowerShell 7.5.4）
- 运行方式：官方 Windows 包（包含 Node.js 运行时）
- 数据库：SQLite（仅用于轻量/MVP，后续建议切换 PostgreSQL）

下载与解压
- 工作目录：`C:\work\ai00-x\wikijs`
- 命令：
  - `Invoke-WebRequest -Uri "https://github.com/Requarks/wiki/releases/latest/download/wiki-js-windows.tar.gz" -OutFile "wiki-js-windows.tar.gz"`
  - `tar -xzf "wiki-js-windows.tar.gz"`
  - `Rename-Item -Path "config.sample.yml" -NewName "config.yml"`
  - `New-Item -ItemType Directory -Path "data" -Force`

配置（`config.yml`）
```yaml
port: 8001
bindIP: 127.0.0.1
db:
  type: sqlite
  storage: ./data/wiki.db
```

启动与初始化
- 安装 SQLite 原生绑定：`npm rebuild sqlite3`
- 启动服务：`node server`
- 首次访问初始化向导：`http://127.0.0.1:8001/`

注意事项
- 官方建议生产环境使用 PostgreSQL；SQLite 仅适合开发/轻量场景。
- Wiki.js 3.x 及以后版本预计不再支持 SQLite / MySQL / MariaDB / MS SQL（参考官方文档）。
- 如需外网访问，请置于反向代理后（nginx/Apache），Wiki.js 建议由代理进行 SSL 终止。

后续计划（可选）
- 切换数据库至 PostgreSQL，并在 `config.yml` 配置连接。
- 启用内容存储的 Git 同步；将现有 `docs/` 文档迁入并统一管理。
- 配置备份策略：定期备份 `data/wiki.db`（SQLite）或 PostgreSQL 数据库。

参考
- 官方配置参考：https://docs.requarks.io/install/config
- Windows 安装指南：https://docs.requarks.io/install/windows