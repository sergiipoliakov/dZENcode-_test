import { $host } from './index'

const fetchTranslations = async () => {
  const { data } = await $host.get(`/api/i18n`, { withCredentials: true })
  return data
}

const fetchLanguages = async () => {
  const { data } = await $host.get(`/api/i18n/languages`)
  return data
}

export {
  fetchTranslations,
  fetchLanguages
}