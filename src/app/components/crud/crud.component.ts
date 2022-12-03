import { Component } from '@angular/core';
import { UserServiceService } from "../../Services/user-service.service";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent {
  constructor(private UserService: UserServiceService){

  }
  isOpen: boolean = false;
  tbData: Array<Users> = [];
  imageInput:any = "";
  data:Users = {
    id: "",
    FirstName: "",
    Gender: "",
    Address: "",
    Qualification: "",
    ProfileImage: "",
    LastName: "",
    DOB: "",
    LanguageKnown: [
      false,false,false,false,false,false
    ],
    OtherLanguage: "",
    Specialization: "",
    Contact: "",
    age: 0,
    language: "",
    profileImage: ""
  };
  ngOnInit(){
    this.tbData = this.UserService.getUsers();

  }
  concatLanguage = () => {
    this.data.language = "";
    for(let child in this.data.LanguageKnown){
      if(this.data.LanguageKnown[child] && parseInt(child) != 5){
        if(this.data.language != ""){
          this.data.language += ",";
        }
        this.data.language += this.LanguageKnown[child];
      }
    }
    if(this.data.OtherLanguage != ""){
      if(this.data.language != ""){
        this.data.language += ",";
      }
      this.data.language += this.data.OtherLanguage;
    }
    
  }
  checkboxCheck = (event:any) => {
    if(event.target.checked){
      if(event.target.value == 5){
        this.isOpen = true;
      }
    }else{
      if(event.target.value == 5){
        this.isOpen = false;
      }
    }
  }
  handleUpload = (event: any) => {
    const files = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
     
      this.data.profileImage = reader.result as string;
    }
  }
  handleEdit = (event: any,id: any) => {
    event.preventDefault();
    let localData = this.UserService.findById(id);
    this.data = localData;
    this.imageInput = "";

  }
  handleDelete = (event: any,id: any) => {
    event.preventDefault();
    this.UserService.deleteById(id);
    this.tbData = this.UserService.getUsers();
    this.data = this.UserService.reset(this.data);
    this.imageInput = "";

  }
  saveChanges = (form:any) => {
    this.concatLanguage();
    console.log(this.data);
    this.UserService.storeUsers(this.data);
    this.tbData = this.UserService.getUsers();
    this.data = this.UserService.reset(this.data);
    this.imageInput = "";
    form.reset();
  }
  Qualification = [
    "Senior High School",
    "Associate Degree",
    "Bachelor Degree",
    "Master Degree"
  ]
  LanguageKnown = [
    'English',
    'Canada',
    'Tamil',
    'Malayalam',
    'Hindi',
    'Others'
  ]
}
export interface Users {
  id: "",
  FirstName: "",
  Gender: "",
  Address: "",
  Qualification: "",
  ProfileImage: "",
  LastName: "",
  DOB: "",
  LanguageKnown: [
    false,false,false,false,false,false
  ],
  OtherLanguage: "",
  Specialization: "",
  Contact: "",
  age: 0,
  language: string,
  profileImage: any

}
