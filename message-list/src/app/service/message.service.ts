import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private readonly getMessageByUserId: string = "https://l4jxuuaahcjzvvsrf2esccpz2i0lnlar.lambda-url.us-east-2.on.aws/";

    constructor(private https: HttpClient) {
    }

    public async getMessagesByUserId() {
        const payload = {
            usuarioId: "d4ca42ae-67de-47f6-bc03-46a89915567f"
        }
        this.https.post(this.getMessageByUserId, payload).subscribe((response) => {
            console.log(response);
        });
    }
}
