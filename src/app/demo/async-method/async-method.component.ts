import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject, Observable} from 'rxjs';
import { RestfulService } from './.././../services/restful.service'

@Component({
  selector: 'app-async-method',
  templateUrl: './async-method.component.html',
  styleUrls: ['./async-method.component.css']
})
export class AsyncMethodComponent implements OnInit {

  groups: string[] =["dsams-group","111", "Billing", "ABC"];
  validate:boolean = false;
  users;
  posts;
  comments;
  messages;
  phoneType;
  flag;

  constructor(private restService: RestfulService,
              private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.getAllData();        //everyting ordered inside this method.
    console.log("Hello11111");//if need put this log exec after getAllData. Put it inside 
  
    this.getPhoneTypes();
    this.getPhoneTypes().subscribe((r)=> {
      if (r)
         console.log(r+" Successful");
    });

  }


  //#1.Define all the regular methods
  testMegs() {
    return "11111";
  }
  getUsers() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users')
      .toPromise();
  }

  getUserPosts(userId) {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .toPromise();
  }

  getPostComments(postId) {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .toPromise();
  }

  getPhoneType() {
    return this.httpClient.get("http://localhost:8080/RegistrationApp/phoneTypes")
      .toPromise();
  }

  //#2. Define a async method
  async getAllData() {

    this.users = await this.getUsers();
    this.posts = await this.getUserPosts(this.users[0].id);
    this.comments = await this.getPostComments(this.posts[0].id);
    this.messages =  this.testMegs();
    this.phoneType = await this.restService.getPhoneType();
    this.flag = await this.restService.getFlag();

    console.log("validate before=="+this.validate);
    console.log(this.flag);
    console.log(this.users); //<==call order from here.
    console.log(this.messages);
    this.groups.forEach(group => {
      if (group ==='dsams-group')
          this.validate = this.flag;    
    });
    console.log(this.posts);
    console.log("validate after=="+this.validate);
    console.log(this.comments);
    console.log(this.phoneType);
  }



  getPhoneTypes():Observable<boolean> {
    var subject = new Subject<boolean>();   
    this.restService.getPhoneTypes()
    .subscribe(
      data => { 
        //console.log("data=="+JSON.stringify(data))
        if(data !=null) {
           subject.next(true);
        }
      },
      err => {
        console.log("Error occured: getPersonDeital()" + err)
      }
    )
    return subject.asObservable();
  }

}
