import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ForumPost } from '../common/forum-post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForumPostContent } from '../common/forum-post-content';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  urlPosts: string = 'http://localhost:8080/api/forumPosts';
  urlPostContents: string = 'http://localhost:8080/api/forumPostContents';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getForumPosts(): Observable<ForumPost[]> {
    return this.httpClient.get<GetResponseForumPosts>(this.urlPosts).pipe(map(response => response._embedded.forumPosts));
  }

  public getForumPostsByUser(userLogin: string): Observable<ForumPost[]> {

    const finalContentUrl = `${this.urlPosts}` + '/search/findByCreatedByContaining?createdBy=' + userLogin;

    return this.httpClient.get<GetResponseForumPosts>(finalContentUrl).pipe(map(response => response._embedded.forumPosts));
  }

  public getForumPostContents(): Observable<ForumPostContent[]> {
    return this.httpClient.get<GetResponseForumPostContents>(this.urlPostContents).pipe(map(response => response._embedded.forumPostContents));
  }

  public getForumPostContentsById(contentId: number): Observable<ForumPostContent[]> {

    const finalContentUrl = `${this.urlPostContents}` + '/search/findByForumPostIdContaining?forumPostId=' + contentId;

    return this.httpClient.get<GetResponseForumPostContents>(finalContentUrl).pipe(map(response => response._embedded.forumPostContents));
  }

  public saveForumPost(forumPost: ForumPost): Observable<ForumPost> {
    return this.httpClient.post<ForumPost>('http://localhost:8080/api/forumPosts', forumPost, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public saveForumPostContents(forumPostContent: ForumPostContent): Observable<ForumPostContent> {
    return this.httpClient.post<ForumPostContent>('http://localhost:8080/api/forumPostContents', forumPostContent, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public deleteForumPost(id: number){
    return this.httpClient.delete<void>(`${this.urlPosts}/${id}`);
  }

  public deleteForumPostContent(id: number){
    return this.httpClient.delete<void>(`${this.urlPostContents}/${id}`);
  }
}

interface GetResponseForumPosts {
  _embedded: {
    forumPosts: ForumPost[];
  }
}

interface GetResponseForumPostContents {
  _embedded: {
    forumPostContents: ForumPostContent[];
  }
}
