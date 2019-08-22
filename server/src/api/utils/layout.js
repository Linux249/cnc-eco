const neighbours = [-10, -9, -8, -1, 1, 8, 9, 10];

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

    const accus = layout.split('').map((slot, i, base) => {
        if (slot !== '.') return;
        // check tip neighbours
        function getAccu(s) {
            let c = 0
            neighbours.forEach(n => {
                const j = s + n; // j: neighbour
                if (j >= 0 && j <= 71) {
                    if (base[j] === '.')  c += 1
                }
            });
            return c
        }

        let pp_n = getAccu(i);
        if(pp_n === 9) {
            console.log(pp_n)
        }
        if(pp_n === 8) {
            console.log(pp_n)
        }
    });
    return { tib: Math.round(tib * 100) / 100, cris: Math.round(cris * 100) / 100 };
};
