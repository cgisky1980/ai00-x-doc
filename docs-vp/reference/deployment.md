# 部署说明（GitHub Pages）

本项目采用 GitHub Actions 自动化部署 VuePress 静态站点到 GitHub Pages。

## 部署流程

- 推送到 `main` 分支或在 Actions 手动触发工作流。
- 工作流执行 `npm ci` 安装依赖并运行 `npm run docs:build` 生成静态文件。
- 构建产物位于 `docs-vp/.vuepress/dist`，通过 `actions/deploy-pages@v4` 发布到 Pages。

## 必要配置

- 仓库设置：Settings → Pages → 构建来源选择 `GitHub Actions`。
- Node 版本：工作流使用 `node 20`。

## 本地验证

- 开发预览：`npm run docs:dev`，预览地址默认 `http://127.0.0.1:8002/`（冲突时会换端口）。
- 生产构建：`npm run docs:build`，产物在 `docs-vp/.vuepress/dist`。

## 维护建议

- 每次合并重大改动后观察 Actions 运行结果，若失败优先检查依赖版本兼容性与打包器设置。
- 如需调整部署流程，修改 `.github/workflows/deploy-pages.yml` 并在此文档记录变更。