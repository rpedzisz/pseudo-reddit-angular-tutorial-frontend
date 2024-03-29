import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { SubredditService } from 'src/app/subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {
  subreddits!: Array<SubredditModel>;
  displayViewAll: boolean = true;

  constructor(private subredditService: SubredditService) {
   
   }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      if(data.length>= 11)
    {
      this.subreddits = data.splice(0,10)
      this.displayViewAll = true
    }
    else{
      this.subreddits = data;
    }

    })
  }

}
