const Authentication = require('../middlewares/Authentication')
const passport = require('passport')
const logger = require('../services/logger.js');


module.exports = app => {
  app.post('/todo', Authentication.isLoggedIn, (req, res) => {
    const model = app.models.todos;
    const connect = app.infra.connectionFactory;
    const Todos = new app.infra.TodoDAO(model, connect);

    const todo = {
      user: {
        id: req.user._id,
        username: req.user.username
      },
      todo: req.body.todo
    };

    Todos.create(todo, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      res.json(response)
      return
    })
  });

  app.get('/todo', Authentication.isLoggedIn, (req, res) => {
    const model = app.models.todos;
    const connect = app.infra.connectionFactory;
    const Todos = new app.infra.TodoDAO(model, connect);

    Todos.list(req.user._id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      const todo = result.map(element => {
        const info = {
          id: element.id,
          todo: element.todo
        }

        return info
      });

      res.json(todo)
    });
  });

  app.put('/todo/:id', Authentication.isLoggedIn, (req, res) => {
    const model = app.models.todos;
    const connect = app.infra.connectionFactory;
    const Todos = new app.infra.TodoDAO(model, connect);
    const id = req.params.id;

    const args = {
      userId: req.user._id,
      todoId: id,
      todo: req.body.todo
    }

    Todos.update(args, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      const oprResult = {
        todoResult: result
      }

      res.json(oprResult)
      return
    });
  });

  app.delete('/todo/:id', Authentication.isLoggedIn, (req, res) => {
    const model = app.models.todos;
    const connect = app.infra.connectionFactory;
    const Todos = new app.infra.TodoDAO(model, connect);
    const id = req.params.id;

    const args = {
      userId: req.user._id,
      todoId: id
    }

    Todos.delete(args, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      let oprResult = {
        todoResult: result
      }

      res.json(oprResult)
      return
    });
  });

  app.post('/todos', (req, res) => {
    const model = app.models.todos;
    const connect = app.infra.connectionFactory;
    const Todos = new app.infra.TodoDAO(model, connect);

    const todo = {
      user: {
        id: req.user._id,
        username: req.user.username
      },
      todo: req.body.todo
    };

    Todos.create(todo, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      res.json(response)
      return
    })
  });

  app.get('/todos', (req, res) => {
    const model = app.models.todos;
    const connect = app.infra.connectionFactory;
    const Todos = new app.infra.TodoDAO(model, connect);

    Todos.list(req.user._id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      const todo = result.map(element => {
        const info = {
          id: element.id,
          todo: element.todo
        }

        return info
      });

      res.json(todo)
    });
  });

  app.delete('/todos/:id', (req, res) => {
    const model = app.models.todos;
    const connect = app.infra.connectionFactory;
    const Todos = new app.infra.TodoDAO(model, connect);
    const id = req.params.id;

    const args = {
      userId: req.user._id,
      todoId: id
    }

    Todos.delete(args, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      let oprResult = {
        todoResult: result
      }

      res.json(oprResult)
      return
    });
  });
}
