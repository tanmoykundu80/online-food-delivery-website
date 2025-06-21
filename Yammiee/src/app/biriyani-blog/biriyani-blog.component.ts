import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biriyani-blog',
  templateUrl: './biriyani-blog.component.html',
  styleUrls: ['./biriyani-blog.component.css'],
  standalone: true,
  imports: []
})
export class BiriyaniBlogComponent implements OnInit {
  biriyaniId: number = 0;
bengaliId: any;
goToBiriyaniMenu: any;

  ngOnInit(): void {
    this.biriyaniId = Number(this.route.snapshot.paramMap.get('id'));
  }

  constructor(private route: ActivatedRoute) {}
}
