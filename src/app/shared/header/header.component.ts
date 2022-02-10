import { Component, OnInit } from '@angular/core';
import { User } from "../../core/models/user.model";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.$currentUser
      .subscribe(data => this.user = data);
  }

}
