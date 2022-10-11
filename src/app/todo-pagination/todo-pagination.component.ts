import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { LoginService } from '../login-service/login-service.service';
import { TodoService } from '../todo-service/todo.service';
import { Todo } from '../Todos/Todos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-pagination',
  templateUrl: './todo-pagination.component.html',
  styleUrls: ['./todo-pagination.component.css']
})
export class TodoPaginationComponent implements OnInit {

  constructor(public params: ActivatedRoute, public todoService: TodoService, public loginService: LoginService, private router: Router) { }

  pagNum: number = 0;

  pagLen: string;

  sortBy: string;

  sortDir: string;

  todos: Todo[];

  ngOnInit(): void {
    this.pagLen = this.params.snapshot.params['pagLen'];
    this.sortBy = this.params.snapshot.params['sortBy'];
    this.sortDir = this.params.snapshot.params['sortDir'];

    if(this.pagLen && this.sortBy && this.sortDir)
    {
      this.todoService.getTodosPaginatedAndSorted(this.pagNum.toString(), this.pagLen, this.sortBy, this.sortDir).subscribe((res: any) => {
        this.todos = res;
      }, (err: any) => {
        console.log(err);
      })
    }
    else if(this.pagLen)
    {
      this.todoService.getTodosPaginated(this.pagNum.toString(), this.pagLen).subscribe((res: any) => {
        this.todos = res;
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  changePage(direction: string)
  {
    if(direction == "up")
    {
      this.pagNum++;
    }
    else if(direction == "down")
    {
      if(this.pagNum == 0)
      {
        return;
      }
      this.pagNum--;
    }
    
    if(this.pagLen && this.sortBy && this.sortDir)
    {
      this.todoService.getTodosPaginatedAndSorted(this.pagNum.toString(), this.pagLen, this.sortBy, this.sortDir).subscribe((res: any) => {
        this.todos = res;
      }, (err: any) => {
        console.log(err);
      })
    }
    else if(this.pagLen)
    {
      this.todoService.getTodosPaginated(this.pagNum.toString(), this.pagLen).subscribe((res: any) => {
        this.todos = res;
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  edit(todo: Todo)
  {
    this.router.navigate(["modifyTodo"], { state: { currentTodo: todo } });
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

}
