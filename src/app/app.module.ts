import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyPipe, DatePipe } from '@angular/common'
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
import { NgxMaskModule } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { PanelComponent } from './demo/panel/panel.component';
import { MdePopoverModule } from '@material-extended/mde';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MattableReactiveFormComponent } from './demo/mattable-reactive-form/mattable-reactive-form.component';
import { MattableExpandableComponent } from './demo/mattable-expandable/mattable-expandable.component';
import { CaseMilestoneComponent } from './demo/case-milestone/case-milestone.component';

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
    DialogMessageYesnoComponent,
    PanelComponent,
    MattableReactiveFormComponent,
    MattableExpandableComponent,
    CaseMilestoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MdePopoverModule,
    MatCardModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [ShareService,CurrencyPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
