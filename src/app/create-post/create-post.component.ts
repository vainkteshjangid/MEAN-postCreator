import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId: string = '';
  post: any;
  isLoading: boolean = false;

  constructor(public postsService:PostsService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = String(paramMap.get('postId'));
        this.isLoading = true;
        this.postsService.getPost(this.postId)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = { id: postData._id, title: postData.title, content: postData.content };
          });
      } else {
        this.mode = 'create';
        this.postId ='';
      }
    })
  }

  onSavePost(form: NgForm) { 
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    }
    else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    
    form.resetForm();
  }
}
