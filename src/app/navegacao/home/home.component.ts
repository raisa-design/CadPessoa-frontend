import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponent } from 'src/app/components/input/input.component';
import { Address } from 'src/app/types/Adress';
import { ButtonVariant } from 'src/app/types/ButtonVariant';
import { Contact } from 'src/app/types/Contact';
import { InputOption } from 'src/app/types/InputOption';
import { getBrazilUF } from 'src/app/utils/UF';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  stateList: InputOption[] = getBrazilUF()
  contactTypes: InputOption[] = [{label: 'Email', value: 'email'}, {label: 'Telefone', value: 'phone'}]
  dangerVariant: ButtonVariant = ButtonVariant.danger

  addressList: Address[] = [{
    id: 0,
    cep: 0,
    city: '',
    complement: '',
    number: 0,
    state: '',
    street: ''
  }]

  contactList: Contact[] = [{
    id: 0,
    name: '',
    contact: '',
    type: 'email'
  }]

  addAddress(){
    this.addressList.push({
      id:  Math.floor(Math.random() * 999),
      cep: 0,
      city: '',
      complement: '',
      number: 0,
      state: '',
      street: ''
    });
  }

  removeAddress(removeId: number){
    this.addressList = this.addressList.filter((item) => item.id !== removeId);
  }

  addContact(){
    this.contactList.push({
      id:  Math.floor(Math.random() * 999),
      name: '',
      contact: '',
      type: 'email'
    });
  }

  removeContact(removeId: number){
    this.contactList = this.contactList.filter((item) => item.id !== removeId);
  }
}
