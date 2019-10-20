import { Component, OnInit } from "@angular/core";
import { HeroeModel } from "../../models/heroe.model";
import { NgForm } from "@angular/forms";
import { HeroesService } from "../../services/heroes.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.css"]
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();
  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    if (id !== "nuevo") {
      this.heroesService.getHeroeById(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario Invalido");
      return;
    }
    Swal.fire({
      type: "info",
      title: "Espere",
      text: "Guardando Informacion",
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    if (this.heroe.id) {
      // this.heroesService.actualizarHeroe(this.heroe).subscribe(resp => {
      //   console.log(resp);
      // });
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      // this.heroesService.crearHeroe(this.heroe).subscribe(resp => {
      //   console.log(resp);
      // });
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      console.log(resp);
      Swal.fire({
        type: "success",
        title: this.heroe.nombre,
        text: "Se actualizo correctamente"
      });
    });
  }
}
