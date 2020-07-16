import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@coin-market/data-access/authorization';
import { User } from '@coin-market/data-access/models';
import { UserFormBuilder } from '@coin-market/ui/forms';
import { ToastrService } from '@coin-market/ui/toastr';

@Component({
  selector: 'coin-market-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  isLoginFormVisible = true;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userFormBuilder: UserFormBuilder,
    private _toastr: ToastrService,
    private _activatedRoute: ActivatedRoute
  ) {}

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  ngOnInit(): void {
    this.createFormGroups();
  }

  changeForm(): void {
    console.log(this.registerFormGroup);
    this.isLoginFormVisible = !this.isLoginFormVisible;
    this._toastr.success('Succesful login.');
  }

  signIn(user: Partial<User>): void {
    this._authService.post(user).subscribe(
      () => {
        this._router.navigate(['/pages'], { relativeTo: this._activatedRoute });
        this._toastr.success('Succesful login.');
      },
      (error) => {
        console.log('ERROR', error);
        this.loginFormGroup.reset();
        this.registerFormGroup.reset();
        this._toastr.error('Bad creditials, try again.');
      }
    );
  }

  createAccount(user: User): void {}

  private createFormGroups(): void {
    this.loginFormGroup = this._userFormBuilder.createLoginForm().getForm();
    this.registerFormGroup = this._userFormBuilder.createRegisterForm().getForm();
  }
}