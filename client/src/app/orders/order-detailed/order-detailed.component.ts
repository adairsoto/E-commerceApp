import { Component } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent {
  order?: Order;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService) {
    this.bcService.set('@orderDetailed', ' ');
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.orderService.getOrder(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@orderDetailed', `Order #${id} - ${order.status}`);
      },
      error: error => console.log(error)
    })
  }
}