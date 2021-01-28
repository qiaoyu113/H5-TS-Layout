import request from '@/utils/request'
// let prefix = '/mock/81'
const prefix = '/driver'
// let linePrefix = '/mock/74'
const linePrefix = '/waybill_center'
// let transportPrefix = '/mock/103'
const transportPrefix = '/carrier_center'
/**
 * 司机列表
 */
export function getDriverList(data: any) {
  return request({
    url: `${transportPrefix}/v2/driver/getDriverList`,
    method: 'post',
    data
  })
}

/**
 * 新建共享面试表单
 */
export function shareInterview(data: any) { // y
  return request({
    url: `${prefix}/v2/driver/share/interview`,
    method: 'post',
    data
  })
}
/**
 *
 *
 */
export function getInterview(data: any) { // y
  return request({
    url: `${prefix}/v2/driver/interview`,
    method: 'get',
    params: data
  })
}

/**
 * 编辑面试表单
 */
export function editInterview(data: any) {
  return request({
    url: `${prefix}/v2/driver/edit/interview`,
    method: 'post',
    data
  })
}

/**
 * 新建专车面试表单
 */
export function specialInterview(data: any) {
  return request({
    url: `${prefix}/v2/driver/special/interview`,
    method: 'post',
    data
  })
}

/** *
 * 面试表单手机号唯一效验 新建
 */
export function unqPhone(params: any) {
  return request({
    url: `${prefix}/v2/driver/check/unq/phone`,
    method: 'post',
    params
  })
}

/** *
 * 面试表单手机号唯一效验 编辑
 */
export function unqPhoneEdit(params: any) {
  return request({
    url: `${prefix}/v2/driver/check/unq/phoneAndDriverId`,
    method: 'post',
    params
  })
}

/**
 * 司机详情
 */
export function driverDetail(data: any) {
  return request({
    url: `${prefix}/v2/driver/selectDriverDetail`,
    method: 'get',
    params: data
  })
}

// 司机详情 标签信息
export function selectLabel(data: any) {
  return request({
    url: `${prefix}/v2/driver/selectLabel`,
    method: 'get',
    params: data
  })
}

/**
 * 标记成交
 */
export function signDeal(params: any) {
  return request({
    url: `${prefix}/v2/driver/signDeal`,
    method: 'post',
    params
  })
}

/**
 * 标记退出
 */
export function signOut(params: any) {
  return request({
    url: `${prefix}/v2/driver/signOut`,
    method: 'post',
    params
  })
}

/**
 * 打标签
 */
export function insertLabel(data: any) {
  return request({
    url: `${prefix}/v2/driver/insertLabel`,
    method: 'post',
    data
  })
}

/**
 * 订单信息
 */
export function orderLabel(data: any) {
  return request({
    url: `${prefix}/v2/driver/selectLabel`,
    method: 'get',
    params: data
  })
}

/**
 * 查询面试表某个时间点的历史数据
 */
export function historyList(data: any) {
  return request({
    url: `${prefix}/v2/driver/getOperateHistoryList`,
    method: 'get',
    params: data
  })
}

/**
 * 查询所有操作时间点
 */
export function getOperateTime(params: any) {
  return request({
    url: `${prefix}/v2/driver/getOperateTime`,
    method: 'get',
    params
  })
}

/**
 *
获取线路信息
 */
export function getLingMessageByDriverId(data: any) {
  return request({
    url: `${linePrefix}/v2/runtest/getLingMessageByDriverId`,
    method: 'get',
    params: data
  })
}

/**
 *修改司机加盟经理
 */
export function updateGmByDriverId(data: any) {
  return request({
    url: `${prefix}/v2/driver/updateGmByDriverId`,
    method: 'post',
    data
  })
}

// 获取当前加盟经理的推广码
export function GetcreateQrCodeFrontUrl() {
  return request({
    // url: '/mock/112/v2/driver/applet/createQrCodeFront',
    url: `${prefix}/v2/driver/applet/createQrCodeFront`,
    method: 'get'
  })
}

// 司机信息导出
// http://szjw-application-carrier-center.m2.yunniao.cn/v2/driver/export
// http://szjw-application-carrier-center.m2.yunniao.cn/v2/driver/export
export function driverExport(data: any) {
  return request({
    // url: '/mock/112/v2/driver/applet/createQrCodeFront',
    url: `${transportPrefix}/v2/driver/export`,
    method: 'post',
    data
  })
}

// 司机合同下载
export function driverContract(params: any) {
  return request({
    // url: '/mock/112/v2/driver/applet/createQrCodeFront',
    url: '/business_center/v2/contract/downloadContract',
    method: 'get',
    params
  })
}

// 校验当前业务线是否有面试
export function checkHasInterview(params: any) {
  return request({
    url: `${transportPrefix}/v2/driver/interviewFollow/checkHasInterview`,
    method: 'get',
    params
  })
}

// 创建面试跟进记录
export function interviewFollowCreate(data: any) {
  return request({
    url: `${transportPrefix}/v2/driver/interviewFollow/create`,
    method: 'post',
    data
  })
}

//  司机详情页查询最新一次面试跟进记录
export function interviewFollowLastInfo(params: any) {
  return request({
    url: `${transportPrefix}/v2/driver/interviewFollow/lastInfo`,
    method: 'get',
    params
  })
}

//  手机号查询线索
export function hasPhoneInMarketClue(params: any) {
  return request({
    url: `${transportPrefix}/v2/driver/check/hasPhoneInMarketClue`,
    method: 'get',
    params
  })
}
