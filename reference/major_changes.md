---
title: 重大变更记录（Ai00-X）
---

# 重大变更记录

本文件用于记录文档站点与项目文档相关的重大步骤与约定，便于后续查看与维护。

## 2025-10-31 导航结构与构建流程定稿

- 导航结构
  - 顶部导航：`首页`、`纲要`、`参考（社交GE数值规范 / 起源与使命笔记 / 重大变更记录）`
  - 参考侧边栏：`social_ge.md`、`notes_origin_mission.md`、`major_changes.md`
- 技术栈与依赖
  - 站点：VuePress v2（`vuepress@2.0.0-rc.26`）
  - 默认主题：`@vuepress/theme-default@2.0.0-rc.118`
  - 打包器：`@vuepress/bundler-vite@2.0.0-rc.26`
  - 样式预处理器：`sass-embedded`
- 重要配置
  - 配置文件：`docs-vp/.vuepress/config.ts`
  - 显式设置 Vite 打包器：`bundler: viteBundler({})`
  - 关闭主题 Git 插件：`themePlugins.git = false`，避免在空仓库时出现日志噪音
  - 文档目录：`docsDir = 'docs-vp'`
- 开发与构建（Windows）
  - 开发预览：`npm run docs:dev`（本地端口 `127.0.0.1:8002`）
  - 构建静态站点：`npm run docs:build`，输出目录：`docs-vp/.vuepress/dist`
- 约定
  - 重大步骤完成后，务必在 `reference/` 目录更新记录文件
  - VuePress 内容采用 `docs-vp/` 作为源目录；如需在站点内展示参考内容，请同步复制到 `docs-vp/reference/`

### 2025-10-31 纲要页侧边导航

- 为 `game_design_document.md` 配置左侧侧边导航，条目与纲要章节一致：
  - 顶层：`项目概述`、`1–8`各章、`附录`
  - 子层：每章下挂接对应的`x.y`条目，跳转到页面锚点
- 配置位置：`docs-vp/.vuepress/config.ts` → `sidebar['/game_design_document.html']`
- 目的：在阅读大纲时提升章节跳转效率，保持与文档结构一致性

## 待办方向

- 如需新增参考页面（如部署笔记），在 `reference/` 建立后同步到 `docs-vp/reference/`，并更新导航与侧边栏。
- 如需接入外部数据源或搜索，评估插件兼容性与版本匹配后再纳入构建流程。

## 2025-10-31 纲要拆分为章节文件与导航更新

- 新建目录：`docs-vp/gdd/`，作为《游戏策划大纲》的章节化文件存放位置。
- 创建索引页：`docs-vp/gdd/README.md`，汇总并链接各章节文件。
- 新增章节文件：`00_overview.md`、`01_core_concept.md`（后续按章节逐步补充）。
  - 2025-10-31：新增 `02_roles_ai_traits.md`
- 更新站点配置：`docs-vp/.vuepress/config.ts`
  - 顶部导航：新增 `纲要 -> /gdd/`
  - 侧边栏：为 `/gdd/` 配置章节侧边栏，挂接已创建的章节文件。
- 目的：将纲要各条目转为独立页面，便于详细规划与后续扩展（每项即一个文件）。

维护指引
- 新增章节：在 `docs-vp/gdd/` 新增文件后，将其加入 `/gdd/` 侧边栏。
- 统一命名：建议以 `NN_title.md` 命名（如 `02_roles_ai_traits.md`），确保排序与可读性。

### 2025-10-31 章节拆分完成（03–08 与附录）

- 新增章节文件：`03_core_gameplay.md`、`04_ai_interaction_system.md`、`05_tech_architecture.md`、`06_ui_ux.md`、`07_business_model.md`、`08_timeline_milestones.md`、`appendix.md`
- 更新侧边栏：在 `docs-vp/.vuepress/config.ts` 的 `/gdd/` 中挂接全部章节链接。
- 更新索引：修正 `docs-vp/gdd/README.md` 章节链接以与文件名一致。

### 2025-10-31 部署流程与构建修复

- 构建修复：通过在打包器中将 `@vuepress/plugin-git/client` 别名到本地 stub，避免 SSR 阶段直接加载 `.css` 报错；并设置 `viteOptions.ssr.noExternal`。
- 配置更新：在 `docs-vp/.vuepress/config.ts` 增加 `base: process.env.VUEPRESS_BASE ?? '/'`，便于 GitHub Pages 仓库子路径部署。
- 部署工作流：新增 `.github/workflows/deploy-pages.yml`，推送到 `main` 自动构建并发布到 Pages。
- 部署说明：在 `reference/deployment.md` 与 `docs-vp/reference/deployment.md` 补充部署文档与维护建议。

### 2025-10-31 首页改版与旧链接清理

- 首页改版：将 `docs-vp/README.md` 更新为默认主题主页布局（`home: true`），添加 `actions` 与 `features`，提升入口可见性与信息密度。
- 链接清理：在 `docs-vp/.vuepress/config.ts` 的根级侧边栏移除旧版链接 `'/game_design_document.html'`，统一从 `'/gdd/'` 进入纲要章节结构。