import { defineUserConfig } from 'vuepress'
// 切换到 webpack 打包器以绕过 Vite SSR 对 CSS 的限制
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import giscusPluginPkg from 'vuepress-plugin-giscus'
import { blogPlugin } from '@vuepress/plugin-blog'
import path from 'node:path'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Ai00-X 文档',
  description: 'Ai00-X 项目文档与设计规划',
  // 让站点在 GitHub Pages 的仓库子路径下正常工作，如 https://<org>.github.io/<repo>/
  base: process.env.VUEPRESS_BASE ?? '/',
  plugins: [
    // 按环境变量启用 Giscus 评论插件，未配置时不加载以避免构建错误
    ...(process.env.GISCUS_REPO && process.env.GISCUS_REPO_ID && process.env.GISCUS_CATEGORY && process.env.GISCUS_CATEGORY_ID
      ? [
          (giscusPluginPkg as any).giscusPlugin({
            repo: process.env.GISCUS_REPO!,
            repoId: process.env.GISCUS_REPO_ID!,
            category: process.env.GISCUS_CATEGORY!,
            categoryId: process.env.GISCUS_CATEGORY_ID!,
            mapping: 'pathname',
            reactionsEnabled: true,
            lang: 'zh-CN',
          }),
        ]
      : []),
    // 博客插件：收集文章信息（后续可按需增加分类与类型）
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        if (!filePathRelative) return false
        if (frontmatter.home || frontmatter.layout) return false
        return true
      },
      getInfo: ({ frontmatter, title, git = {}, data = {} }) => ({
        title,
        author: (frontmatter as any).author || '',
        categories: (frontmatter as any).categories || [],
        date: (frontmatter as any).date || (git as any).createdTime || null,
        tags: (frontmatter as any).tags || [],
        excerpt: (data as any).excerpt || '',
      }),
    }),
  ],
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          // 将客户端模块替换为本地空实现，避免导入 CSS
          '@vuepress/plugin-git/client': path.resolve(__dirname, 'stubs/plugin-git-client-stub.js'),
        },
      },
      ssr: {
        noExternal: ['@vuepress/theme-default', 'vuepress'],
      },
    },
  }),
  theme: defaultTheme({
    docsDir: 'docs-vp',
    // 关闭与 @vuepress/plugin-git 相关的功能，避免构建时引入该插件
    lastUpdated: false,
    contributors: false,
    themePlugins: {
      git: false,
    },
    navbar: [
      { text: '首页', link: '/' },
      { text: '纲要', link: '/gdd/' },
      { text: '博客', link: '/blog/' },
      {
        text: '参考',
        children: [
          { text: '社交GE数值规范', link: '/reference/social_ge.html' },
          { text: '起源与使命笔记', link: '/reference/notes_origin_mission.html' },
          { text: '重大变更记录', link: '/reference/major_changes.html' },
        ],
      },
    ],
    sidebar: {
      '/gdd/': [
        { text: '目录与索引', link: '/gdd/' },
        { text: '0. 项目概述', link: '/gdd/00_overview.html' },
        { text: '1. 游戏核心概念和背景故事', link: '/gdd/01_core_concept.html' },
        { text: '2. 桌宠角色系统和AI个性特征', link: '/gdd/02_roles_ai_traits.html' },
        { text: '3. 核心游戏玩法和互动机制', link: '/gdd/03_core_gameplay.html' },
        { text: '4. AI驱动的智能交互系统', link: '/gdd/04_ai_interaction_system.html' },
        { text: '5. 技术架构和开发方案', link: '/gdd/05_tech_architecture.html' },
        { text: '6. 用户界面和用户体验', link: '/gdd/06_ui_ux.html' },
        { text: '7. 商业模式和盈利策略', link: '/gdd/07_business_model.html' },
        { text: '8. 开发时间线和里程碑', link: '/gdd/08_timeline_milestones.html' },
        { text: '附录', link: '/gdd/appendix.html' },
        // 后续章节添加时在此补充条目
      ],
      '/reference/': [
        { text: '社交GE数值规范 v0.1', link: '/reference/social_ge.html' },
        { text: '起源与使命笔记', link: '/reference/notes_origin_mission.html' },
        { text: '重大变更记录', link: '/reference/major_changes.html' },
      ],
      '/': [
        { text: '首页', link: '/' },
      ],
    },
  }),
})