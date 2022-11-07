import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  images: string[] = [];
   
  constructor(
    private userService: UserService,
    private router: Router,
    private storage: Storage
  ) { }
  
  
  

  onClick(){
    this.userService.logout()
    .then(()=> {
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error));
  }


  //-------- Storage ---------

  ngOnInit(): void {
    this.getImages();
  }
  
  uploadImage($event:any){
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);
    
    uploadBytes(imgRef, file)
    .then(response => {
      console.log(response)
      this.getImages();
    })
    .catch(error => console.log(error)) 
  }

  getImages(){
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
    .then(async response =>{
      console.log(response);
      this.images = [];
      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
      
    })
    .catch(error => console.log(error));
    

  }
  

}
