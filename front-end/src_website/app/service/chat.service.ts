import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    messages: Subject<any>;
    useURL: string = 'http://localhost:4000/user';
    chatWithFriendURL: string = 'http://localhost:4000/chatWithFriend';
    groupURL: string = 'http://localhost:4000/group';

    constructor(
        private http: HttpClient
    ) {}

    getAllGroupFromUserName(nameGroup){
        return this.http.get(`${this.groupURL}/name/${nameGroup}`);
    }

    getAllGroup(){
        return this.http.get(`${this.groupURL}`);
    }

    getFriendFromUserName(name){
        return this.http.get(`${this.useURL}/detailUser/name/${name}`);
    }

    addFriend(id, listFriend){
        return this.http.put(`${this.useURL}/addFriend/${id}`, listFriend);
    }

    unFriend(id, listFriend){
        return this.http.put(`${this.useURL}/addFriend/${id}`, listFriend);
    }

    leaveGroup(id, listGroup){
        return this.http.put(`${this.groupURL}/leaveGroup/${id}`, listGroup);
    }

    getGroupFromName(nameGroup:any){
        return this.http.get(`${this.groupURL}/nameGroup/${nameGroup}`);
    }

    updateTextInGroup(id, data) {
        console.log(data);
        return this.http.put(`${this.groupURL}/update/${id}`, data);
    }

    // =========================================chat with friend=====================

    //getAllChat
    getAllChatWithFriend() {
        return this.http.get(`${this.chatWithFriendURL}`);
    }

    createChatWithFriend(data:any) {
        return this.http.post(`${this.chatWithFriendURL}/create`, data);
    }

    createChatWithGroup(data:any) {
        return this.http.post(`${this.groupURL}/create`, data);
    }

    //getChatFromId
    getChatWithPeopleFromUserName(userName: String) {
        return this.http.get(`${this.chatWithFriendURL}/getChatWithFriend/${userName}`);
    }

    //updateChat
    updateChatWithFriend(id, data) {
        console.log(data);
        return this.http.put(`${this.chatWithFriendURL}/update/${id}`, data);
    }

    //deleteChat
    deleteChatWithFriend(id: any): Observable<any> {
        return this.http.delete(`${this.chatWithFriendURL}/delete/${id}`);
    }

    sendMsg(msg){
        this.messages.next(msg);
    }
}
