import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoPaginationComponent } from './todo-pagination/todo-pagination.component';
import { LoginComponent } from './login/login.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoPaginationComponent,
    LoginComponent,
    SingleTodoComponent,
    ForbiddenPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
