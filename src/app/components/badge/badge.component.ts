import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnvmtData, BadgeText, Tooltip } from 'src/app/core/interfaces/app-interface';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input() badgeData!: EnvmtData;
  @Input() badgeText: BadgeText = { title: '', subTitle: '' };
  @Output() badgeDataEmit: EventEmitter<EnvmtData> = new EventEmitter<EnvmtData>();

  // Color variables
  badgeContentColor: string = '';
  selectableColors: string[] = ["green", "black", "blue", "beige", "white"]; //Can provide this list from BE if required
  selectedColor: string = '';

  // Tooltip properties
  tooltip: Tooltip = {
    isVisible: false,
    isMousePresent: false,
    isMobileVersion: false,
  };

  ngOnInit(): void {
    // Initialise color properties
    this.badgeContentColor = this.setBadgeContentColor(this.badgeData.selectedColor);
    this.selectedColor = this.badgeData.selectedColor;
  }

  // Function to determine what color to make the icon and text in the badge
  setBadgeContentColor(color: string): string {
    //Can link these colours up to the BE if required
    switch (color) {
      case 'beige':
      case 'white':
        return '#1B5E20';
      default:
        return 'white';
    }
  }

  // Function to handle selected color logic
  selectColor(color: string): void {
    this.selectedColor = color;
    this.badgeContentColor = this.setBadgeContentColor(color);
    this.badgeData.selectedColor = color;

    this.emitData();
  }

  // Emit updated data back to the parent component
  emitData(): void {
    if (this.badgeData) {
      this.badgeDataEmit.emit(this.badgeData);
    }
  }

  // Function to handle tooltip logic
  handleTooltip(isVisible: boolean): void {

    this.tooltip.isMousePresent = isVisible;

    if (isVisible) {

      this.tooltip.isMousePresent = this.tooltip.isVisible;
      this.tooltip.isVisible = isVisible;

    } else {

      setTimeout((): void => {
        this.tooltip.isVisible = this.tooltip.isMousePresent;
        this.tooltip.isMobileVersion = isVisible;
      }, 300);

    }
  }

  //function to handle tooltip logic for mobile
  handleTooltipMobile(isVisible: boolean): void {
    this.tooltip.isMobileVersion = isVisible;
    this.tooltip.isVisible = isVisible;
  }
}
