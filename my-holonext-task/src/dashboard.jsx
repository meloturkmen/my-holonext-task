import React from 'react';
import { Vector3, HemisphericLight, SceneLoader, ArcRotateCamera, AssetsManager,Color3,StandardMaterial } from '@babylonjs/core';
import "@babylonjs/loaders/glTF"
import {Button,AdvancedDynamicTexture} from "@babylonjs/gui"
import SceneComponent from 'babylonjs-hook'; // ^^ point to file we created above or 'babylonjs-hook' NPM.
import './App.css'


let modal;

const onSceneReady = scene => {
  var mesh;
  // This creates a camera and position it
  var camera = new ArcRotateCamera("Camera", 0, 0.8, 300, Vector3.Zero(), scene);
 
  // This creates a canvas
  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);


  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Creating material colors to change color of textures
  var testMat = new StandardMaterial("", scene);
  testMat.diffuseColor = new Color3.Blue();
  var testMat_2 = new StandardMaterial("", scene);
  testMat_2.diffuseColor = new Color3.Green();
        
  var assetsManager = new AssetsManager(scene);
  
  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");


  // Uploading gltf file
  modal = SceneLoader.ImportMesh("","scenes/office_chair/","scene.gltf" ,scene, function (newMeshes) {
    mesh = newMeshes[0]
    camera.target = mesh;
  })

  // Button creation and add functionality to change color
  var button_one = Button.CreateSimpleButton("but_one", "Green");
  button_one.width = 0.2;
  button_one.height = "40px";
  button_one.color = "white";
  button_one.background = "green";
  button_one.top = "100px";
  button_one.onPointerClickObservable.add(function(state) {
    if (state) {
      mesh.dispose();
      modal = SceneLoader.ImportMesh("","scenes/office_chair/","scene.gltf" ,scene, function (newMeshes) {
        for(var i=0;i<newMeshes.length;i++){
          newMeshes[i].material = testMat_2;
        }
        mesh = newMeshes[0]
        camera.target = mesh;
      })  
    }
  }); 

  advancedTexture.addControl(button_one);

  // Same with first one, only difference is color and position
  var button_two = Button.CreateSimpleButton("but_two", "Blue");
  button_two.width = 0.2;
  button_two.height = "40px";
  button_two.color = "white";
  button_two.background = "blue";
  button_two.top = "150px";
  button_two.onPointerClickObservable.add(function(state) {
    if (state) {
      mesh.dispose();
      modal = SceneLoader.ImportMesh("","scenes/office_chair/","scene.gltf" ,scene, function (newMeshes) {
        for(var i=0;i<newMeshes.length;i++){
          newMeshes[i].material = testMat;
        }
        mesh = newMeshes[0]
        camera.target = mesh;
      })  
    }
  }); 

  advancedTexture.addControl(button_two);
	
	assetsManager.load();
  
}

const onRender = scene => {}

export default () => (
    <div>
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} className="canvas-style" id='my-canvas'/>
    </div>
)