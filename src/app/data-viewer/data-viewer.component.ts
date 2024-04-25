import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.css'
})
export class DataViewerComponent {

  data: any; 

  constructor(private dataService: DataService) { }

  ngOnInit(){
    this.fetchData();
  }

  fetchData() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
    });
  }

  downloadJson() {
    const fileName = "data.json";
    const simplifiedData = this.data.users.map(user => {
      return {
        firstName: user.firstName,
        lastName: user.lastName
      };
    });
    const json = JSON.stringify(simplifiedData);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  
}
