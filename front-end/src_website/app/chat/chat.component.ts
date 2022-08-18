import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import *  as io from 'socket.io-client';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DataService } from "../service/data.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    createGroupForm: FormGroup;
    chatWithFriendForm: FormGroup;
    chatWithGroupForm: FormGroup;

    statusFormChat = "group";
    statusFormCreate = false;
    statusType = false;

    socket: any;
    readonly socketUrl: string = 'localhost:8000';

    ownUser: any = [];

    listAllTextChatWithFriend: any = [];
    listAllTextChatWithGroup: any = [];

    dataChatingFriend: any = [];
    dataChatingGroup: any = [];

    dataFriend: any = [];
    listPeopleOnline: any = [];
    listPeopleOffline: any = [];
    listAllPeople: any = [];
    listUserNamePeople: any = [];
    chatPeople: any = [];

    listPeopleInGroup: any = [];
    chatGroup: any = [];
    allGroup: any = [];

    // ====================================Handle Dom===================================
    active_group = false;
    value_active_group:any;
    active_friend = false;
    value_active_friend:any;

    // ====================================End Handle DOM================================

    constructor(
        private chatService: ChatService,
        public authService: AuthService,
        private router: Router,
        public fb: FormBuilder,
        private dataService: DataService

    ) {
        this.socket = io(this.socketUrl);
        this.getUser();                     // gui socket len server

        this.socket.on("Server-send-userOnline", data => {
            // console.log(data);

            this.listPeopleOnline = [];
            this.listPeopleOffline = [];

            // get listPeopleOnline
            for (var i = 0; i < this.listAllPeople.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (this.listAllPeople[i].name == data[j]) {
                        this.listPeopleOnline.push(this.listAllPeople[i]);
                        break;
                    } else {
                        if (j == data.length - 1) {
                            this.listPeopleOffline.push(this.listAllPeople[i]);
                        }
                        continue;
                    }
                }
            }
            // console.log(this.listPeopleOnline);
            // console.log(this.listPeopleOffline);

            this.getListPeopleInGroupOnlineOffline(this.listPeopleOnline);
        });

        this.socket.on("group-send-data", (data) => {
            console.log(data);
            for (var i = 0; i < this.chatGroup.length; i++) {
                if (this.chatGroup[i].nameGroup == data.group) {
                    this.chatGroup[i].textGroup.push({
                        idUser: this.chatGroup[i].textGroup.length + 1,
                        nameUser: data.user,
                        content: data.data,
                    });
                    console.log(this.chatGroup[i].textGroup);
                    if (this.chatGroup[i].idGroup == null) {
                        this.chatService.createChatWithGroup({
                            id: this.chatGroup[i].textGroup.length + 1,
                            group: this.chatGroup[i].nameGroup,
                            user: this.chatGroup[i].nameUserInGroup,
                            text: this.chatGroup[i].textGroup,
                        })
                    } else {
                        this.chatService.updateTextInGroup(
                            this.chatGroup[i].idGroup, {
                            // id:this.chatGroup[i].idGroup,
                            // group:this.chatGroup[i].nameGroup,
                            // user:this.chatGroup[i].nameUserInGroup,
                            text: this.chatGroup[i].textGroup
                        }
                        ).subscribe();
                    }
                    break;
                }
            }
        });

        this.socket.on("friend-send-data", (data) => {
            console.log(data);
            for (var i = 0; i < this.chatPeople.length; i++) {
                if (this.chatPeople[i].dataPeople.name == data.user) {
                    this.chatPeople[i].textPeople.push({
                        idUser: this.chatPeople[i].textPeople.length + 1,
                        nameUser: data.user,
                        content: data.data,
                    });
                    // console.log(this.chatPeople[i].textPeople);
                    break;
                }
            }
        });

    }

    ngOnInit() {
        this.mainForm();
    }

    getUser() {
        this.authService.getFavorite().subscribe((user) => {
            this.ownUser = user[0];
            // console.log(this.ownUser.name);
            this.chatGroup.nameGroup = this.ownUser.group[0];
            this.dataService.getAllUser().subscribe(data => {
                this.listAllPeople = data;
                // console.log(data);
                for (var i = 0; i < this.listAllPeople.length; i++) {
                    this.listUserNamePeople.push(this.listAllPeople[i].name);
                }
                this.chatService.getAllChatWithFriend().subscribe(data => {
                    this.listAllTextChatWithFriend = data;
                })
                this.chatService.getAllGroupFromUserName(this.ownUser.name).subscribe(group => {
                    // console.log(group);
                    // console.log("run");
                    this.sendUserToWebSocket();
                    this.getChatWithPeopleFromUserName(this.ownUser.name);
                    for (var i = 0; i < Object.keys(group).length; i++) {
                        this.listPeopleInGroup = [];
                        for (var h = 0; h < group[i].user.length; h++) {
                            for (var j = 0; j < this.listAllPeople.length; j++) {
                                if (group[i].user[h] == this.listAllPeople[j].name) {
                                    this.listPeopleInGroup.push(this.listAllPeople[j]);
                                } else {
                                    continue;
                                }
                            }
                        }
                        this.chatGroup.push({
                            idGroup: group[i].id,
                            nameGroup: group[i].group,
                            nameUserInGroup: group[i].user,
                            textGroup: group[i].text,
                            listAllPeopleInGroup: this.listPeopleInGroup,
                            listAllPeopleInGroupOnline: [],
                            listAllPeopleInGroupOffline: [],
                            GroupTyping: '',
                        })
                    }
                    // console.log(this.chatGroup);
                    this.dataChatingFriend = [];
                    this.statusFormChat = 'group';
                    this.dataChatingGroup.push(this.chatGroup[0]);
                });
            });
        });
    }

    sendUserToWebSocket() {
        // console.log(this.ownUser);
        this.socket.emit('Client-send-userName', this.ownUser.name);
        this.socket.emit('Client-send-group', this.ownUser.group);
        this.socket.emit('Client-send-friend', this.listUserNamePeople);
    }

    getListPeopleInGroupOnlineOffline(userOnline: any) {
        // console.log(this.chatGroup.length);
        // console.log(userOnline);
        for (var i = 0; i < this.chatGroup.length; i++) {
            this.chatGroup[i].listAllPeopleInGroupOnline = [];
            this.chatGroup[i].listAllPeopleInGroupOffline = [];
            for (var j = 0; j < this.chatGroup[i].listAllPeopleInGroup.length; j++) {
                for (var h = 0; h < userOnline.length; h++) {
                    // console.log(this.chatGroup[i].listAllPeopleInGroup[j].name);
                    // console.log(userOnline[h].name);
                    if (this.chatGroup[i].listAllPeopleInGroup[j].name == userOnline[h].name) {
                        this.chatGroup[i].listAllPeopleInGroupOnline.push(userOnline[h]);
                        break;
                    } else {
                        if (h == userOnline.length - 1) {
                            this.chatGroup[i].listAllPeopleInGroupOffline.push(this.chatGroup[i].listAllPeopleInGroup[j]);
                        }
                        continue;
                    }
                }
            }
        }
        // console.log(this.chatGroup);
    }

    getChatWithPeopleFromUserName(userName: any) {
        this.chatService.getChatWithPeopleFromUserName(userName).subscribe(textChat => {
            // console.log(textChat);
            for (var i = 0; i < this.listAllPeople.length; i++) {
                for (var j = 0; j < Object.keys(textChat).length; j++) {
                    if (textChat[j].user.indexOf(this.listAllPeople[i].name) >= 0) {
                        if (this.listAllPeople[i].name != this.ownUser.name) {
                            this.chatPeople.push({
                                idPeople: textChat[j].id,
                                user: textChat[j].user,
                                dataPeople: this.listAllPeople[i],
                                textPeople: textChat[j].text,
                                socketIdPeople: '',
                                peopleTyping: '',
                            });
                        } else {
                            if (textChat[j].user[0] === textChat[j].user[1]) {
                                this.chatPeople.push({
                                    idPeople: textChat[j].id,
                                    user: textChat[j].user,
                                    dataPeople: this.listAllPeople[i],
                                    textPeople: textChat[j].text,
                                    socketIdPeople: '',
                                    peopleTyping: '',
                                });
                                break;
                            } else {
                                if (j == Object.keys(textChat).length - 1) {
                                    this.chatPeople.push({
                                        idPeople: null,
                                        user: [this.ownUser.name, this.listAllPeople[i].name],
                                        dataPeople: this.listAllPeople[i],
                                        textPeople: [],
                                        socketIdPeople: '',
                                        peopleTyping: '',
                                    });
                                }
                                continue;
                            }
                        }
                        break;
                    } else {
                        if (j == Object.keys(textChat).length - 1) {
                            this.chatPeople.push({
                                idPeople: null,
                                user: [this.ownUser.name, this.listAllPeople[i].name],
                                dataPeople: this.listAllPeople[i],
                                textPeople: [],
                                socketIdPeople: '',
                                peopleTyping: '',
                            });
                        }
                        continue;
                    }
                }
            }
            // console.log(this.chatPeople);
        });
    }

    mainForm() {
        this.createGroupForm = this.fb.group({
            room: [''],
        });
        this.chatWithGroupForm = this.fb.group({
            textChatWithGroup: [''],
        });
        this.chatWithFriendForm = this.fb.group({
            textChatWithFriend: [''],
        });
    }

    createGroup() {
        this.statusFormCreate = !this.statusFormCreate;
    }

    SubmitCreateGroup() {
        this.createGroup();
    }

    showGroup(room: any) {
        this.active_group = true;
        this.value_active_group = room;
        this.active_friend = false;
        // console.log(this.value_active_group);
        this.dataChatingGroup = [];
        this.statusFormChat = 'group';
        for (var i = 0; i < this.chatGroup.length; i++) {
            if (this.chatGroup[i].nameGroup == room) {
                this.dataChatingGroup.push(this.chatGroup[i]);
                // console.log(this.dataChatingGroup);
            }
        }
    }

    SubmitChatWithGroup() {
        this.socket.emit("send-message-to-group", {
            data: this.chatWithGroupForm.value.textChatWithGroup,
            user: this.ownUser.name,
            group: this.dataChatingGroup[0].nameGroup,
        });
        this.mainForm();
    }

    showFriend(friend: any) {
        this.active_friend = true;
        this.active_group = false;
        this.value_active_friend = friend;
        // console.log(this.chatPeople);
        this.dataChatingFriend = [];
        this.statusFormChat = 'friend';
        for (var i = 0; i < this.chatPeople.length; i++) {
            if (this.chatPeople[i].dataPeople.name == friend) {
                this.dataChatingFriend.push(this.chatPeople[i]);
                // console.log(this.dataChatingFriend);
            }
        }
    }

    SubmitChatWithFriend() {
        if (this.dataChatingFriend[0].dataPeople.name != this.ownUser.name) {
            console.log(this.chatWithFriendForm.value.textChatWithFriend);
            this.socket.emit("send-message-to-friend", {
                data: this.chatWithFriendForm.value.textChatWithFriend,
                user: this.ownUser.name,
                friend: this.dataChatingFriend[0].dataPeople.name,
            });
            for (var i = 0; i < this.chatPeople.length; i++) {
                if (this.chatPeople[i].dataPeople.name == this.dataChatingFriend[0].dataPeople.name) {
                    this.chatPeople[i].textPeople.push({
                        idUser: this.chatPeople[i].textPeople.length + 1,
                        nameUser: this.ownUser.name,
                        content: this.chatWithFriendForm.value.textChatWithFriend,
                    });
                    // console.log( this.chatPeople[i].textPeople);
                    if (this.chatPeople[i].idPeople == null) {
                        // console.log(this.chatPeople.length + 1);
                        this.chatService.createChatWithFriend({
                            id: this.listAllTextChatWithFriend.length + 1,
                            user: this.chatPeople[i].user,
                            text: this.chatPeople[i].textPeople
                        }).subscribe(() => {
                            this.chatPeople[i].idPeople = this.listAllTextChatWithFriend.length + 1;
                        });
                    } else {
                        // console.log(this.chatPeople);
                        this.chatService.updateChatWithFriend(
                            this.chatPeople[i].idPeople, {
                            text: this.chatPeople[i].textPeople
                        }).subscribe();
                    }
                    break;
                }
            }
        } else {
            for (var i = 0; i < this.chatPeople.length; i++) {
                if (this.chatPeople[i].dataPeople.name == this.dataChatingFriend[0].dataPeople.name) {
                    this.chatPeople[i].textPeople.push({
                        idUser: this.chatPeople[i].textPeople.length + 1,
                        nameUser: this.ownUser.name,
                        content: this.chatWithFriendForm.value.textChatWithFriend,
                    });
                    // console.log(this.chatPeople[i]);
                    if (this.chatPeople[i].idPeople == null) {
                        // console.log(this.chatPeople[i]);
                        this.chatService.createChatWithFriend({
                            id: this.listAllTextChatWithFriend.length + 1,
                            user: this.chatPeople[i].user,
                            text: this.chatPeople[i].textPeople
                        }).subscribe(() => {
                            this.chatPeople[i].idPeople = this.listAllTextChatWithFriend.length + 1;
                            console.log(this.chatPeople[i]);        //idPeople van la null
                        });
                    } else {
                        this.chatService.updateChatWithFriend(
                            this.chatPeople[i].idPeople, {
                            text: this.chatPeople[i].textPeople,
                        }).subscribe(() => {
                            console.log(this.chatPeople[i]);
                        });
                    }
                    // console.log( this.chatPeople[i].textPeople);
                    break;
                }
            }
            // console.log(this.chatWithFriendForm.value.textChatWithFriend)
        }


        this.mainForm();
    }

    logOut() {
        this.socket.emit('Log-out', this.ownUser.name);
        this.router.navigateByUrl('/');
    }

    addFriend(nameFriend: any) {
        this.ownUser.friend.push(nameFriend);
        this.chatService.addFriend(this.ownUser.id, { friend: this.ownUser.friend }).subscribe(() => {

        });
        this.dataService.getUserFromName(nameFriend).subscribe((unFriend) => {
            // console.log(unFriend);
            unFriend[0].friend.push(this.ownUser.name);
            console.log(unFriend);
            this.chatService.addFriend(unFriend[0].id, { friend: unFriend[0].friend }).subscribe(() => {

            });
        });
    }


}