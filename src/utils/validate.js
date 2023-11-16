export function validateUsername (rule, value, callback) {
  if (value.length < 3 || value.length > 10) {
    callback(new Error('用户名必须在3-10位字符内！'))
  } else {
    callback()
  }
}
