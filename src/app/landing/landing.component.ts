import { Component, OnInit, HostListener } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  windowScrolled: boolean;
  public myform: FormGroup;
  public formSubmited: boolean = false;
  public successmodal: any = false;

  constructor(public router: Router, public route: ActivatedRoute, private readonly meta: MetaService, public fb: FormBuilder, public http: HttpClient) {
    
    this.meta.setTitle('Local Car Owner ');
    this.meta.setTag('og:description', 'THE ULTIMATE IN DIGITAL MARKETING FOR NEW CAR DEALERSHIPS! ');
    this.meta.setTag('og:title', 'Local Car Owner ');
    this.meta.setTag('og:type', 'www.localcarowner.com/');
    this.meta.setTag('og:image', 'https://www.localcarowner.com/assets/images/logo.png');


    this.myform = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      dealer: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9\+\-\ ]/)])],
      zipcode: ['', Validators.required],
      addzipcode: ['', Validators.required],
    })

  }

  @HostListener("window:scroll", [])

    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }


  scrollToTop() {
    (function smoothscroll() {

        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }

    })();
}
 
toTop() {
  document.getElementById("form_maindiv").scrollIntoView({behavior: 'smooth'});
}

  ngOnInit() {
    this.router.events.subscribe(() =>
          window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
          })
      );
  }

  get formValidate() { return this.myform.controls; }

  doSubmit(){
    // this.successmodal = true;
    this.formSubmited = true;
    console.log(this.myform.value);
    if (this.myform.valid) {
      let link = 'http://192.168.0.145/localcarownerformdetails';
      // let link = '';
      let data = {data: this.myform.value};
      this.http.post(link, data)
          .subscribe(res => {
  
            let result: any = {};
            result = res;
            console.log(result);
            if (result.status == 'success') {
  
              this.myform.reset();
              
              setTimeout(()=>{
                this.successmodal = true;
              },4000);
           }
         })
      }
  }

  inputUntouch(form: any, val: any) {
    console.log('on blur .....');
    form.controls[val].markAsUntouched();
  }


}
