# API-Docs

### Models

#### 1.Task

---

```
    {
        title:String,
        priority:Number,
        is_finished:Boolean,
        is_cancelled:Boolean,
    }
```

#### 2.User

---

```
    {
        username:String,
        password:String,
    }
```

### Endpoints

---

0._/signup_

```
    POST - create a new user
```

1._/alltasks_

```
GET - All the Todo Tasks
POST - Add a new Todo Task
```

2._/report_

```
GET - Summary of the tasks
```

3._/markcomplete_

```

POST - Mark a todo task complete (POST the id only)
```

3._/markincomplete_

```

POST - Mark a todo task incomplete (POST the id only)
```

3._/markcancelled_

```

POST - Mark a todo task cancelled (POST the id only)
```

3._/marknotcomplete_

```

POST - Mark a todo task not cancelled (POST the id only)
```
