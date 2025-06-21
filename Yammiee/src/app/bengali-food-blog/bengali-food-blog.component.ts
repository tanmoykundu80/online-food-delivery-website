import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
selector: 'app-bengali-food-blog',
templateUrl: './bengali-food-blog.component.html',
styleUrls: ['./bengali-food-blog.component.css']
})
export class BengaliFoodBlogComponent implements OnInit {
bengaliId: string | null = null;

constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
this.bengaliId = this.route.snapshot.paramMap.get('id');
}
}