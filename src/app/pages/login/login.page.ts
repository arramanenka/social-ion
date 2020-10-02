import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdentityService} from '../../service/identity.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {

    ionicForm: FormGroup;

    constructor(
        private identityService: IdentityService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.ionicForm = formBuilder.group({
            id: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    ngOnInit() {
    }

    login() {
        if (this.ionicForm.valid) {
            this.identityService.setId(this.ionicForm.value.id);
            this.router.navigateByUrl('').then();
        }
    }
}
