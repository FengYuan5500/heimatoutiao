import request from '@/utils/request'

export const getArticlesByUser = (userId, params) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}/articles`,
    params
  })
}
export const getArticesByChannel = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
