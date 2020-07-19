import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/common/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForumPostContent } from 'src/app/common/forum-post-content';

@Component({
  selector: 'app-forum-post-content',
  templateUrl: './forum-post-content.component.html',
  styleUrls: ['./forum-post-content.component.css']
})
export class ForumPostContentComponent implements OnInit {

  currentUser: User = new User();
  forumPostContents: ForumPostContent[] = [];
  forumPostContentForm: FormGroup;
  loggedIn: string = 'no';

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedIn = localStorage.getItem('loggedIn');
    this.route.paramMap.subscribe(() =>{
      this.displayContentsForPost();
    })
    this.forumPostContentForm = new FormGroup({
      'postContents': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ])
    })
  }

  get postContents() {return this.forumPostContentForm.get('postContents');}

  displayContentsForPost() {
    const theContentsId: number = +this.route.snapshot.paramMap.get('id');

    this.forumService.getForumPostContentsById(theContentsId).subscribe(
      data => {
        this.forumPostContents = data;
      }
    );
  }

  deleteForumPost(id: number){
    this.forumService.deleteForumPostContent(id).subscribe(
      () => console.log(`Forum post content with id ${id} is deleted`)
    );
    window.location.reload();
  }

  onSubmit(postForm){

    const theContentsId: number = +this.route.snapshot.paramMap.get('id');    

    let newForumPostContent: ForumPostContent = new ForumPostContent();
    newForumPostContent.postContent = postForm.postContents;
    newForumPostContent.createdBy = this.currentUser.login;
    newForumPostContent.forumPostId = theContentsId;

    this.forumService.saveForumPostContents(newForumPostContent).subscribe(
      (data: ForumPostContent) =>{
        console.log(data);
        this.forumPostContentForm.reset();
      }
    );
  }

}
