import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from './campaign';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiServerUrl =environment.apiBaseUrl;
  private deletePath = 'http://localhost:8080/campaign/delete/';
  constructor(private http: HttpClient) { }

  public getCampaigns(): Observable<Campaign[]> {
    return this.http.get<any>('http://localhost:8080/campaign/all');
  }

  public addCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<any>('http://localhost:8080/campaign/add',campaign);
  }

  public updateCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.put<any>('http://localhost:8080/campaign/update',campaign);
  }

  public deleteCampaign(campaignId: number): Observable<void> {
    
    return this.http.delete<void>(this.deletePath+campaignId);
  }

}
