/**
 * Created by Bombassd on 04.02.2017.
 */

export function shortenNumber(n, d) {
    if (n < 1) return "0";
    var k = n = Math.floor(n);
    if (n < 1000) return (n.toString().split("."))[0];
    if (d !== 0) d = d || 1;

    function shorten(a, b, c) {
        var d = a.toString().split(".");
        if (!d[1] || b === 0) {
            return d[0] + c
        } else {
            return d[0] + "." + d[1].substring(0, b) + c;
        }
    }

    k = n / 1e15;	if (k >= 1) return shorten(k, d, "Q");
    k = n / 1e12;	if (k >= 1) return shorten(k, d, "T");
    k = n / 1e9;	if (k >= 1) return shorten(k, d, "G");
    k = n / 1e6;	if (k >= 1) return shorten(k, d, "M");
    k = n / 1e3;	if (k >= 1) return shorten(k, d, "K");

}

