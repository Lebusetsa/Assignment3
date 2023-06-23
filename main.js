import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import roofTexture from './joang.jpg';
import floorTexture from './ground.jpg';
import wallTexture from './wall.jpg';
import ironsheetTexture from './ironsheet.jpg';
import stoneTexture from './stones.jpg';
import brickTexture from './brickwall.jpg';
import doorTexture from './door.jpg';
import skyTexture from './sky.jpg';


const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const backgroundTecture = textureLoader.load(skyTexture);

scene.background = backgroundTecture;


const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
  );

	// soft white light
	
  const light = new THREE.AmbientLight( 0x404040 ); 
scene.add( light );

  
  const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

  // Create a controls object to manage the camera movement
const controls = new PointerLockControls(camera, document.body);

// Add the controls to the scene
scene.add(controls.getObject());

const onKeyDown = function(event){

  switch(event.keyCode){

    case 37:
      controls.moveRight(-1);
      break;

    case 38:
      controls.moveForward(1);
      break;

      case 39:
        controls.moveRight(1);
        break;

    case 40:
        controls.moveForward(-1);
      break;
   
   
  }
}

document.addEventListener("keydown",onKeyDown)

// Set up the pointer lock event listeners
document.addEventListener("click", function () {
	controls.lock();
  });

  
controls.addEventListener("lock", function () {
	// The pointer is now locked, enable the controls
	controls.enabled = true;
  });

  controls.addEventListener("unlock", function () {
	// The pointer is now unlocked, disable the controls
	controls.enabled = false;
  });


  const floorGeometry= new THREE.PlaneGeometry( 50,50);
  const floorMaterial = new THREE.MeshBasicMaterial( { map:textureLoader.load(floorTexture)} );
  const floor = new THREE.Mesh( floorGeometry, floorMaterial );

  floor.position.y = -2.5;

  floor.rotation.x = -Math.PI/2;
  

const roofMaterial = new THREE.MeshBasicMaterial({map:textureLoader.load(ironsheetTexture)});
const wallMaterial = new THREE.MeshBasicMaterial({ map:textureLoader.load(wallTexture)} );


const roofGeometry = new THREE.ConeGeometry(2,1,4);
const wallGeometry = new THREE.BoxGeometry(2,2,2);


const roof2 = new THREE.Mesh(roofGeometry,roofMaterial);
const wall = new THREE.Mesh(wallGeometry,wallMaterial);

wall.position.y = -1.5;
roof2.position.y = -0.0;

roof2.rotation.yb= Math.PI/4;

const house2 = new THREE.Group();
house2.add(roof2,wall);
house2.position.set(-8,0,5)
scene.add(house2)

//kraal material and geometry

const kraalMaterial = new THREE.MeshBasicMaterial({map: textureLoader.load(stoneTexture)});
const kraalGeometry = new THREE.BoxGeometry(4,1,0.5);
const kraalFrontGeometry = new THREE.BoxGeometry(3,1,0.5)

//creating kraal walls
const side1 = new THREE.Mesh(kraalFrontGeometry,kraalMaterial);
const side2 = new THREE.Mesh(kraalGeometry,kraalMaterial);
const side3 = new THREE.Mesh(kraalGeometry,kraalMaterial);
const side4 = new THREE.Mesh(kraalGeometry,kraalMaterial);

side1.rotateY(130.4,1);
side2.rotateY(130.4,1);

//kraal wall positioning
side1.position.set(-1.9,0,0.9)
side2.position.set(1.7,0,0.5)
side3.position.set(0,0,2.6)
side4.position.set(-0.15,0,-1.7)

const kraal  = new THREE.Group;
kraal.add(side1,side2,side3,side4)
scene.add(kraal);

//rotating kraal
kraal.rotateY(-130.4,1)
kraal.position.set(4,-1.5,-2)

//creating tree materials geometries
  const trunkGeometry = new THREE.CylinderGeometry(0.2,0.2,4,3);
  const leavesGeometry = new THREE.SphereGeometry(1,5,6);
  
  const trunkMaterial = new THREE.MeshBasicMaterial({color:0x8b4513})
  const leavesMaterial = new THREE.MeshBasicMaterial({color:'green'})
  
  const trunkMesh = new THREE.Mesh(trunkGeometry,trunkMaterial);
  const leavesMesh = new THREE.Mesh(leavesGeometry,leavesMaterial);

  //positioning tree
  
  leavesMesh.position.set(3,2,0);
  trunkMesh.position.set(3,0,0);

  //creating mokhoro materials and geometries
  const geometry = new THREE.CylinderGeometry( 1.5,1.5,2 );
  const material = new THREE.MeshBasicMaterial( {map: textureLoader.load(brickTexture)});
  const cylinder = new THREE.Mesh( geometry, material );
  cylinder.position.y = -1.5;
  
  const geometry2 = new THREE.PlaneGeometry( 0.5,1);
  const material2 = new THREE.MeshBasicMaterial(  {map: textureLoader.load(doorTexture)});
  const door = new THREE.Mesh( geometry2, material2 );
  door.position.z = 1.5;
  door.position.y = -1.925;
  
  const rightWindowGeometry= new THREE.PlaneGeometry( 0.5,0.5,2);
  const rightWindowMaterial = new THREE.MeshBasicMaterial( { color: "tranparent"} );
  const rightWindow = new THREE.Mesh( rightWindowGeometry, rightWindowMaterial );
  rightWindow.position.z = 1;
  rightWindow.position.y = -1.4;
  rightWindow.position.x = 1.05;
  
  const leftWindowGeometry = new THREE.PlaneGeometry( 0.5,0.5,2);
  const leftWindowMaterial = new THREE.MeshBasicMaterial( { color: "transparent"} );
  const leftWindow = new THREE.Mesh( leftWindowGeometry, leftWindowMaterial );
  
  leftWindow.position.z = 1;
  leftWindow.position.y = -1.4;
  leftWindow.position.x = -1.06;

  
  var group = new THREE.Group();
  group.add(cylinder);
  group.add(door);

  
  const geometry3 = new THREE.CylinderGeometry( 0.1,2,2.3);
  const material3 = new THREE.MeshBasicMaterial( {map: textureLoader.load(roofTexture)} );
  const roof = new THREE.Mesh( geometry3, material3 );
  roof.position.y = 0.3;
  
  var tree = new THREE.Group();
  tree.add(trunkMesh);
  tree.add(leavesMesh);

  tree.position.set(-9,0,0)
  const house = new THREE.Group();
  
  house.add(cylinder,roof,door,rightWindow,leftWindow);

  house.position.z = 2;
  house.position.x = -2;

  const loader = new GLTFLoader();
  tractorPath = new URL('./tractor.glb', import.meta.url);
  loader.load(tractorPath.href,(gltf) =>{
    
    const tractor = gltf.scene;
    tractor.scale.set(0.0011,0.0011,0.0011);
    tractor.position.set(-5.8,-2.55,9);
    tractor.rotateY(130.4,1);
    scene.add(tractor);
  });

    const cowloader = new GLTFLoader();
  cowPath = new URL('./cow.glb', import.meta.url);
  loader.load(cowPath.href,(gltf) =>{
    
    const cow = gltf.scene;
    cow.scale.set(0.002,0.002,0.002);
    cow.position.set(3.8,-0.5,-1);
    cow.rotateY(130.4,1);
   scene.add(cow);
  });

  const manloader = new GLTFLoader();
  manPath = new URL('./man.glb', import.meta.url);
  manloader.load(manPath.href,(gltf) =>{
    
    const man = gltf.scene;
    man.scale.set(0.01,0.01,0.01);
    man.position.set(3.8,-1.9,3);
    man.rotateY(130.4,1);
    scene.add(man);
  });
 
  const treeloader = new GLTFLoader();
  manPath = new URL('./tree_animate.glb', import.meta.url);
  treeloader.load(manPath.href,(gltf) =>{
    
    const treeModel = gltf.scene;
    treeModel.scale.set(0.11,0.11,0.11);
    treeModel.position.y = -1.5;
    treeModel.position.z = -1;
    scene.add(treeModel);
  });
  
  scene.add(tree,house); //adding house to the scene
  scene.add(floor,tree);//adding tree to the scene
  
  camera.position.set(-2,0,15); //camera positioning
  
  renderer.render( scene, camera );
  
  
			  function animate() {
				  requestAnimationFrame( animate );
  
				  leavesMesh.rotation.x += 0.02;
				  leavesMesh.rotation.z +=0.02;
				  renderer.render( scene, camera );
			  }
  
			  animate(); 
        onKeyDown();
  
  
  