import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Campaign } from './campaign';

import { CampaignService } from './campaign.service';

import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  public campaigns: Campaign[];
  public editCampaign: Campaign;

  public deleteCampaign: Campaign;
  towns: string[] = ["Warszawa","Kraków","Poznań","Rzeszów"];
  available_status: string[] = ["On","Off"];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordCtrl = new FormControl();
  filteredKeywords: Observable<string[]>;
  keywords: string[] = ['Keyword1'];
  allKeywords: string[] = ['Keyword1', 'Keyword2', 'Keyword3', 'Keyword4', 'Keyword5'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(private campaignService: CampaignService){
    this.filteredKeywords = this.keywordCtrl.valueChanges.pipe(
      startWith(null),
      map((keyword: string | null) => (keyword ? this._filter(keyword) : this.allKeywords.slice())),
    );
  }

  ngOnInit(){
    this.getCampaigns();
  }

  public getCampaigns(): void{
    this.campaignService.getCampaigns().subscribe(
      (response: Campaign[]) => {
        this.campaigns = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onOpenModal(campaign: Campaign | null, mode: string):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addCampaignModal');
    }
    if(mode === 'edit'){
      if(campaign !== null){ 
        this.editCampaign = campaign;
      }
      button.setAttribute('data-target','#editCampaignModal');
    }
    if(mode === 'delete'){
      if(campaign !== null){ 
        this.deleteCampaign = campaign;
      }
      button.setAttribute('data-target','#deleteCampaignModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddCampaign(addForm: NgForm): void{
    document.getElementById('add-campaign-form')?.click();
        
    this.campaignService.addCampaign(addForm.value).subscribe(
      (response: Campaign) => {
        console.log(this.keywords);
        console.log(response);
        this.getCampaigns();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCampaign(campaign: Campaign): void{
    this.campaignService.updateCampaign(campaign).subscribe(
      (response: Campaign) => {
        console.log(response);
        this.getCampaigns();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCampaign(campaignId: number): void{
    this.campaignService.deleteCampaign(campaignId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCampaigns();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);
    }

    event.chipInput!.clear();

    this.keywordCtrl.setValue(null);
  }

  remove(keyword: string): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.keywords.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allKeywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
  }

}
