# API-Docs

## Models

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

## Authentication

---

The server uses Basic Authentication

The Authorization header follows this format:

```
    Authorization: Basic <credentials>
```

_1.The user’s username and password are combined with a colon._

_2.The resulting string is base64 encoded._
Eg.

```
    Authorization: Basic dHdpbGlvOmFob3kh
```

## Endpoints

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
