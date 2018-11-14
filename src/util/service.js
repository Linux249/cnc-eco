export const copyObj = object => {
    return JSON.parse(JSON.stringify(object));
};

/**
 * Created by Bombassd on 04.02.2017.
 */

export function shortenNumber(n, d) {
    const negativ = n < 0 ? '-' : ''
    n = Math.abs(n)
    if (n === 0) return '0'
    let k = Math.floor(n)
    if (n < 1000) return negativ + n.toString().split('.')[0]
    if (d !== 0) d = d || 1

    k = n / 1e12
    if (k >= 1) return negativ + shorten(k, d, 'T')
    k = n / 1e9
    if (k >= 1) return negativ + shorten(k, d, 'G')
    k = n / 1e6
    if (k >= 1) return negativ + shorten(k, d, 'M')
    k = n / 1e3
    if (k >= 1) return negativ + shorten(k, d, 'K')
}

function shorten(a, b, c) {
    const d = a.toString().split('.')
    if (!d[1] || b === 0) {
        return d[0] + c
    } else {
        return d[0] + '.' + d[1].substring(0, b) + c
    }
}