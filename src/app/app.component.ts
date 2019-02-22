import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  workers: any[] = [];
  constructor(private socket: Socket) {
    socket.emit('register', 'WEB');
    socket.on('list_workers', (listWorkers) => {
      console.log('Received list workers: ', listWorkers);
      Object.keys(listWorkers).forEach((i) => {
        this.workers.push(listWorkers[i]);
      });
      // this.workers = listWorkers;
    });
    socket.on('worker_disconnect', (worker: any) => {
      console.log('Received worker_disconnect: ', worker.id);
      this.workers = this.workers.filter((f) => f.id !== worker.id);
    });
    socket.on('worker_added', (worker: any) => {
      console.log('Received worker_added: ', worker.id);
      this.workers.push(worker);
    });

    socket.on('update_status', (worker: any) => {
      console.log('update_status');
      const myWorker = this.workers.find((f) => f.id === worker.id);
      myWorker.status = worker.status;
    });

    socket.on('init_sync', (worker: any) => {
      console.log('init_sync');
      const myWorker = this.workers.find((f) => f.id === worker.id);
      myWorker.shopId = worker.shopId;
    });

    socket.on('update_sync', (worker: any) => {
      console.log('update_sync');
      const myWorker = this.workers.find((f) => f.id === worker.id);
      myWorker.progress = worker.progress;
      myWorker.shopId = worker.shopId;
    });
  }
}
