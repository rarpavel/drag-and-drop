const mongoose = require('mongoose');
const Status = require('./models/Status'); 

// mongoose.connect('mongodb://localhost:27017/graphql-demo', {
mongoose.connect('mongodb://mongo:27017/graphql-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');
  
  const count = await Status.countDocuments();
  if (count === 0) {
    const statuses = [
      { name: 'To Do', order: 1 },
      { name: 'In Progress', order: 2 },
      { name: 'Review', order: 3 },
      { name: 'Done', order: 4 }
    ];

    await Status.insertMany(statuses);
    console.log('Statuses created successfully');
  } else {
    console.log('Statuses already exist in the database');
  }

  mongoose.connection.close();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
