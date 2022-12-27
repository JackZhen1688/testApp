import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TestComponent } from './demo/test/test.component';
import { NestedFormArrayComponent } from './demo/nested-form-array/nested-form-array.component';
import { ParentComponent } from './demo/parent-child/parent/parent.component';
import { AsyncMethodComponent } from './demo/async-method/async-method.component';
import { InheritClassComponent } from './demo/inherit-class/inherit-class.component';
import { PanelComponent } from './demo/panel/panel.component';
import { MattableReactiveFormComponent } from './demo/mattable-reactive-form/mattable-reactive-form.component';
import { MattableExpandableComponent } from './demo/mattable-expandable/mattable-expandable.component';
import { CaseMilestoneComponent } from './demo/case-milestone/case-milestone.component';

const routes: Routes = [
  { path: 'test', component: TestComponent},
  { path: 'asyncMethod', component: AsyncMethodComponent},
  { path: 'parentChild', component: ParentComponent},
  { path: 'nestedFormArray', component: NestedFormArrayComponent},
  { path: 'inheritClass', component: InheritClassComponent},
  { path: 'panel', component: PanelComponent},
  { path: 'mattableform', component: MattableReactiveFormComponent},
  { path: 'tableexpandable', component: MattableExpandableComponent},
  { path: 'milestone', component: CaseMilestoneComponent},
  { path: '', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
