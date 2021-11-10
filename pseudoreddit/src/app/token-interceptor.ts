import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth/shared/auth.service";




@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

constructor(public authService: AuthService){

}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.authService.getJwtToken();
    }

    
}