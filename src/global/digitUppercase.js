/**
 * @description 人民币小写金额转换为大写
 * @param {String/number} n 金额
 * @return 大写金额
 * @example
 * digitUppercase(123456789)
 * "壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元整"
 * digitUppercase(12.12)
 * "壹拾贰元壹角贰分"
 */
function digitUppercase(n){
    const fraction = ['角', '分']
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ]
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ]
    const head = n < 0 ? '欠' : ''
    n = Math.abs(n)
    let s = ''
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000) / 1000)] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    n = Math.floor(n)
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = ''
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整')
}
export default digitUppercase
