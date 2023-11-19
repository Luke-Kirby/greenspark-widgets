import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { EnvmtData, BadgeText, LoadingState } from 'src/app/app-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Error message if API fails
  errorMessage: string = '';

  // Inject the DataService in the constructor
  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    // Subscribe to changes in envmtData, badgeText, and loadingState from the DataService
    this.dataService.envmtData$.subscribe(data => this.envmtData = data);
    this.dataService.badgeText$.subscribe(text => this.badgeText = text);
    this.dataService.loadingState$.subscribe(state => this.loadingState = state);

    // Fetch environmental data from the API using the DataService
    this.dataService.fetchData();
  }

  // Array to store environmental data
  envmtData: EnvmtData[] = [];

  // Array to store badge text
  badgeText: BadgeText[] = [];

  // Flag to indicate if the card is still loading
  loadingState: LoadingState = LoadingState.Loading;
  LoadingState = LoadingState;

  // Handler for badge data emission from child components
  handleBadgeDataEmit(emittedData: EnvmtData) {

    // Find the index of the emitted item - I know we already know the index but the array order might change
    const foundItemIndex = this.envmtData.findIndex((item) => item.id === emittedData.id);

    // Update the array if the item is found
    if (foundItemIndex !== -1) {
      this.envmtData[foundItemIndex] = emittedData;
    }

    // If the active badge is clicked, disable all other active badges
    if (emittedData.active) {
      this.envmtData.forEach((item, index) => {
        if (index !== foundItemIndex) {
          item.active = false;
        }
      });
    }

    // Log the updated environmental data
    console.log("envmtData", this.envmtData);
  }
}
