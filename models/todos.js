const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
   },
  todo: {
   todoTitle: String
   }
  }
});

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = () => {
  return Todo
}
