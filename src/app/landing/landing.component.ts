import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public myform: FormGroup;

  constructor(private readonly meta: MetaService, public fb: FormBuilder, public http: HttpClient) {
    
    this.meta.setTitle('Local Car Owner');
    this.meta.setTag('og:description', 'Local Car Owner description ');
    this.meta.setTag('og:title', 'Local Car Owner ');
    this.meta.setTag('og:type', 'www.localcarowner.com/');
    this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');


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


  ngOnInit() {
  }




  doSubmit(){
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
              // this.successmodal = true;
              setTimeout(()=>{
  
              },2000);
           }
         })
      }
  }

  inputUntouch(form: any, val: any) {
    console.log('on blur .....');
    form.controls[val].markAsUntouched();
  }


}
