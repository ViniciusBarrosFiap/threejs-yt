import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();

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
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
//Instanciando o plane na mesh com a geometry e o material
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper)


//Função responsavel por fazer a animação do cubo adicionado na cena
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    //A função será chamada em loop, então sempre que a posição estiver alterando ele já irá sendo renderizado na tela
    renderer.render(scene, camera); //renderizando a cena e a camera no canvas
}
//Colocando a animação para rodar em loop
renderer.setAnimationLoop(animate)
