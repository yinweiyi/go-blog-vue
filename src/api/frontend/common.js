import request from '@/utils/request'

export function getConfig (params) {
  return request({
    url: '/api/config',
    method: 'get',
    params
  })
}

export function getCategories (params) {
  return request({
    url: '/api/categories',
    method: 'get',
    params
  })
}

export function getRandomTags () {
  return request({
    url: '/api/random_tags',
    method: 'get',
  })
}

export function getHots () {
  return request({
    url: '/api/hots',
    method: 'get',
  })
}

export function getNewestComments () {
  return request({
    url: '/api/newest_comments',
    method: 'get',
  })
}

export function getFriendLinks () {
  return request({
    url: '/api/friend_links',
    method: 'get',
  })
}

export function getSentence () {
  return request({
    url: '/api/sentence',
    method: 'get',
  })
}

export function getGuestbook () {
  return request({
    url: '/api/guestbook',
    method: 'get',
  })
}

export function getAbouts () {
  return request({
    url: '/api/abouts',
    method: 'get',
  })
}


