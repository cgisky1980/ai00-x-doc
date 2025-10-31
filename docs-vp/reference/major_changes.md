---
title: 重大变更记录（Ai00-X）
---

# 重大变更记录

本文同步自工作区 `reference/major_changes.md`，记录文档站点与项目文档相关的重大步骤与约定。

## 2025-10-31 导航结构与构建流程定稿

- 导航结构
  - 顶部导航：`首页`、`纲要`、`参考（社交GE数值规范 / 起源与使命笔记 / 重大变更记录）`
  - 参考侧边栏：`social_ge.md`、`notes_origin_mission.md`、`major_changes.md`
- 技术栈与依赖
  - VuePress v2（`vuepress@2.0.0-rc.26`）
  - `@vuepress/theme-default@2.0.0-rc.118`
  - `@vuepress/bundler-vite@2.0.0-rc.26`
  - `sass-embedded`
- 重要配置
  - `bundler: viteBundler({})`
  - `themePlugins.git = false`
  - `docsDir = 'docs-vp'`
- 开发与构建（Windows）
  - 预览：`npm run docs:dev`（`127.0.0.1:8002`）
  - 构建：`npm run docs:build`，输出 `docs-vp/.vuepress/dist`

## 约定

- 重大步骤完成后更新 `reference/` 记录，并同步到站点。
- 新增参考页面时，同时更新导航与侧边栏。

## 2025-10-31 纲要拆分为章节文件与导航更新

- 新建目录：`docs-vp/gdd/`，用于将《游戏策划大纲》拆分为按章节的独立文件。
- 创建索引页：`docs-vp/gdd/README.md`，集中展示并链接各章节。
- 已创建章节：`00_overview.md`、`01_core_concept.md`（后续按章节逐步补充）。
  - 2025-10-31：新增 `02_roles_ai_traits.md`
- 更新配置文件：`docs-vp/.vuepress/config.ts`
  - 顶部导航新增 `纲要 -> /gdd/`
  - 为 `/gdd/` 配置侧边栏并挂接已创建章节文件。
- 目的：使目录的每一项都对应一个文件，便于详细规划与持续维护。

维护指引
- 新增章节文件后，将其加入 `/gdd/` 侧边栏列表。
- 文件命名建议：`NN_title.md`，以便排序一致与可读性。

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
- 链接清理：在根级侧边栏移除旧版链接 `'/game_design_document.html'`，统一从 `'/gdd/'` 进入纲要章节结构。