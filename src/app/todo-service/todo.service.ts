import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Todo } from '../Todos/Todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoWebService: string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo>{
    return this.http.get<Todo[]>(this.todoWebService + '/todos').pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getTodosForUser(username: string): Observable<Todo>{
    return this.http.get<Todo[]>(this.todoWebService + '/todos/username/' + username).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  createTodo(body: string): any{
      return this.http.post(this.todoWebService + '/todos', body, {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
    });
  }

  getTodosPaginated(pagNum: String, pagLen: string): Observable<Todo>{
    return this.http.get<Todo[]>(this.todoWebService + '/todos/' + pagNum + '/' + pagLen).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getTodosPaginatedAndSorted(pagNum: string, pagLen: string, sortBy: string, sortDir: string): Observable<Todo>{
    return this.http.get<Todo[]>(this.todoWebService + '/todos/' + pagNum + '/' + pagLen + '/' + sortBy + '/' + sortDir).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  deleteTodo(id: string): Observable<Todo>{
    return this.http.delete<Todo>(this.todoWebService + '/todos/' + id);
  }

  modifyTodo(id: string, body: string)
  {
    var jwt = sessionStorage.getItem('jwt');
    return this.http.put(this.todoWebService + '/todos/' + id, body, {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + jwt
      })
    });
  }
}
