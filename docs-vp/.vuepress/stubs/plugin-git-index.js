// 完整替代 @vuepress/plugin-git，返回空插件以避免引入样式与客户端配置
export const gitPlugin = () => ({ name: 'plugin-git-stub' })
export default gitPlugin