import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrejaHomeComponent } from './creja-home.component';

describe('CrejaHome', () => {
  let component: CrejaHomeComponent;
  let fixture: ComponentFixture<CrejaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrejaHomeComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrejaHomeComponent);
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