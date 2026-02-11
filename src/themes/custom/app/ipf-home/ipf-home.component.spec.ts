import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IpfHomeComponent } from './ipf-home.component';

describe('IpfHome', () => {
  let component: IpfHomeComponent;
  let fixture: ComponentFixture<IpfHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpfHomeComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(IpfHomeComponent);
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