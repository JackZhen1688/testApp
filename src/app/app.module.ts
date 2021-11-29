import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatDialogModule } from '@angular/material/dialog';
import { TestComponent } from './demo/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NestedFormArrayComponent } from './demo/nested-form-array/nested-form-array.component';
import { AsyncMethodComponent } from './demo/async-method/async-method.component';
import { ParentComponent } from './demo/parent-child/parent/parent.component';
import { ChildComponent } from './demo/parent-child/child/child.component';
import { MenuComponent } from './menu/menu.component';
import { ShareService } from './services/share.service';
import { EditSliderComponent } from './demo/inherit-class/edit-slider';
import { InheritClassComponent } from './demo/inherit-class/inherit-class.component';
import { DialogMessageYesnoComponent } from './utilitis/dialog-message-yesno/dialog-message-yesno.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NestedFormArrayComponent,
    AsyncMethodComponent,
    ParentComponent,
    ChildComponent,
    MenuComponent,
    EditSliderComponent,
    InheritClassComponent,
    DialogMessageYesnoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    BrowserAnimationsModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
