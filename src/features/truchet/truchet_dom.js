//@ts-nocheck
import truchet_core from './truchet_core';
window.truchet = truchet_core;
document.addEventListener('DOMContentLoaded', async function () {
    [...document.querySelectorAll('canvas')].forEach(async (el) => {
        const params = JSON.parse(el.dataset?.args || '');
        if (!params || typeof params !== 'object') {
            console.log(new Error("truchet : le shortcode doit comprendre une liste de paramètres sous forme d'objet"));
        }

        await window.truchet(el, document.createElement('canvas'), params, null);
    });
}, false);

[...document.querySelectorAll('.truchet-rotate')].forEach(el => {
    let rotate = 0;
    el.addEventListener('click', function (e) {
        rotate += 90;
        const target = e.target;
        target.style.transform = `rotate(${rotate}deg)`;
    }, false);
});
