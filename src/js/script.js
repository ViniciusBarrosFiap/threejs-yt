import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import nebula from "../img/nebula.jpg";
import stars from "../img/stars.jpg";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

const monkeyUrl = new URL("../assets/monkey.glb", import.meta.url);

const renderer = new THREE.WebGLRenderer(); //Instanciando o renderizador (canvas)


renderer.shadowMap.enabled = true;
//define a área da tela que será renderizado (largura e altura)
renderer.setSize(window.innerWidth, window.innerHeight);

//adiciona o elemento canvas no body do DOM
document.body.appendChild(renderer.domElement);

//Instanciando a cena que será capturada pela camera
//A cena é o principal, onde irá ficar posicionado os objetos e onde a camera perpectiva ou ortografica irão capturar a cena
const scene = new THREE.Scene(); //cena

//Instanciando a perspective camera(simula camera da vida real)
//Parâmetros: 
//Field Of View = campo de visão vertical da câmera entre 50 e 75 graus, 
//Aspect Ratio = razão da largura pela altura (largura/altura) da tela,
//Near Plane = distancia minima da câmera para que os objetos comecem a ser renderizados,
//Far Plane = distancia máxima que os objetos podem ficar da câmera até pararem de ser renderizados
const camera = new THREE.PerspectiveCamera(
    75, //angulo vertical
    window.innerWidth / window.innerHeight, //razão largura / altura
    0.1, //renderiza de perto
    1000 //deixa de renderizar de longe
);

//Permite manipular a perspective camera de acordo com o movimento do mouse
//parâmetros: câmera, canvas(renderizador)
const orbit = new OrbitControls(camera, renderer.domElement);

//Adiciona um guia na cena
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

//podemos definir a posição da camera usando o método set()
//parâmetros: x, y, z
camera.position.set(-10, 30, 30);
orbit.update(); //Atualiza a posição de acordo que é movimentado

//FASE 1 - Instanciando a geometria de uma box
const boxGeometry = new THREE.BoxGeometry();
//FASE 2 - Instanciando o máterial que será usado na box geometry
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
//FASE 3 - Instanciando a box com a geometria e o material instanciados
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//adicionando a box na cena
scene.add(box);

//Instanciando um plane geometry definindo o tamanho
const planeGeometry = new THREE.PlaneGeometry(30, 30);
//Instanciando o material que será usado no plane
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
//Instanciando o plane na mesh com a geometry e o material
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI; //Modificando a rotação do plane
plane.receiveShadow = true;



//Adicionando o grid para auxiliar
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

//Instanciando o geometry de uma esfera - radius 4
const sphereGeometry = new THREE.SphereGeometry(2, 50, 50);

//Interface para mudança da cor da sphere na aplicação
const gui = new dat.GUI();

//Objeto para armazenar as opções da esfera (cor e wireframe, etc)
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1,
};

//Instanciando o material que será usando na esfera usando as options
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: options.sphereColor,
    wireframe: options.wireframe //mostra as linhas para facilitar a visualização da geometria
});

//Instanciando a esfera na geometria e o material instanciados
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
//Modificando a posição da sphere
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

//Instanciando a luz ambiente
//A luz só irá funcionar nos objetos se estivrem com o material correto para receber a luz
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(directionalLightHelper);


// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper)

const spotLight = new THREE.SpotLight(0xFFFFFF, 300);
scene.add(spotLight);
spotLight.position.set(-50,50,0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

// renderer.setClearColor(0xFFEA00);

const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars
]);

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
    // color: 0x00FF00,
    // map: textureLoader.load(nebula),
});

const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),


];
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);
// box2.material.map = textureLoader.load(nebula);

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

const sphere2Geometry = new THREE.SphereGeometry(4);
// const vShader = `
//     void main() {
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;
// const fShader = `
//     void main() {
//         gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
//     }
// `;


const sphere2Material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10);

const assetLoader = new GLTFLoader();

assetLoader.load(monkeyUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, 0)

}, undefined, function(error){
    console.error(error);
})



//adicionando o color picker na interface 
gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
    sphere.material.needsUpdate = true;
});
//adicionando o wireframe na interface
gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
    sphere.material.needsUpdate = true;
})
//adicionando um slider para modificar a velocidade da animação na interface
gui.add(options, 'speed', 0, 0.1);
gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 1, 500);

let step = 0;


const mousePosition = new THREE.Vector2();
window.addEventListener("mousemove", function(e){
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1; 
});
const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;
box2.name = "theBox";

//Função responsavel por fazer a animação do cubo adicionado na cena
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    // console.log(intersects);

    for(let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.id ===  sphereId) {
            intersects[i].object.material.color.set(0xFF0000);
        }
        if(intersects[i].object.name === 'theBox') {
            intersects[i].object.rotation.x = time / 1000;
            intersects[i].object.rotation.y = time / 1000;
        }
    };

    plane2.geometry.attributes.position.array[0] = 10 * Math.random();
    plane2.geometry.attributes.position.array[1] = 10 * Math.random();
    plane2.geometry.attributes.position.array[2] = 10 * Math.random();
    plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
    plane2.geometry.attributes.position.needsUpdate = true;


    //A função será chamada em loop, então sempre que a posição estiver alterando ele já irá sendo renderizado na tela
    renderer.render(scene, camera); //renderizando a cena e a camera no canvas
};
//Colocando a animação para rodar em loop
renderer.setAnimationLoop(animate);

window.addEventListener('resize', ()=> {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})