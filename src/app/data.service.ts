import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { EnvmtData, BadgeText, LoadingState } from 'src/app/app-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Private BehaviorSubjects to hold state
  private envmtDataSubject = new BehaviorSubject<EnvmtData[]>([]);
  private badgeTextSubject = new BehaviorSubject<BadgeText[]>([]);
  private loadingStateSubject = new BehaviorSubject<LoadingState>(LoadingState.Loading);

  // Public Observables to allow components to subscribe to changes
  envmtData$ = this.envmtDataSubject.asObservable();
  badgeText$ = this.badgeTextSubject.asObservable();
  loadingState$ = this.loadingStateSubject.asObservable();

  // Error message if API fails
  errorMessage: string = '';

  // Inject the HttpClient in the constructor
  constructor(private http: HttpClient) { }

  // Function to fetch environmental data from the API
  fetchData(): void {
    // Fetch environmental data from the API
    this.http.get<EnvmtData[]>('https://api.mocki.io/v2/016d11e8/product-widgets')
      .pipe(
        timeout(10000), // Timeout after 10 seconds
        catchError((error) => {
          console.error('Error fetching data:', error);
          this.loadingStateSubject.next(LoadingState.NotLoaded);
          this.errorMessage = error.message;
          throw error; // Re-throw the error after handling it
        })
      )
      .subscribe(
        (response) => {
          // Update environmental data array
          this.envmtDataSubject.next(response);

          // Generate badge text based on environmental data
          // The text here can be provided by the BE if required
          const badgeText: BadgeText[] = [
            {
              subTitle: 'This product collects',
              title: `${response.find((item) => item.type === 'plastic bottles')?.amount} plastic bottles`
            },
            {
              subTitle: 'This product plants',
              title: `${response.find((item) => item.type === 'trees')?.amount} trees`
            },
            {
              subTitle: 'This product offsets',
              title: `${response.find((item) => item.type === 'carbon')?.amount}kg of carbon`
            },
          ];

          // Update badge text array
          this.badgeTextSubject.next(badgeText);

          // Set the loading state flag to Loaded
          this.loadingStateSubject.next(LoadingState.Loaded);
        }
      );
  }
}
