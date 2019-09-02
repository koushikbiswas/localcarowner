import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  modalRef: BsModalRef;
  windowScrolled: boolean;
  public myform: FormGroup;
  public formSubmited: boolean = false;
  public successmodal: any = false;

  constructor(public router: Router, public route: ActivatedRoute, private readonly meta: MetaService, public fb: FormBuilder, public http: HttpClient, private modalService: BsModalService) {
    
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


  doSubmit(template: TemplateRef<any>){
    
    this.formSubmited = true;
    console.log(this.myform.value);
    for (let i in this.myform.controls) {
      this.myform.controls[i].markAsTouched();
    }
    if (this.myform.valid) {
      let link = 'http://166.62.39.137:5001/addlocalcarownerLanding';
      let data = (this.myform.value);
      this.successmodal = true;
      this.http.post(link, data)
          .subscribe(res => {
  
            let result: any = {};
            result = res;
            console.log(result);
            if (result.status == 'success') {
  
              this.myform.reset();
              setTimeout(()=>{
                this.modalRef = this.modalService.show(template, {class: 'modal-md localcarpopup'});
              },4000);
           }
         })
      }
  }

  closep(){
    this.modalRef.hide();
  }

  inputUntouch(form: any, val: any) {
    console.log('on blur .....');
    form.controls[val].markAsUntouched();
  }



}
