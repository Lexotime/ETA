import { AdminService } from './../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-look-video',
  templateUrl: './look-video.component.html',
  styleUrls: ['./look-video.component.css']
})
export class LookVideoComponent implements OnInit {

	constructor (private router: ActivatedRoute, private adminService: AdminService) {}

	link!: string;

	ngOnInit(): void {

		this.adminService.getVideoLink().subscribe( s => {
			this.link = s;
		})
	}
}
