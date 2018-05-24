class TodoDAO {
  constructor(model, connect) {
    this._Todo = model;
    this._connect = connect;
  }

  create(args, callback){
    this._connect();

    this._Todo.create(args, callback)
  }

  list(args, callback){
    this._connect();

    this._Todo.find({"user.id": {$eq: args}}, callback);
  }

  update(args, callback){
    this._connect();

    this._Todo.updateOne(
      {"user.id": {$eq: args.userId}, _id: args.todoId},
      {$set: {todo: args.todo}},
      callback);
  }

  delete(args, callback){
    this._connect();

    this._Todo.deleteOne(
      {"user.id": {$eq: args.userId}, _id: args.todoId},
      callback)
      .then(result => console.log("todo deleted"))
      .catch(err => console.log(err));
  }
}

module.exports = function() {
    return TodoDAO
}
