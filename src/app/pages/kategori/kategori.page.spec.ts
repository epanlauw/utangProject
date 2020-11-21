import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KategoriPage } from './kategori.page';

describe('KategoriPage', () => {
  let component: KategoriPage;
  let fixture: ComponentFixture<KategoriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategoriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KategoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
