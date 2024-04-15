import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from './service/message.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	providers: [HttpClientModule]
})

export class AppComponent {
	constructor(@Inject(MessageService) private messageService: MessageService) {
		this.messageService.getMessagesByUserId();
	}
}
