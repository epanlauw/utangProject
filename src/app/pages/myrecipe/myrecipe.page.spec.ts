import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyrecipePage } from './myrecipe.page';

describe('MyrecipePage', () => {
  let component: MyrecipePage;
  let fixture: ComponentFixture<MyrecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyrecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
