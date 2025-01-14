import { prng_alea } from 'esm-seedrandom'
export function randIntBetween(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default async function truchet(canvas, tileCanvas, params, mode) {
    const d3 = await import("d3-color")

    /*
        const should_shuffle = (randIntBetween(0, 1) === 1 ? true : false)
        const tile_size = 30; // 32 viewport
        const curve_thickness = randIntBetween(1, 30)
        const curves_per_tile = randIntBetween(1, 10)
        const twist = randIntBetween(0, 50)
        const scramble = randIntBetween(0, 50)
    */


    var height = canvas.height = params?.height || 280
    var width = canvas.width = params?.width || 400
    var seed = params?.seed || Math.random()
    var tile_size = params?.tile_size || randIntBetween(40, 80)
    var saturation = params?.saturation || 30
    var hue_amplitude = params?.hue_amplitude || randIntBetween(10, 80)
    var hue_phase = params?.hue_phase || 210
    var background = params?.background || '#a18dbf'
    var background_phase = params?.background_phase || 180
    var border = params?.border || "#fff"
    var grid_alpha = params?.grid_alpha || 0
    var should_shuffle = params?.should_shuffle || false
    var twist = (params?.twist || 0) / 100
    var scramble = (params?.scramble || 0) / 100
    var light = params?.light || (100 - saturation / 2)
    var curve_thickness = params?.curve_thickness || 1
    var curves_per_tile = params?.curves_per_tile || randIntBetween(3, 7)


    var segments = curves_per_tile + 1

    const globalCanvas = canvas.getContext('2d')
    globalCanvas.fillStyle = "#fff"
    globalCanvas.fillRect(0, 0, width, height)


    const tileContext = tileCanvas.getContext('2d')
    tileCanvas.width = tile_size
    tileCanvas.height = tile_size

    const rForm = prng_alea("form:" + seed)
    const rScramble = prng_alea("scramble:" + seed)
    const rScramble2 = prng_alea("scramble2:" + seed)
    const rShuffle = prng_alea("shuffle:" + seed)
    const rTwist = prng_alea("twist:" + seed)

    const curveWidth = Math.max(2, tile_size / segments * curve_thickness + 1)


    function randomize_curves(tile_size) {

        // soit 0, soit tile_size
        // pour définir l'origine du cercle
        const otx = (rForm() < 0.5 ? 0 : tile_size)
        const oty = (rForm() < 0.5 ? 0 : tile_size)



        const curves = []
        //		chaque segment est composé d'une courbe intérieur et d'une courbe extérieure)

        // pour chaque segment, ajoute une courbe à un tableau curves
        // scramble, shuffle et twist
        for (let i = 1; i <= Math.floor(segments / 2); i++) {
            // We do this outside of the if for more stability.
            const stx = (rScramble2() < 0.5 ? 0 : tile_size)
            const sty = (rScramble2() < 0.5 ? 0 : tile_size)
            const should_scramble = (i > 1 && rScramble() < scramble)
            const tx = should_scramble ? stx : otx
            const ty = should_scramble ? sty : oty

            const should_twist = (rTwist() < twist)

            // est-ce qu'on agit sur le segment intérieur ou extérieur de la courbe
            const k = segments - i

            // toujours faux si pas de twist
            const twist_i = (k != i) && (rTwist() < 0.5) && should_twist
            const twist_k = (k != i) && (!twist_i) && should_twist

            function do_twist(twist_this, z) {
                return twist_this ? tile_size - z : z
            }

            const curve = [twist_i ? k : i,
            do_twist(twist_i, tx),
                ty
            ]
            curves.push(curve, curve)
            if (k != i) {
                curves.push([twist_k ? i : k, do_twist(twist_k, tx), ty])
                curves.unshift([twist_k ? i : k, do_twist(twist_k, tile_size - tx), tile_size - ty])
            }
            curves.unshift([twist_i ? k : i, do_twist(twist_i, tile_size - tx), tile_size - ty])
        }
        if (should_shuffle)
            shuffle(curves)

        return curves

    }


    function shuffle(a) {

        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(rShuffle() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]
        }
        return a
    }

    // x et y sont soit à 0, soit à tile_size.
    //définit le point d'origine du cercle parmi les quatre coints de la tile
    function circle(x, y, r, style) {
        tileContext.beginPath()
        tileContext.arc(x, y, r, 0, 2 * Math.PI)

        tileContext.lineWidth = curveWidth
        tileContext.strokeStyle = border
        tileContext.stroke()

        tileContext.lineWidth -= 2
        tileContext.strokeStyle = style
        tileContext.stroke()
    }
    ;


    function part(i, x, y, flip) {

        // Peut être à 1 ou 5
        // définit les alternances de teinte entre chaque segment
        const hue_flip = ((flip ? (segments - i) : i) / curves_per_tile)
        const hue = hue_flip * hue_amplitude + hue_phase
        circle(x, y, tile_size * i / segments, `hsla(${hue}, ${saturation}%, ${light}%, 1)`)
    }

    //pour chaque tile
    for (let y = 0; y < height; y += tile_size) {
        for (let x = 0; x < width; x += tile_size) {

            // FOND
            // est-on dans une tuile paire ou impaire ?
            tileContext.fillStyle = background
            // on remplit une première fois toute la tuile
            tileContext.fillRect(0, 0, tile_size, tile_size)

            // Puis on ajoute deux carrés, décalés en position et en teinte.
            const bkg2 = d3.hsl(background)
            bkg2.h += background_phase
            bkg2.s = '40%'
            tileContext.fillStyle = bkg2.hex()
            const parity = ((x + y) / tile_size) % 2
            tileContext.fillRect(parity ? 0 : tile_size / 2, 0, tile_size / 2, tile_size / 2)
            tileContext.fillRect(parity ? tile_size / 2 : 0, tile_size / 2, tile_size / 2, tile_size / 2)

            // COURBE
            const curves = randomize_curves(tile_size)
            for (let j = 0; j < curves.length; ++j) {
                let [i, tx, ty] = curves[j]
                const hue_should_flip = ((x + y + tx + ty) / tile_size) % 2
                part(i, tx, ty, hue_should_flip)
            }

            // CANVAS
            globalCanvas.drawImage(tileCanvas, x, y)
            globalCanvas.save()
            // GRILLE
            globalCanvas.globalAlpha = grid_alpha
            globalCanvas.beginPath()
            globalCanvas.rect(x, y, tile_size, tile_size)
            globalCanvas.strokeStyle = border
            globalCanvas.stroke()
            globalCanvas.restore()
        }
    }



    if (mode === "node") {
        return canvas
    }
}


/** @typedef {Object} Params
 * @property {number} height
 * @property {number} width
 * @property {number} [twist]
 * @property {number} [scramble]
 * @property {number} [saturation]
 * @property {number} [curve_thickness]
 * @property {string} [border]
 * @property {number} [hue_amplitude]
 * @property {number} [hue_phase]
 * @property {string} [background]
 * @property {number} [grid_alpha]
 * @property {number} [curves_per_tile]
 * @property {number} [seed]
 * @property {number} [tile_size]
 * @property {number} [background_phase]
 * @property {boolean} [should_shuffle]
 * @property {number} [light]
 */
