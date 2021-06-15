import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { ForgotPasswordModalPage } from './forgot-password-modal/forgot-password-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  authTab = false;
  public reg: FormGroup;
  public login: FormGroup;
  passwordView = true;
  links;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public modalController: ModalController,
    public alertController: AlertController
  ) {
    this.links = 'login';
    this.reg = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_type: ['', Validators.required]
    });
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    console.log(localStorage.getItem('uid'));
    if (localStorage !== null) {
      console.log(localStorage.getItem('user_type'));
      if (localStorage.getItem('user_type') === 'user') {
        this.router.navigate(['/users']);
      } else if (localStorage.getItem('user_type') === 'agent') {
        this.router.navigate(['/agency']);
      }
    }
  }

  ngOnInit() {
    // window.location.reload(true);
    const reloadUsingLocationHash: any = () => {
      window.location.hash = 'reload';
    };
    window.onload = reloadUsingLocationHash();
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 5000,
    });
    toast.present();
  }

  async presentToast2(message) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 5000,
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Sign Up Successful!',
      message: 'Log in to start using app!',
      position: 'bottom',
      buttons: [{
        text: 'Log In',
        role: 'cancel',
        handler: () => {
          this.authTab = false;
          console.log('Cancel clicked');
        }
      }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  segmentChanged(ev: any) {
    console.log(ev.detail.value);
    if (ev.detail.value === 'register') {
      this.authTab = true;
    } else {
      this.authTab = false;
    }
  }

  roleChanged(ev: any) {
    console.log(ev.detail.value);
  }

  passwordChanged(ev: any) {
    console.log(ev.detail.checked);
    if (ev.detail.checked) {
      this.passwordView = true;
    } else {
      this.passwordView = false;
    }
  }

  async regForm() {
    console.log(this.reg.value);
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(this.reg.value.email, this.reg.value.password)
        .then(resp => {
          console.log(resp.user.uid);
          const dt = {
            email: this.reg.value.email,
            uid: resp.user.uid,
            firstname: '',
            lastname: '',
            occupation: '',
            interests: '',
            dateOfBirth: '',
            user_type: this.reg.value.user_type,
            profile_picture: '',
          };
          this.addToUserTable(dt);
          this.presentToast('Sign Up Successful!');
          this.presentToast2('Activate Your Account by Clicking on the link in your email. Thanks.');
          this.reg.reset();
          this.authTab = false;
          this.sendEmailConfirm();
        });
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    }
  }

  async logForm() {
    // const { this.log. } = this;
    this.presentLoading();
    console.log(this.login.value);
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(this.login.value.email, this.login.value.password)
        .then(resp => {
          this.loadingController.dismiss().then((resl) => {
            console.log('Loading dismissed!', resl);
            console.log(resp.user);
            console.log(resp.user.uid);
            console.log(resp.user.email);
            console.log(resp.user.refreshToken);
            localStorage.setItem('uid', resp.user.uid);
            localStorage.setItem('email', resp.user.email);
            this.getUserData(resp);
          }).catch((error) => {
            console.log('error', error);
          });
        });
    } catch (error) {
      this.loadingController.dismiss();
      console.log(error);
      this.presentToast(error.message);
    }
  }

  addToUserTable(data) {
    this.afs
      .collection('users')
      .add(data)
      .then(res => {
        console.log(res);
      });
  }

  async forgot() {
    const modal = await this.modalController.create({
      component: ForgotPasswordModalPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss()
      .then((data: any) => {
        console.log(data.data.value);
      });

    return await modal.present();
  }

  getUserData(resp) {
    if (localStorage.getItem('uid')) {
      this.afs.collection('users', ref => ref.where('uid', '==', localStorage.getItem('uid')))
        .valueChanges().subscribe((data: any) => {
          console.log(data[0]);
          localStorage.setItem('user_type', data[0].user_type);
          localStorage.setItem('profile_picture', data[0].profile_picture);
          if (resp.user.emailVerified === false) {
            this.emailAlert();
          } else {
            this.presentToast('Sign In Successful!');
            if (localStorage.getItem('user_type') === 'user') {
              this.router.navigate(['/users']);
            } else if (localStorage.getItem('user_type') === 'agent') {
              this.router.navigate(['/agency']);
            }
          }
        });
    }
  }

  checkStorage() {
    console.log(localStorage.getItem('uid'));
    console.log(localStorage.getItem('email'));
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please Wait...',
    });
    await loading.present();
  }

  async sendEmailConfirm() {
    window.localStorage.clear();
    const user = this.afAuth.currentUser;
    (await user).sendEmailVerification().then((dt) => {
      console.log(dt);
    });
  }

  async emailAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Account not Verified!',
      message: 'Please click Send to send another Verification Link.',
      buttons: ['Send']
    });

    await alert.present();

    alert.onDidDismiss().then((d) => {
      this.sendEmailConfirm();
      this.presentToast('Activation Link has been resent!');
    });
  }

}
