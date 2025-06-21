import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
selector: 'app-chinese-blog',
templateUrl: './chinese-blog.component.html',
styleUrls: ['./chinese-blog.component.css']
})
export class ChineseBlogComponent implements OnInit {
chineseId: string | null = null;

constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
this.chineseId = this.route.snapshot.paramMap.get('id');
}
}