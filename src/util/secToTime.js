export function msToTime(duration) {
    //let seconds = Math.floor(duration  % 60),
    let minutes = Math.floor((duration / 60) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24),
        days = Math.floor((duration / (60 * 60 * 24)) % 24);

    days = days < 10 ? '0' + days : days;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return days + ':' + hours + ':' + minutes;
}
