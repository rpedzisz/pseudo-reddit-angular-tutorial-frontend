import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from './comment-model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentModel[]> {
    return this.httpClient.get<CommentModel[]>('http://localhost:8080/api/comments/by-post/' + postId);
  }

 
  postComment(commentModel: CommentModel): Observable<CommentModel> {
    return this.httpClient.post<CommentModel>('http://localhost:8080/api/comments/',
    commentModel);
  }


  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentModel[]>('http://localhost:8080/api/comments/by-user/' + name);
  }
}
