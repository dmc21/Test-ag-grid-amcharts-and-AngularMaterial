import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { AgGridNg2 } from 'ag-grid-angular';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { Datos } from '../../modelos/datos';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {

  rowData: Datos[];
  myForm: FormGroup;
  seleccionados: any;


  constructor(private httpService: HttpService, private fb: FormBuilder) { }

  @ViewChild('agGrid') agGrid: AgGridNg2;

  columnDefs = [
    {headerName: 'Id', field: 'id', sortable: true, filter: true, checkboxSelection: true },
    {headerName: 'Nombre', field: 'nombre', sortable: true, filter: true },
    {headerName: 'Fecha', field: 'fecha', sortable: true, filter: true},
    {headerName: 'Valor', field: 'value', sortable: true, filter: true}
];

  ngOnInit() {
    this.httpService.getAll().subscribe(data => {
      this.rowData = data;
    });
  }

  getSeleccionados() { // recoje los valores seleccionados para editar o eliminar

    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.seleccionados = selectedNodes.length;

      if (selectedNodes.length === 1) {
        // editar
        selectedNodes.map( node => {
          this.myForm = this.fb.group({
            id: [node.data.id],
            nombre: [node.data.nombre, [Validators.required]],
            fecha: [new Date(node.data.fecha), [Validators.required]],
            value: [node.data.value, [Validators.required]]
          });
      });
      } else if (selectedNodes.length > 1 ) {
        this.delete();
      }
    }

    update() {
      this.httpService.update(this.myForm.value).subscribe(e => {
        this.updateTable();
        this.seleccionados = '';
      });
    }

    delete() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      this.seleccionados = selectedNodes.length;
      if (confirm('Vas a eliminar ' + selectedNodes.length + ' elementos')) {
      selectedNodes.map(node => {
        console.log(node.data.id);
        this.httpService.delete(node.data.id).subscribe(e => {
          this.updateTable();
          this.seleccionados = '';
      });
      });
    }
  }

    updateTable() {
      this.httpService.getAll().subscribe(data => {
        this.rowData = data;
      });
    }
}
