import * as THREE from 'three'

class Rocket {
    constructor(object){
        this.name = "New Rocket";
        this.children = object.children;
        this.obj = object;
        this.bBox = new THREE.Box3().setFromObject(object);
    }

    getName(){
        console.log(this.name);
    }

    insert(part){
        this.children.push(part);  
    }
}

export default Rocket;