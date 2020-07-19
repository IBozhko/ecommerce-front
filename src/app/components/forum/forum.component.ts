import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { ForumService } from 'src/app/services/forum.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForumPost } from 'src/app/common/forum-post';
import { ForumPostContent } from 'src/app/common/forum-post-content';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  currentUser: User = new User();
  forumPosts = [];
  forumPostContents: ForumPostContent[] = [];
  forumPostForm: FormGroup;
  loggedIn: string = 'no';

  constructor(
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.forumService.getForumPostContents().subscribe(
      data => {
        this.forumPostContents = data;
      }
    );
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedIn = localStorage.getItem('loggedIn');
    this.forumService.getForumPosts().subscribe(data => this.forumPosts = data);
    this.forumPostForm = new FormGroup({
      'postName': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ])
    })
  }

  get postName() {return this.forumPostForm.get('postName');}

  onSubmit(postNameForm){
    let newForumPost: ForumPost = new ForumPost();
    newForumPost.postName = postNameForm.postName;
    newForumPost.createdBy = this.currentUser.login;

    this.forumService.saveForumPost(newForumPost).subscribe(
      (data: ForumPost) =>{
        console.log(data);
        this.forumPostForm.reset();
        window.location.reload();
      }
    );
  }

  deleteForumPost(id: number){
    for (let content of this.forumPostContents){
      if (content.forumPostId == id){
        this.forumService.deleteForumPostContent(content.id).subscribe(() => {});
      }
    }
    this.forumService.deleteForumPost(id).subscribe(() => {});
    window.location.reload();
  }
}
