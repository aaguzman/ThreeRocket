'use strict';
import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import Rocket from './classes/rocket.js'
import Part from './classes/part.js'
import Menu from './classes/menu.js'
import './styles/main.less';
import vert from './shaders/shader.vert'
import frag from './shaders/shader.frag'

// Initial HMR Setup
if (module.hot) {
    module.hot.accept()

    module.hot.dispose(() => {
        document.querySelector('canvas').remove()
        renderer.forceContextLoss()
        renderer.context = null
        renderer.domElement = null
        renderer = null
        cancelAnimationFrame(animationId)
        removeEventListener('resize', resize)
    })
}

// Three Scene
let scene, camera, renderer, animationId, controls
let geometry, material, group, userRocket,insertMenu
function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
    )
    camera.position.z = 1000
    controls = new OrbitControls(camera)


    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    group =  new THREE.Group()
    scene.add(group)
    userRocket =  new Rocket(group)
    insertMenu = new Menu()
    insertMenu.setHtml(`<button id = "addCubeButton">Add Cube</button>`)
    document.getElementById('addCubeButton').addEventListener("click",addCube);

}


function animate() {
    animationId = requestAnimationFrame(animate)

    renderer.render(scene, camera)
}

init()
animate()

// Event listeners
function resize() {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
}

function addCube(){
    console.log("addding cube")
    let geometry = new THREE.BoxGeometry( 100, 100, 100 );
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    let cube =  new THREE.Mesh(geometry,material);
    userRocket.insert(cube);
}


addEventListener('resize', resize)
