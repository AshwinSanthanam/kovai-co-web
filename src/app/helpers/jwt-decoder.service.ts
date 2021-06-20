import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  public decode(token: string): DecodedToken {
    const decoded: any = jwt_decode(token);
    const decodedToken = new DecodedToken();
    decodedToken.email = decoded.email;
    decodedToken.role = decoded.role;
    return decodedToken;
  }
}

export class DecodedToken {
  email: string;
  role: string;
}