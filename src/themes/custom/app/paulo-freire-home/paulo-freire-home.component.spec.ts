import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PauloFreireHomeComponent } from './paulo-freire-home.component';

describe('IpfHome', () => {
  let component: PauloFreireHomeComponent;
  let fixture: ComponentFixture<PauloFreireHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauloFreireHomeComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PauloFreireHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve conter o título esperado', () => {
    expect(component.title).toBe('Minha Nova View Personalizada');
  });
});