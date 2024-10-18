import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatList, MatListItem} from "@angular/material/list";
import {MatIconModule} from '@angular/material/icon';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    SlicePipe,
    MatSlideToggleModule,
    MatButton,
    NgOptimizedImage,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, NgIf, MatList, MatListItem, MatIconModule, MatFabButton, MatMiniFabButton, MatStepper, MatStep, ReactiveFormsModule, MatStepperNext, MatStepLabel, MatStepperPrevious, MatIconButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public data: { name: string; url: string; }[] = [];
  public dataFood: { name: string; url: string; }[] = [];
  firstFormGroup: FormGroup;
  isLinear = false;
  editMode = false;
  userData: any = {};  // Variable para almacenar los datos cargados de localStorage

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private fb: FormBuilder) {
    this.firstFormGroup = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(3), // Longitud mínima
        Validators.maxLength(50), // Longitud máxima
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$') // Solo letras y espacios
      ]],
      userDir: ['', [
        Validators.required,
        Validators.minLength(5), // Longitud mínima para una dirección
        Validators.maxLength(100) // Longitud máxima para una dirección
      ]],
      selectedCafe: ['', Validators.required],
      selectedFood: [''],
      comments: ['']
    });
  }

  ngOnInit(): void {
    this.loadSelectionsFromStorage();
    this.drink();
    this.food();
  }

  // Alternar modo de edición
  toggleEdit(): void {
    this.editMode = !this.editMode;  // Alterna el modo de edición
  }


  saveChanges(): void {
    this.editMode = false;  // Desactivar el modo de edición
    this.saveToLocalStorage();  // Guardar los cambios en localStorage
  }
  // Guardar los datos en localStorage
  saveToLocalStorage(): void {
    const formData = this.firstFormGroup.value;
    localStorage.setItem('userData', JSON.stringify(formData));
    console.log('Datos guardados en localStorage:', formData);
    this.userData=formData
  }

  // Cargar los datos desde localStorage
  loadSelectionsFromStorage(): void {
    const savedOrder = JSON.parse(localStorage.getItem('orderData') || '{}');
    if (savedOrder) {
      this.firstFormGroup.patchValue(savedOrder);
    }
  }

  // Eliminar la orden
  deleteOrder(): void {
    localStorage.removeItem('orderData');
    this.firstFormGroup.reset();  // Limpiar el formulario
  }

  // Obtener cafés de la API
  drink(): void {
    this.api.getApi().subscribe(
        (data: any) => {
          this.data = data;
        },
        (error) => {
          console.error(error);
        }
    );
  }
  // Obtener comidas de la API
  food(): void {
    this.api.getApiFood().subscribe(
        (data: any) => {
          this.dataFood = data;
        },
        (error) => {
          console.error(error);
        }
    );
  }
  clearOrder() {
    localStorage.clear()
  }
}