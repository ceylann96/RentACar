import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/payment/creditCard';
import { Payment } from 'src/app/models/payment/payment';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  creditCards:CreditCard[];
  rentalId:number;

  constructor(private creditCardService:CreditCardService,
              private paymentService:PaymentService,
              private activatedRoute:ActivatedRoute,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["customerId"]){
        this.getCreditCardsByCustomerId(params["customerId"]);
      }
      if(params["rentalId"]){
        this.rentalId = params["rentalId"];
      }
    });
  }

  getCreditCardsByCustomerId(customerId:number) {
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe((response) => {
      this.creditCards = response.data;
    })
  }

  deleteCreditCard(creditCard:CreditCard) {
    this.creditCardService.deleteCreditCard(creditCard).subscribe((response) => {
      this.toastrService.error("Bu Kredi Kartı Silindi");
      setTimeout(() => { window.location.reload(); }, 1500);
    })
  }

  paymentWithThisCreditCard(creditCard:CreditCard) {
    let payment:Payment = new Payment();
    payment.rentalId = Number(this.rentalId);
    payment.cardNo = creditCard.cardNo;
    payment.nameSurname = creditCard.nameSurname;
    payment.expirationDate = creditCard.expirationDate;
    payment.cvc = creditCard.cvc;
    this.paymentService.addPayment(payment).subscribe(
      res => { this.toastrService.success("Ödeme Başarılı"); },
      err => { console.log(err.error); this.toastrService.error(err.error); }
    )
  }

}