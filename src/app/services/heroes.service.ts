import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from "../models/heroe.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroesService {
  private url = "PUT your firebase url table here";
  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    console.log("Crear");
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    console.log("Actualizar");
    //Clono el heroe para quebrar la referencia.
    const heroeTemp = {
      ...heroe
    };
    //Ahora borro el id para poder actualizar
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      // map(resp=> this.crearArreglo(resp))..Abajo escrito de manera simplificada, en este caso toma por defecto el primer parametro
      map(this.crearArreglo)
    );
  }

  getHeroeById(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHeroeById(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(heroesObject: Object) {
    const heroes: HeroeModel[] = [];

    if (heroesObject === null) {
      return [];
    }
    Object.keys(heroesObject).forEach(key => {
      const heroe: HeroeModel = heroesObject[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
