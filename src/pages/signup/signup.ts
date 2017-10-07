import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';



import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
 



@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
	userProfile: any = null;
	 signup: UserOptions = { username: '', password: '' };
 submitted = false;
 
  constructor(public navCtrl: NavController, public auth: AuthService,
        
         public userData: UserData     
  ) {
 
  }
 
   

  ngOnInit() {
	  this.userData.hasLoggedIn().then(()=> {
		  
		  this.auth.signOut();
		  this.userData.logout();
	  });
  }

  /// Social Login

  signInWithGithub(): void {
    this.auth.githubLogin()
    .then(() => this.afterSignIn());
  }

  signInWithGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

  signInWithFacebook(): void {
    this.auth.facebookLogin()
      .then(() => this.afterSignIn());
  }

  signInWithTwitter(): void {
    this.auth.twitterLogin()
      .then(() => this.afterSignIn());
  }

  /// Anonymous Sign In

  signInAnonymously() {
    this.auth.anonymousLogin()
      .then(() => this.afterSignIn());
  }


  /// Shared

  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    // this.router.navigate(['/']);
	this.submitted = true;
	this.userData.login(this.auth.currentUserDisplayName);
	 this.navCtrl.push(TabsPage);
	 
  }

  
 
 onSignup() {
    

    
      this.userData.signup(this.signup.username);
      this.navCtrl.push(TabsPage);
    
  }
 
	
	
 

  

}
