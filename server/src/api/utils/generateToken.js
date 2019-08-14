export default () =>
    rand() + rand() + rand() + rand()

const rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};
