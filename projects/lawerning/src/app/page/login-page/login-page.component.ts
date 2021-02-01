import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../model/login-request';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  // username: string = "";
  // password: string = "";
  data = new LoginRequest();

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    this.userService.loginUser(this.data).subscribe(
      (value) => {
        let result = value.result;

        this.authService.setLoginResponse(result);
        console.log(this.authService.getLoginResponse().token);

        if (result.role.code == 'RL-003') {
          this.router.navigateByUrl('/home-teacher');
        } else if (result.role.code == 'RL-004') {
          this.router.navigateByUrl('/home-student');
        } else if (result.role.code == 'RL-002') {
          this.router.navigateByUrl('/home');
        }
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
