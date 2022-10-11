import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo-service/todo.service';
import { Todo } from '../Todos/Todos';
import { Router } from '@angular/router';
import { LoginService } from '../login-service/login-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  filterUserName: string;

  todos: Todo[];

  constructor(private todoService: TodoService, public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((res: any) => {
      this.todos = res;
    }, (err: any) => {
      alert(err);
      }
    );
  }

  filterByName(): void {
    if(this.filterUserName == "" || !this.filterUserName)
    {
      return;
    }
    this.todoService.getTodosForUser(this.filterUserName).subscribe((res: any) => {
      this.todos = res;
    }, (err: any) => {
      if(err.status = 404)
      {
        alert("Este usuario no existe!");
      }else
      {
        alert("Error desconocido");
      }
    })
  }

  delete(id: number): void
  {
    if(confirm('Are you sure? This operation cannot be undone'))
    {
      this.todoService.deleteTodo(id.toString()).subscribe((res: any) => {
        window.location.reload()
      }, (err: any) => {
        alert("Error " + err);
      })
    }
    else
    {
      return;
    }
  }

  edit(todo: Todo)
  {
    this.router.navigate(["modifyTodo"], { state: { currentTodo: todo } });
  }

}
