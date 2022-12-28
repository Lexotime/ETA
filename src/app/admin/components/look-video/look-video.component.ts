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

	video: any = {};

	ngOnInit(): void {
		let idV = this.router.snapshot.params['id'];
		this.adminService.getVideoLink(idV).subscribe( s => {
			s.forEach(ss => {
				this.video = ss.payload.doc.data();
			})
			console.log(this.video);
			
		})
	}
}
