import defaultSettings from '@/settings'

const title = defaultSettings.title || '三足金乌CRM'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
