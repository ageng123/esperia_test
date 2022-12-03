import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { 
    console.log("User Service Working");
    localStorage.setItem('users', JSON.stringify([]));
   }
   usersData:Users[] = [];
   reset(data:any){
    data = {
        id: "",
        age: 0,
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
        language: ""
      }
      return data;
   }
   getUsers(){
    let session = localStorage.getItem('users');
    let users = JSON.parse(session ?? '{[]}');
    this.usersData = users;
    return users;
   }
   findById(id: any)
   {
    let retData = this.usersData.filter(m => m.id == id);
    return retData[0];
   }
   deleteById(id: any){
    let retData = this.usersData.findIndex((m:any) => m.id == id);
    if(retData > -1){
      this.usersData.splice(retData, 1);
    }
    localStorage.setItem('users', JSON.stringify(this.usersData));

   }
   storeUsers(data: any){
    let session = localStorage.getItem('users');
    let users = JSON.parse(session ?? '{[]}');    
    if(data.id == ""){
      data.id = this.randId();
      data.age = this.calculateAge(data);
      users.push(data);
    }else{
      data.age = this.calculateAge(data);
      console.log(data);
      let index = users.findIndex((m:any) => m.id == data.id);
      console.log(index);
      console.log(users[index]);
      users[index] = data;
      console.log(users[index]);

    }
    localStorage.setItem('users', JSON.stringify(users));
   }
   randId(){
    let rand = "";
    let length = 15;
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 1; i < length; i++ ) {
      
      if(i % 5 === 0 ){
        rand += '-';
      }else{
        rand += characters.charAt(Math.floor(Math.random() * charactersLength));

      }
    }
    return rand;
   }
   calculateAge(data: any){
    var date: Date = new Date(data.DOB);
    var timeDiff = Math.abs(Date.now() - date.getTime());
    var age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    return age;
   }
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
  language: "",
  profileImage: any

}
