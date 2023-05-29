import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcap=textureLoader.load('/textures/matcaps/8.png')
//console.log(matcap)
/**
 * Font
 */
// const helper=new THREE.AxesHelper()
// scene.add(helper)
const loader = new FontLoader();
const font = loader.load(
	// resource URL
	'fonts/helvetiker_regular.typeface.json',

	// onLoad callback
	function ( font ) {
		// do something with the font
        const text=new TextGeometry(
            'Moataz Alaa',
            {
                font,
                size:.5,
                height:.2,
                curveSegments:6,
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:.02,
                bevelOffset:0,
                bevelSegments:2
            }
        )
        const textMaterial=new THREE.MeshNormalMaterial({matcap:matcap})
        text.computeBoundingBox()
        text.translate(
            -text.boundingBox.max.x*.5,
            -text.boundingBox.max.y*.5,
            -text.boundingBox.max.y*.5,
        )
        //textMaterial.wireframe=true
        const textMesh=new THREE.Mesh(text,textMaterial)
        scene.add(textMesh)
        

        const toursGeomentry=new THREE.TorusGeometry(.3,.2,20,45)
        const toursMaterial=new THREE.MeshNormalMaterial({matcap:matcap})
        for(let i=0;i<=200;i++){
            const tours=new THREE.Mesh(toursGeomentry,toursMaterial)
            tours.position.x=(Math.random()-.5)*10
            tours.position.y=(Math.random()-.5)*10
            tours.position.z=(Math.random()-.5)*10

            tours.rotation.x=Math.random()*Math.PI
            tours.rotation.y=Math.random()*Math.PI

            const scale=Math.random()
            tours.scale.set(scale,scale,scale)



            scene.add(tours)
        }
	},)

    



/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()