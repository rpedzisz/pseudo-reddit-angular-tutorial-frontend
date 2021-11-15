import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentModel } from 'src/app/comment/comment-model';
import { CommentService } from 'src/app/comment/comment.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentModel: CommentModel;
  comments: CommentModel[] = [];
  userNm: string;
  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router,
    private localStorage: LocalStorageService) {
    this.postId = this.activateRoute.snapshot.params['id'];

    this.userNm = localStorage.retrieve('username')
      this.post = {
        description: '',
        postName: '',
        userName: this.userNm,
        url: '',
        subredditName: '',
        voteCount: 0,
        commentCount: 0,
        duration: '',
        id: this.postId
      }

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
   
    this.commentModel = {
      text: '',
      postId: this.postId,
      userName: this.userNm,

    };

  }

  ngOnInit(): void {
    
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentModel.text = this.commentForm.get('text')?.value;

    
    console.log(this.commentModel)

    this.commentService.postComment(this.commentModel).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      //this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

}