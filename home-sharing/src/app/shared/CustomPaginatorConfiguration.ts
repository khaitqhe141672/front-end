import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
  }
  itemsPerPageLabel = 'Tổng trang'
  nextPageLabel = 'Trang tiếp'
  previousPageLabel = 'Trang trước'
  getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0) {
      return $localize`Trang 1 trên ${pageSize}`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Trang ${page + 1} trên ${amountPages}`;
  }
}
