import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseFormBuilder } from './base-form.builder';

@Injectable()
export class UserFormBuilder extends BaseFormBuilder {
  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  createLoginForm(): BaseFormBuilder {
    this._form = this._formBuilder.group({
      password: ['test11', Validators.required],
      email: ['qweq@qweq.pl', [Validators.required, Validators.email]],
    });
    return this;
  }

  createRegisterForm(): BaseFormBuilder {
    this._form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
    });
    return this;
  }
}
