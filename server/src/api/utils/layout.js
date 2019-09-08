const neighbours = [-10, -9, -8, -1, 1, 8, 9, 10];
// todo the slots -19, -17 and so on are not checked!
const neighboursAccu = [-20, -19, -18, -17, -16, -11, -7, -2, 2, 7, 11, 16, 17, 18, 19, 20]; // three rows, from above

const logLayout = layout => {
    console.log('--- layout ---');
    for (let r = 0; r < 72; r += 9) {
        console.log(
            layout[r],
            layout[r + 1],
            layout[r + 2],
            layout[r + 3],
            layout[r + 4],
            layout[r + 5],
            layout[r + 6],
            layout[r + 7],
            layout[r + 8]
        );
    }
};

/**
 * get the number of power plants (PP) possible around the given slot number
 *
 * @param {Number} s the position/slot to look for
 * @param {String} layout the hole layout
 * @returns {Number} count of PP
 */
function getAccu(s, layout) {
    return neighbours.reduce((a, n) => {
        const j = s + n; // j: neighbour
        if (j >= 0 && j <= 71) {
            if (layout[j] === '.') a += 1;
        }
        return a;
    }, 0);
}

/**
 * Recursive way to check for the most possible accu count
 *
 * @param {Number} i starting slot
 * @param {String} lay layout with maybe some accus inside through
 * @param counter
 *
 * @return {[Number, String]} [count, layout] count of accus in layout and layout
 */
function findAccus(i, lay, counter = 0) {
    let pp_n = getAccu(i, lay);
    if (pp_n === 8 || pp_n === 7) {
        // generate the new layout
        const newLayout = lay.substr(0, i) + 'a' + lay.substr(i + 1);

        // get potential next accus
        const accuSlots = neighboursAccu.reduce((a, n) => {
            // j: potential accu slot with right distance
            const j = i + n;
            // not the first& last row and not the left/right boarder
            if (j > 9 && j < 62 && j % 9 !== 0 && (j + 1) % 9 !== 0 && newLayout[j] === '.')
                a.push(j);
            return a;
        }, []);

        // recursive call for each free accu slot
        const [newCounter, bestLayout] = accuSlots.reduce(
            (a, s) => {
                const [newC, newL] = findAccus(s, newLayout, counter + 1);
                return newC > a[0] ? [newC, newL] : a;
            },
            [counter + 1, newLayout]
        );
        return [newCounter, bestLayout];
        // console.log({ accuSlots });
    } else return [counter, lay];
}

export const layoutStats = layout => {
    let tib = 0,
        cris = 0;
    // each char is a building - silos
    layout.split('').map((slot, i, base) => {
        if (slot !== '.') return;
        // check tip neighbours
        let tib_n = 0;
        let cris_n = 0;

        neighbours.forEach(n => {
            const j = i + n; // j: neighbour
            if (j >= 0 && j <= 71) {
                if (base[j] === 't') tib_n += 1; // 0 = tib
                if (base[j] === 'c') cris_n += 1;
            }
        });

        const silo = tib_n + cris_n;
        if (silo === 4) {
            // console.log("vierer")
            tib += tib_n / 4;
            cris += cris_n / 4;
        }
        if (silo === 5) {
            // console.log("5")
            tib += (tib_n / 5) * 3;
            cris += (cris_n / 5) * 3;
        }
        if (silo === 6) {
            // console.log("6")
            tib += tib_n; // 6*6
            cris += cris_n; // 6*6
        }

        // check kris neighbours
    });

    /** get the best combination of accus to max accu count and the layout */
    const [power, powerLayout] = layout.split('').reduce(
        (a, slot, i) => {
            // dont't check a slot where already is something
            if (slot !== '.') return a; // t,c are only other options here
            if (i < 10 || i > 61 || !(i % 9) || !((i + 1) % 9)) return a;
            // 15 accus are enough
            if (i >= 15) return a;

            // start recursive for each free slot
            const [newC, newL] = findAccus(i, layout);
            if (newC > a[0]) return [newC, newL];
            return a;
        },
        [0, '']
    );
    // console.log('Finale best: ', power, powerLayout);
    // logLayout(powerLayout);
    const r = {
        tib: Math.round(tib * 100) / 100,
        cris: Math.round(cris * 100) / 100,
        power,
        powerLayout,
    };
    // console.log(r);
    return r;
};
