import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdentityService} from '../../service/identity.service';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {

    ionicForm: FormGroup;

    constructor(
        private identityService: IdentityService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertController: AlertController
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
            const user = this.userService.queryUser(this.identityService.getSelfId());
            user.subscribe(
                us => {
                    if (!us) {
                        this.userService.saveProfile({
                            id: this.identityService.getSelfId(),
                            name: this.identityService.getSelfId(),
                            avatarUrl: null
                        });
                    }
                    this.router.navigateByUrl('').then();
                },
                error => {
                    console.log(error);
                    this.alertController.create({
                        message: 'Something went terribly wrong, please try again later'
                    }).then(result => result.present());
                }
            );
        }
    }
}
