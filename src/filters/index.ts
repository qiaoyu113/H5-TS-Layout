// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'
import store from '../store/modules/user'

function pluralize(time: number, label: string) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time: any) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num: number, digits: number | undefined) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num: string | number) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/* 价格后加两位小数 */
export function NumFormat(value: any) {
  if (!value) {
    return '0.00'
  }
  const intPart = Number(value) | 0
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  let floatPart = '.00'
  let value2Array: any
  if (parseInt(value) !== value) {
    value2Array = value.toString().split('.')
  } else {
    value2Array = value
  }
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()
    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}

/* 过滤是否为空 */
export function DataIsNull(value: string | number | undefined) {
  if (value === 0) {
    return value
  }
  if (!value && value !== undefined) {
    return '暂无数据'
  }
  if (value === undefined) {
    // return 'Loading...'
    return '暂无数据'
  }
  if (value === '') {
    return '暂无数据'
  }
  return value
}

/* 过滤是否展示 */
export function DataIsView(value: string | number | undefined) {
  if (value === 0) {
    return value
  }
  if (!value) {
    return false
  }
  if (value === undefined) {
    return false
  }
  if (value === '') {
    return '暂无数据'
  }
  return value
}

/* 时间过滤器 */
export function Timestamp(timestamp: string | number | Date) {
  function change(t: string | number) {
    if (t < 10) {
      return '0' + t
    } else {
      return t
    }
  }
  if (timestamp) {
    const date = new Date(timestamp)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = change(date.getDate()) + ' '
    const h = change(date.getHours()) + ':'
    const m = change(date.getMinutes()) + ':'
    const s = change(date.getSeconds())
    return Y + M + D + h + m + s
  } else {
    return '暂无数据'
  }
}

export function TimestampYMD(timestamp: string | number | Date) {
  function change(t: string | number) {
    if (t < 10) {
      return '0' + t
    } else {
      return t
    }
  }
  if (timestamp) {
    const date = new Date(timestamp)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = change(date.getDate()) + ' '
    return Y + M + D
  } else {
    return '暂无数据'
  }
}

// 判断是否有权限存在
export function isPermission(value: any[]) {
  const roles = store.state.user.stringPermissions
  if (value && value instanceof Array && value.length > 0) {
    const values = value.filter(item => {
      if (item.pUrl) {
        return item.pUrl.some((sub: any) => {
          return roles.includes(sub)
        })
      }
      return item
    })
    return values
  } else {
    return []
  }
}
