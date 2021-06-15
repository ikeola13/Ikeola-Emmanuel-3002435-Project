import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {
public listingForm: FormGroup;

constructor(
  public actionSheetController: ActionSheetController,
  public modalController: ModalController,
  private formBuilder: FormBuilder,
  ) {
    this.listingForm = this.formBuilder.group({
      min_price: [''],
      max_price: [''],
      price_rate: [''],
      type: [''],
      bedrooms: [''],
      bathrooms: [''],
      furnished: [''],
      status: [''],
      location: [''],
    });
  }

ngOnInit() {
}

done(){
  this.modalController.dismiss(this.listingForm.value);
}

}
