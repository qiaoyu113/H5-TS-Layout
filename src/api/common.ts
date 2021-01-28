import qs from 'qs'
import request from '@/utils/request'

/* 上传图片 */
export function upImgData(data: any) {
  return request({
    url: '/base/v1/upload/uploadOSS/img/true/-1',
    method: 'post',
    data
  })
}

/* POST /user/area/getCityAreaByCode
根据父级城市code获取区县子列表 */
export function getCityAreaByCode(data: any) {
  return request({
    url: '/base/user/area/getCityAreaByCode',
    method: 'get',
    params: data
  })
}
/* 获取区 */
export function GetReginByCityCode(data: any) {
  return request({
    url: '/base/user/area/getCityByCode',
    method: 'post',
    data
  })
}
/* 获取乡镇 */
export function getTownByCountryCode(data: any) {
  return request({
    url: '/base/user/area/getTownByCountryCode',
    method: 'get',
    params: data
  })
}
/* 字典 */
export function dictionary(data: any) {
  return request({
    url: '/base/base/dict/qryDictByType',
    method: 'get',
    params: data
  })
}

/* 产品介绍 */
export function productIntroduce(data: any) {
  return request({
    url: '/product/product/enterprise-weChat/patcher/product-introduce',
    method: 'get',
    params: data
  })
}
// 通过token 获取用户信息
export function getUserInfo(data: any) {
  return request({
    url: '/base/user/bss/getUserInfoByToken',
    method: 'get',
    params: data
  })
}
// -------------------------szjw 2.1-----------------------
// 获取开通城市列表
// let prefix = '/mock/25'
// let corePrefix = '/mock/25'
const corePrefix = '/core'
const prefix = '/base'
const baseCenterUrl = '/base_center'

export function getOpenCitys(params: any) {
  return request({
    // url: `${prefix}/v1/base/area/getOpenCityData`, //旧 12.10
    url: `${baseCenterUrl}/open/v1/area/getOpenCityData`,
    method: 'get',
    params
  })
}

// 上传文件
export function upload(params: { folder: any; isEncode: any; expire: any }, data: any) {
  return request({
    url: `${corePrefix}/v1/upload/uploadOSS/${params.folder}/${params.isEncode}/${params.expire}`,
    method: 'post',
    data
  })
}

// 根据类型查询字典值--不分页
export function getDictData(params: any) {
  return request({
    // url: `${prefix}/v1/base/dict/dictData/list`, //旧 12.10
    url: `${baseCenterUrl}/open/v1/dict/dictData/list`,
    method: 'get',
    params
  })
}

// 根据类型查询字典值--不分页
export function getDictDataByKeyword(data: any) {
  return request({
    // url: `${prefix}/v1/base/dict/getDictInfoByDictTypeAndKeyword`, //旧 12.10
    url: `${baseCenterUrl}/open/v1/dict/getDictInfoByDictTypeAndKeyword`,
    method: 'post',
    data
  })
}
// 批量查询字典
export function GetDictionaryList(data: any) {
  return request({
    // url: `${prefix}/v1/base/dict/dict/list/types`, // 旧 12.10
    url: `${baseCenterUrl}/open/v1/dict/list/types`,
    method: 'post',
    data
  })
}

// 获取省、市、县
export const GetCityByCode = (data: any) =>
  request({
    // url: `${prefix}/api/base/v1/base/area/getCityByCode`,
    url: `${prefix}/v1/base/area/getCityByCode`,
    method: 'post',
    data
  })

/**
 * 根据数据权限获取登录人相关角色的用户列表[加盟经理，外线销售...]，支持根据中文名模糊、产品线、城市编码、角色类型查询
 * @param  {object} data
 * @param  {string} datta.cityCode    城市编码
 * @param  {number} datta.groupId     加盟小组
 * @param  {string} datta.keyword     用户中文名/手机号，支持模糊查询
 * @param  {number} datta.productLine 产品线，外线2,专车0，共享1,公共4,车资产5
 * @param  {string} datta.roleTypes   角色标识。角色标识。加盟经理roleId=1 外销销售=2,上岗经理=3 ,渠道经理=4,专车BGP = 6共享BGP=7
 * @param  {string} datta.uri         权限标识
 */
export const GetSpecifiedRoleList = (data: any) =>
  request({
    // url: `${prefix}/v2/base/user/getSpecifiedUserList`,
    url: `${prefix}/v2/base/user/getSpecifiedLowerUserListByCondition`,
    method: 'post',
    data
  })

// 加盟经理(1)  外销销售(2) 上岗经理(3)
export const getSpecifiedUserListByCondition = (data: any) =>
  request({
    url: `${prefix}/v2/base/user/getSpecifiedUserListByCondition`,
    method: 'post',
    data
  })

// 角色标识。加盟经理roleId=1 外销销售=2,上岗经理=3 ,渠道经理=4
export const GetUserList = (data: any) =>
  request({
    url: `${prefix}/v2/base/user/getUserListByProductLineAndCC`,
    method: 'post',
    data
  })
// 查询当前用户组织下的城市列表或者所归属的城市 工作城市
export function getCurrentLowerOfficeCityData(params: any) {
  return request({
    url: `${prefix}/v1/base/office/getCurrentLowerOfficeCityData`,
    method: 'get',
    params
  })
}

// 根据城市小组查加盟经理
export const getGMListByProductLineAndCC = (data: any) =>
  request({
    url: `${prefix}/v2/base/user/getGMListByProductLineAndCC`,
    method: 'post',
    data
  })
// 根据地市和产品线查询当前用户所属得组织信息
export const GetGmGroup = (params: any) =>
  request({
    url: `${prefix}/v2/base/office/getGroupInfoByCityCodeAndProductLine`,
    method: 'get',
    params
  })

// 获取全量省市县
export const GetAllAreaCode = () =>
  request({
    baseURL: '/',
    url: '/json/code.json',
    method: 'get'
  })

// 根据城市和关键字查询上岗经理,无数据权限
export const GetUserByCityAndKeyword = (params: any) =>
  request({
    url: `${baseCenterUrl}/auth/v2/user/getUserByCityAndKeyword`,
    method: 'get',
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })

