import { prisma } from '../src/models/PrismaClient';

async function generateTodos(): Promise<void> {
  console.log('Creating todo items...');
  
  // Sample todos with different priorities and completion statuses
  const todos = [
    {
      title: 'Update website content',
      description: 'Review and update all website content for accuracy and SEO optimization',
      completed: false,
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      title: 'Schedule team meeting',
      description: 'Organize weekly team sync to discuss project progress',
      completed: true,
      priority: 'medium',
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      title: 'Respond to customer emails',
      description: 'Reply to all outstanding customer support requests',
      completed: false,
      priority: 'high',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    },
    {
      title: 'Review analytics report',
      description: 'Analyze website traffic and user engagement metrics',
      completed: false,
      priority: 'medium',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    },
    {
      title: 'Update social media profiles',
      description: 'Refresh content on all company social media accounts',
      completed: true,
      priority: 'low',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
    {
      title: 'Follow up with vendors',
      description: 'Check status of pending orders and delivery timelines',
      completed: false,
      priority: 'medium',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      title: 'Prepare quarterly report',
      description: 'Compile financial and performance data for Q2',
      completed: false,
      priority: 'high',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    },
    {
      title: 'Renew software licenses',
      description: 'Check and renew all expiring software subscriptions',
      completed: false,
      priority: 'low',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    {
      title: 'Organize team building event',
      description: 'Plan and schedule next team building activity',
      completed: false,
      priority: 'low',
      dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    },
    {
      title: 'Update employee handbook',
      description: 'Revise policies and procedures in company handbook',
      completed: true,
      priority: 'medium',
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    },
  ];

  // Create each todo in the database
  for (const todo of todos) {
    const createdTodo = await prisma.todo.create({
      data: todo,
    });
    console.log(`Created todo: ${createdTodo.title}`);
  }

  console.log('Successfully created 10 todo items!');
}

// Run the function
generateTodos()
  .then(() => {
    console.log('Todo data generation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating todo data:', error);
    process.exit(1);
  }); 
