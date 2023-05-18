import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgbDropdown, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { UserserviceService } from 'src/service/userservice.service';

@Component({
  selector: 'app-zehnselect',
  templateUrl: './zehnselect.component.html',
  styleUrls: ['./zehnselect.component.css'],
})
export class ZehnselectComponent {
  @ViewChild(NgbDropdown) dropdown!: NgbDropdown;
  @ViewChild('selectAllCheckbox', { static: false })
  selectAllCheckbox!: ElementRef;
  products = [
    {
      id: '',
      title: '',
      description: '',
      price: '',
    },
  ];

  // category and items
  category = [
    {
      id: 1,
      categoryName: 'Products',
      items: [
        {
          itemId: 21,
          itemName: '4Mens Casual Premium Slim Fit T-Shirts',
          status: 'checked',
        },
        {
          itemId: 252,
          itemName: 'Mens Casual Slim Fit lorem inpum',
          status: 'checked',
        },
        { itemId: 272, itemName: 'Mens Casual Slim Fit', status: 'checked' },
        { itemId: 262, itemName: 'Mens Casual Slim Fit', status: 'checked' },
        { itemId: 212, itemName: 'Mens Casual Slim Fit', status: 'checked' },
        { itemId: 22, itemName: 'Mens Casual Slim Fit', status: 'checked' },

        {
          itemId: 23,
          itemName: 'Silver Dragon Station Chain Bracelet',
          status: 'checked',
        },
        {
          itemId: 24,
          itemName: 'Hafeez Center in the United States',
          status: 'unchecked',
        },
        {
          itemId: 25,
          itemName: 'White Gold Plated Princess',
          status: 'unchecked',
        },
        {
          itemId: 26,
          itemName: 'Classic Created Wedding Engagement',
          status: 'unchecked',
        },
        { itemId: 11, itemName: 'Samsung', status: 'checked' },
        { itemId: 12, itemName: 'Blackberry', status: 'unchecked' },
        { itemId: 13, itemName: 'Oppo', status: 'unchecked' },
        { itemId: 24, itemName: 'Vivo v17', status: 'unchecked' },
        { itemId: 33, itemName: 'Samsung', status: 'checked' },
        { itemId: 42, itemName: 'Blackberry', status: 'unchecked' },
      ],
    },
  ];

  selectedCategory: any = this.category[0];
  selectedItemsCounts: { categoryName: string; count: number }[] = [];
  // dropdownMenu: any;
  dropdownCheckedMaps: { [key: number]: Map<number, boolean> } = {};
  constructor(private _user: UserserviceService) {
    for (let category of this.category) {
      this.dropdownCheckedMaps[category.id] = new Map<number, boolean>();
      for (let item of category.items) {
        this.dropdownCheckedMaps[category.id].set(item.itemId, false);
      }
    }
  }

  ngOnInit(): void {
    for (let item of this.selectedCategory.items) {
      // If the item status is "checked", set its "checked" property to true
      if (item.status === 'checked') {
        item.checked = true;
      }
    }

    // Update the selected item count
    this.updateSelectedItemsCount();

    this._user.getallProduct().subscribe((data: any) => {
      this.products = data;
    });

    window.onload = () => {
      const element = document.getElementById('cat');
      if (element) {
        element.click();
      }
    };
  }

  myFunction() {
    const input: HTMLInputElement = document.getElementById(
      'myInput'
    ) as HTMLInputElement;
    const filter: string = input.value.toUpperCase();
    const ul: HTMLUListElement = document.getElementById(
      'myUL'
    ) as HTMLUListElement;
    const noItems: HTMLElement = document.getElementById(
      'noItemsMessage'
    ) as HTMLElement;

    if (ul === null) {
      return;
    }

    const liArray: HTMLLIElement[] = Array.from(
      ul.getElementsByTagName('li')
    ) as HTMLLIElement[];
    let matchingItems = 0;

    liArray.forEach((li: HTMLLIElement) => {
      const span: HTMLElement = li.querySelector('.item-name') as HTMLElement;
      if (span === null) {
        return;
      }
      const txtValue: string = span.textContent || span.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li.style.display = '';
        span.innerHTML = txtValue.replace(
          new RegExp(filter, 'gi'),
          (match) => `<b>${match}</b>`
        );
        matchingItems++;
      } else {
        li.style.display = 'none';
      }
    });

    if (noItems !== null) {
      if (matchingItems === 0) {
        noItems.style.display = 'block';
      } else {
        noItems.style.display = 'none';
      }
    }
  }

  selectAll = false;
  // selectAll: boolean = false;

  selectedItemsCount: number[] = [];

  getSelectedItemsCount(): number {
    let count = 0;
    for (let i = 0; i < this.category.length; i++) {
      const selectedCount = this.selectedItemsCount[i];
      if (selectedCount) {
        count += selectedCount;
      }
    }
    return count;
  }

  selectAllItems() {
    for (let item of this.selectedCategory.items) {
      item.checked = this.selectAll;
    }
    this.updateSelectedItemsCount();
  }

  onItemChecked() {
    this.updateSelectedItemsCount();
    let allChecked = true;
    for (let item of this.selectedCategory.items) {
      if (!item.checked) {
        allChecked = false;
        break;
      }
    }
    this.selectAll = allChecked;
  }

  updateSelectedItemsCount() {
    // Get the index of the selected category in the category array
    const index = this.category.indexOf(this.selectedCategory);

    // Update the selectedItemsCount array at the corresponding index
    this.selectedItemsCount[index] = this.selectedCategory.items.filter(
      (item: any) => {
        if (item.checked) {
          return true;
        } else {
          item.checked = false;
          return false;
        }
      }
    ).length;
  }

  // reset() {
  //   for (let item of this.selectedCategory.items) {
  //     item.checked = item.status === 'checked'; // Reset the checked property to its initial value
  //   }
  //   this.updateSelectedItemsCount();
  // }

  cnaselDropdown(): void {
    if (this.dropdown) {
      this.dropdown.close();
    }
    for (let item of this.selectedCategory.items) {
      if (item !== document.getElementById('sll')) {
        item.checked = item.status === 'checked'; // Restore the previous selection state
      }
    }
  }

  resetDropdown(): void {
    for (let item of this.selectedCategory.items) {
      if (item !== document.getElementById('sll')) {
        item.checked = item.status === 'checked'; // Restore the previous selection state
      }
    }
    const selectAllCheckbox = document.getElementById(
      'sll'
    ) as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false; // Uncheck the "Select All" checkbox if found
    }

    this.updateSelectedItemsCount();
    this.dropdown.close();
  }

  activeDropdown: number | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.dropdown-container')) {
      this.resetDropdown();
    }
    this.selectAll = false;
  }

  activeDropdownId: number | null = null;

  toggleDropdown(dropdownId: number): void {
    if (this.activeDropdownId !== dropdownId) {
      const previousDropdownContainer = document.getElementById(
        'dropdown-container-' + this.activeDropdownId
      ) as HTMLElement;
      if (previousDropdownContainer) {
        this.resetDropdown();
      }
    }
    this.activeDropdownId =
      this.activeDropdownId === dropdownId ? null : dropdownId;
  }

  isDropdownOpen(dropdownId: number): boolean {
    return this.activeDropdown === dropdownId;
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
