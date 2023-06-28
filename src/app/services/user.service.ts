import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = env.url;
  constructor(private http: HttpClient) { }

  register(dto: RegisterDto){
    return this.http.post(`${this.url}/User/register`, dto);
  }

  login(credentioalns: any) {
    return this.http.post(`${this.url}/User/login`, credentioalns);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLogedIn(){
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }

  isOwner(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 1){
      return true;
    }
    return false;
  }

  hasImage(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.image){
      return true;
    }
    return false;
  }
  hasEImage(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.image === null){
      return true;
    }
    return false;
  }

  isEmployee(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 2){
      return true;
    }
    return false;
  }

  isGuest(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 3){
      return true;
    }
    return false;
  }

  getUserById(id: string){
    return this.http.get(`${this.url}/User/get-by-id/${id}`);
  }

  updateUser(id: string, dto: UpdateDto){
    return this.http.put(`${this.url}/User/update/${id}`, dto);
  }

  changePassword(id: string, dto: Pass){
    return this.http.put(`${this.url}/User/change-password/${id}`, dto);
  }

  getAllUsers(){  
    return this.http.get(`${this.url}/User/all-approved`);
  }

  getUsers(){  
    return this.http.get(`${this.url}/User/all`);
  }
  

  deleteUser(id: string){
    return this.http.delete(`${this.url}/User/delete/${id}`);
  }

  getNotApproved(){
    return this.http.get(`${this.url}/User/all-unapproved`);
  }

  approve(id: string){
    return this.http.post(`${this.url}/User/approve/${id}`, null);
  }
}

export interface RegisterDto{
  firstName: string;
  lastName: string;
  userName: string;
  roleId: number;
  password: string;
}

export interface UpdateDto{
  firstName: string;
  lastName: string;
  image: string;
}

export interface Pass{
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

}