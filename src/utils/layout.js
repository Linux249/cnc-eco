
const neighbours = [-10, -9, -8, -1, 1, 8, 9, 10]

export const layoutStats = layout => {
    let tib = 0,
        cris = 0
    // each char is a building
    const silos = layout.split('').map((slot, i, base) => {
        if(slot !== ".") return
        // check tip neighbours
        let tib_n = 0
            , cris_n = 0

        neighbours.forEach((n) => {
            let j = i + n       // j: neighbour
            if (0 <= j && j <= 71) {
                if (base[j] === "t") tib_n += 1   // 0 = tib
                if (base[j] === "c") cris_n += 1
            }
        })

        const silo = tib_n + cris_n
        if(silo === 4) {
            tib += tib_n/4
            cris += cris_n/4
        }
        if(silo === 5) {
            tib += tib_n/5*3
            cris += cris_n/5*3
        }
        if(silo === 6) {
            tib += tib_n    //6*6
            cris += cris_n  //6*6
        }

        // check kris neighbours
    })
    return {tib, cris}

}