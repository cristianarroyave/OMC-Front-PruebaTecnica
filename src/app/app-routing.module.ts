import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoPaginationComponent } from './todo-pagination/todo-pagination.component'
import { LoginComponent } from './login/login.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';

const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'createTodo', component: SingleTodoComponent},
  {path: 'pag/:pagLen', component: TodoPaginationComponent},
  {path: 'pag/:pagLen/:sortBy/:sortDir', component: TodoPaginationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'modifyTodo', component: SingleTodoComponent},
  {path: 'forbidden', component: ForbiddenPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
