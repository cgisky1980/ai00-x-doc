// 兼容默认主题的导入：导出占位的 hooks，避免加载 CSS
export function useContributors() {
  return { contributors: [] }
}

export function useLastUpdated() {
  return { lastUpdated: null }
}

export default {}