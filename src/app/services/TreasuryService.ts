import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { getTreasuryDto } from '../models/getTreasuryDto';
import { baseDto } from '../models/baseDto';
import { addTreasury } from '../models/addTreasury';
import { FilterDto } from '../models/filterDto';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {
  treasuryUrl:string = 'TreasuryDefinition';
  addTreasuryUrl:string = 'TreasuryDefinition/Add';


  headers = new HttpHeaders({
    'Tenant-Id': '2',
    companyId: '2',
    branchId: '2',
  });


constructor(private httpClient : HttpClient) { }

public getTreasuries(fiterDto:FilterDto):Observable<getTreasuryDto[]> {
  return this.httpClient.post<getTreasuryDto[]>(
    `${environment.apiUrl}/${this.treasuryUrl}`,
    fiterDto,

    { headers: this.headers }
  );
}
public addTreasuryDefinition(data: addTreasury): Observable<addTreasury> {
  return this.httpClient.post<addTreasury>(
    `${environment.apiUrl}/${this.addTreasuryUrl}`,
    data,
    { headers: this.headers }
  );
}
public editTreasury(treasury:baseDto): Observable<baseDto>
{
  return this.httpClient.put<baseDto>(
    `${environment.apiUrl}/${this.treasuryUrl}`,
    treasury,
    { headers: this.headers }
  )
}
}
