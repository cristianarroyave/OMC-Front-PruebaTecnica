import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo-service/todo.service';
import { Router } from '@angular/router';
import { Todo } from '../Todos/Todos';
import { LoginService } from '../login-service/login-service.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {

  form: FormGroup;
  todo: Todo;
  title: string;
  modoCreacion: boolean;

  constructor(private todoService: TodoService, public loginService: LoginService, private router: Router) { 
    let nav = this.router.getCurrentNavigation();
    if(this.router.url == '/createTodo')
    {
      this.title = "Crear un nuevo ToDo"
      this.modoCreacion = true;
    }
    else if(this.router.url == '/modifyTodo')
    {
      if(!this.loginService.isLogged())
      {
        this.router.navigate(['forbidden']);
        return;
      }
      this.title = "Modificar un ToDo"
      this.modoCreacion = false;
      if(nav?.extras.state)
      {
        this.todo = nav.extras.state['currentTodo'];
      }
    }
  }

  ngOnInit(): void {
    if(this.modoCreacion)
    {
      this.form = new FormGroup({
        user: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
        title: new FormControl('', [Validators.required]),
        completado: new FormControl('', [Validators.required])
      });
    }
    else if(!this.modoCreacion)
    {
      this.form = new FormGroup({
        user: new FormControl(this.todo.usuario.id, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
        title: new FormControl(this.todo.titulo, [Validators.required]),
        completado: new FormControl(this.todo.completado, [Validators.required])
      });
    }
  }

  sendTodo(): void {
    if(this.modoCreacion)
    {
      var body = {
        usuario : this.form.value.user,
        titulo : this.form.value.title,
        completado : this.form.value.completado == "true",
      }
      this.todoService.createTodo(JSON.stringify(body)).subscribe((res: any) => {
       this.router.navigate(['']);
      }, (err: any) => {
        alert(err.error.mensaje);
      })
    }
    else if(!this.modoCreacion)
    {
      var body = {
        usuario : this.form.value.user,
        titulo : this.form.value.title,
        completado : this.form.value.completado == "true",
      }
      this.todoService.modifyTodo(this.todo.id.toString(), JSON.stringify(body)).subscribe((res: any) => {
        this.router.navigate(['']);
      }, (err: any) => {
        alert(err.error.mensaje);
      });
    }
  }
}
