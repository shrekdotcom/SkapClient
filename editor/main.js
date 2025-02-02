// Zooming
canvas.addEventListener("wheel", e => {
    if (e.ctrlKey) return;
    let m = 0.85 ** (e.deltaY / 125);
    let x = (e.offsetX - canvas.width / 2) / camScale + camX;
    let y = (e.offsetY - canvas.height / 2) / camScale + camY;
    camX = (m * x - x + camX) / m;
    camY = (m * y - y + camY) / m;
    camScale *= m;
});
canvas.addEventListener("mousedown", e => {
    if (e.button === 1) e.preventDefault();
    if (e.button !== 0) return;
    for (let type of ["text", "hatReward", "reward", "gravityZone", "image1", "block1", "turret", "image0", "block0", "door", "switch", "button", "slime", "ice", "rotatingLava", "movingLava", "lava", "teleporter", "obstacle"]) {
        for (let i = currentArea.objects[type].length - 1; i >= 0; i--) {
            const obj = currentArea.objects[type][i];
            const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = points(obj);
            const mouse = { x: e.offsetX, y: e.offsetY };

            if (pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer })) {
                if (selectedObject) hide(selectedObject.element);
                selectedObject = obj;
                show(selectedObject.element);

                /**
                 * @param {MouseEvent} e 
                 */
                let resize = e => { };
                const { x: posX, y: posY } = obj.pos;
                const { x: sizeX, y: sizeY } = obj.size;
                const mouseX = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                const mouseY = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                switch (selectMode) {
                    case "u":
                        resize = e => {
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                            if (posY - y + sizeY > 0) {
                                obj.pos.y = y;
                                obj.size.y = posY - y + sizeY;
                            } else {
                                obj.pos.y = posY + sizeY;
                                obj.size.y = 0;
                            }
                            obj.inputs.y.value = obj.pos.y;
                            obj.inputs.h.value = obj.size.y;
                        }
                        break;
                    case "ur":
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                            if (posX - x < 0) {
                                obj.size.x = x - posX;
                            } else {
                                obj.size.x = 0;
                            }
                            if (posY - y + sizeY > 0) {
                                obj.pos.y = y;
                                obj.size.y = posY - y + sizeY;
                            } else {
                                obj.pos.y = posY + sizeY;
                                obj.size.y = 0;
                            }
                            obj.inputs.x.value = obj.pos.x;
                            obj.inputs.y.value = obj.pos.y;
                            obj.inputs.w.value = obj.size.x;
                            obj.inputs.h.value = obj.size.y;
                        }
                        break;
                    case "r":
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            if (posX - x < 0) {
                                obj.size.x = x - posX;
                            } else {
                                obj.size.x = 0;
                            }
                            obj.inputs.x.value = obj.pos.x;
                            obj.inputs.w.value = obj.size.x;
                        }
                        break;
                    case "dr":
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                            if (posX - x < 0) {
                                obj.size.x = x - posX;
                            } else {
                                obj.size.x = 0;
                            }
                            if (posY - y < 0) {
                                obj.size.y = y - posY;
                            } else {
                                obj.size.y = 0;
                            }
                            obj.inputs.x.value = obj.pos.x;
                            obj.inputs.y.value = obj.pos.y;
                            obj.inputs.w.value = obj.size.x;
                            obj.inputs.h.value = obj.size.y;
                        }
                        break;
                    case "d":
                        resize = e => {
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                            if (posY - y < 0) {
                                obj.size.y = y - posY;
                            } else {
                                obj.size.y = 0;
                            }
                            obj.inputs.y.value = obj.pos.y;
                            obj.inputs.h.value = obj.size.y;
                        }
                        break;
                    case "dl":
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                            if (posX - x + sizeX > 0) {
                                obj.pos.x = x;
                                obj.size.x = posX - x + sizeX;
                            } else {
                                obj.pos.x = posX;
                                obj.size.x = 0;
                            }
                            if (posY - y < 0) {
                                obj.size.y = y - posY;
                            } else {
                                obj.size.y = 0;
                            }
                            obj.inputs.x.value = obj.pos.x;
                            obj.inputs.y.value = obj.pos.y;
                            obj.inputs.w.value = obj.size.x;
                            obj.inputs.h.value = obj.size.y;
                        }
                        break;
                    case "l":
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            if (posX - x + sizeX > 0) {
                                obj.pos.x = x;
                                obj.size.x = posX - x + sizeX;
                            } else {
                                obj.pos.x = posX;
                                obj.size.x = 0;
                            }
                            obj.inputs.x.value = obj.pos.x;
                            obj.inputs.w.value = obj.size.x;
                        }
                        break;
                    case "ul":
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);
                            if (posX - x + sizeX > 0) {
                                obj.pos.x = x;
                                obj.size.x = posX - x + sizeX;
                            } else {
                                obj.pos.x = posX;
                                obj.size.x = 0;
                            }
                            if (posY - y + sizeY > 0) {
                                obj.pos.y = y;
                                obj.size.y = posY - y + sizeY;
                            } else {
                                obj.pos.y = posY + sizeY;
                                obj.size.y = 0;
                            }
                            obj.inputs.x.value = obj.pos.x;
                            obj.inputs.y.value = obj.pos.y;
                            obj.inputs.w.value = obj.size.x;
                            obj.inputs.h.value = obj.size.y;
                        }
                        break;
                    case "m":
                        resize = e => {
                            let x = Math.round((e.offsetX - canvas.width / 2) / camScale + camX);
                            let y = Math.round((e.offsetY - canvas.height / 2) / camScale + camY);

                            obj.pos.x = x - mouseX + posX;
                            obj.pos.y = y - mouseY + posY;

                            obj.inputs.x.value = obj.pos.x;
                            obj.inputs.y.value = obj.pos.y;
                        }
                        break;
                }
                lockCursor = true;
                canvas.addEventListener("mousemove", resize);
                document.addEventListener("mouseup", () => {
                    lockCursor = false;
                    canvas.removeEventListener("mousemove", resize);
                });
                return;
            }
        }
    }
    if (selectedObject) hide(selectedObject.element);
    selectedObject = null;
});
canvas.addEventListener("mousemove", e => {
    if (lockCursor) return;
    for (let type of ["text", "hatReward", "reward", "gravityZone", "image1", "block1", "turret", "image0", "block0", "door", "switch", "button", "slime", "ice", "rotatingLava", "movingLava", "lava", "teleporter", "obstacle"]) {
        for (let i = currentArea.objects[type].length - 1; i >= 0; i--) {
            const obj = currentArea.objects[type][i];
            const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = points(obj);
            const mouse = point(e);

            const outer = pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer });
            const up = pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y0 + selectBuffer });
            const left = pointInRect(mouse, { x: x0 - selectBuffer, y: y0 - selectBuffer }, { x: x0 + selectBuffer, y: y1 + selectBuffer });
            const down = pointInRect(mouse, { x: x0 - selectBuffer, y: y1 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer });
            const right = pointInRect(mouse, { x: x1 - selectBuffer, y: y0 - selectBuffer }, { x: x1 + selectBuffer, y: y1 + selectBuffer });
            const middle = pointInRect(mouse, { x: x0, y: y0 }, { x: x1, y: y1 });

            if (up) {
                if (left) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "ul";
                } else if (right) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "ur";
                } else {
                    canvas.style.cursor = "ns-resize";
                    selectMode = "u";
                }
            } else if (left) {
                if (up) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "ul";
                } else if (down) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "dl";
                } else {
                    canvas.style.cursor = "ew-resize";
                    selectMode = "l";
                }
            } else if (down) {
                if (left) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "dl";
                } else if (right) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "dr";
                } else {
                    canvas.style.cursor = "ns-resize";
                    selectMode = "d";
                }
            } else if (right) {
                if (up) {
                    canvas.style.cursor = "nesw-resize";
                    selectMode = "ur";
                } else if (down) {
                    canvas.style.cursor = "nwse-resize";
                    selectMode = "dr";
                } else {
                    canvas.style.cursor = "ew-resize";
                    selectMode = "r";
                }
            } else if (middle) {
                canvas.style.cursor = "grab";
                selectMode = "m";
            } else {
                canvas.style.cursor = "initial";
                selectMode = null;
            }

            if (outer) return;
        }
    }
    canvas.style.cursor = "initial";
});
canvas.addEventListener("contextmenu", e => {
    if (e.target === contextmenu) return;
    e.preventDefault();

    contextmenu.style.left = e.x + 1 + "px";
    contextmenu.style.top = e.y + 1 + "px";

    if (selectedObject) show(contextBtns.objectActions);
    else hide(contextBtns.objectActions);

    show(contextmenu);
});
document.addEventListener("click", e => {
    if (e.target === contextmenu || e.target.parentNode === contextmenu && e.button === 2) return;
    if (e.target === canvas && e.button === 2) return;
    hide(contextmenu);
});
document.addEventListener("keydown", e => {
    if (e.target instanceof HTMLInputElement) return;
    if (e.key.toLowerCase() === othercontrols[7]) renderSettings.render.hitbox = !renderSettings.render.hitbox;
});
togglemenu.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});
togglebottommenu.addEventListener("click", () => {
    bottommenu.classList.toggle("hidden");
});
downloadBtn.addEventListener("click", () => {
    if (!map.settings.name) map.settings.name = prompt("Map name?");
    if (map.settings.name === null) return;
    if (!map.settings.creator) map.settings.creator = prompt("Map creator's username in skap?");
    if (map.settings.creator === null) return;
    download(map.settings.name || "map");
});
obstacleBtn.addEventListener("click", addObstacle);
lavaBtn.addEventListener("click", addLava);
slimeBtn.addEventListener("click", addSlime);
iceBtn.addEventListener("click", addIce);

contextBtns.obstacle.addEventListener("click", addObstacle);
contextBtns.lava.addEventListener("click", addLava);
contextBtns.slime.addEventListener("click", addSlime);
contextBtns.ice.addEventListener("click", addIce);
contextBtns.block.addEventListener("click", addBlock);
contextBtns.area.addEventListener("click", () => addArea());

contextBtns.delete.addEventListener("click", () => {
    if (selectedObject && confirm("Are you sure you want to delete this object?")) {
        let arr = currentArea.objects[selectedObject.type];
        if (arr.includes(selectedObject)) {
            arr.splice(arr.indexOf(selectedObject));
            selectedObject = null;
        }
    }
});

addArea("Home");



// Start rendering
(function run() {
    render();
    window.requestAnimationFrame(run);
})();









/**
 * @param {SkapObject} obj
 * @returns {[VectorLike, VectorLike]}
 */
function points(obj) {
    return [
        {
            x: Math.round(canvas.width / 2 + camScale * (obj.pos.x - camX)),
            y: Math.round(canvas.height / 2 + camScale * (obj.pos.y - camY))
        },
        {
            x: Math.round(canvas.width / 2 + camScale * (obj.pos.x + obj.size.x - camX)),
            y: Math.round(canvas.height / 2 + camScale * (obj.pos.y + obj.size.y - camY))
        }
    ];
}
/**
 * @param {MouseEvent} e 
 * @returns {VectorLike}
 */
function point(e) {
    return { x: e.offsetX, y: e.offsetY };
}
/**
 * @param {VectorLike} point 
 * @param {VectorLike} point0 
 * @param {VectorLike} point1 
 */
function pointInRect(point, point0, point1) {
    return point.x > point0.x && point.x < point1.x && point.y > point0.y && point.y < point1.y;
}
/**
 * @param {Element} element 
 */
function hide(element) {
    element.classList.add("hidden");
}
/**
 * @param {Element} element 
 */
function show(element) {
    element.classList.remove("hidden");
}