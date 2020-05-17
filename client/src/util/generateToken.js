const rand = function() {
    return Math.random()
        .toString(36)
        .substr(2); // remove `0.`
};

export default () => rand() + rand() + rand() + rand();
