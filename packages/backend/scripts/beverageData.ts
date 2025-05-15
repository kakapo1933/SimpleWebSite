import { prisma } from '../src/models/PrismaClient';

// Define type for customization options
type CustomizationOption = {
  name: string;
  price: number;
};

type CustomizationType = {
  type: string;
  options: CustomizationOption[];
};

async function generateBasicBeverageData(): Promise<void> {
  // Define beverage categories
  const categories = [
    { name: 'Coffee', description: 'Freshly brewed coffee drinks', imageUrl: 'https://example.com/coffee.jpg' },
    { name: 'Tea', description: 'Variety of tea options', imageUrl: 'https://example.com/tea.jpg' },
    { name: 'Smoothies', description: 'Fruit and vegetable smoothies', imageUrl: 'https://example.com/smoothies.jpg' },
    { name: 'Juices', description: 'Freshly squeezed juices', imageUrl: 'https://example.com/juices.jpg' },
    { name: 'Specialty Drinks', description: 'Signature specialty beverages', imageUrl: 'https://example.com/specialty.jpg' },
  ];

  // Create beverage categories
  console.log('Creating beverage categories...');
  const createdCategories = [];
  for (const category of categories) {
    const createdCategory = await prisma.beverageCategory.create({
      data: category,
    });
    createdCategories.push(createdCategory);
    console.log(`Created category: ${category.name}`);
  }

  // Define beverage names for each category
  const beveragesByCategory = {
    'Coffee': [
      'Espresso', 'Americano', 'Cappuccino', 'Latte', 'Mocha', 'Macchiato', 
      'Cold Brew', 'Flat White', 'Affogato', 'Irish Coffee',
    ],
    'Tea': [
      'Green Tea', 'Black Tea', 'Oolong Tea', 'Chai Tea', 'Earl Grey', 
      'Chamomile', 'Peppermint Tea', 'Matcha Latte', 'Bubble Tea', 'Jasmine Tea',
    ],
    'Smoothies': [
      'Berry Blast', 'Tropical Paradise', 'Green Machine', 'Banana Boost', 
      'Mango Tango', 'Strawberry Delight', 'Pineapple Punch', 'Blueberry Bliss', 
      'Kale Kickstart', 'Protein Power',
    ],
    'Juices': [
      'Orange Juice', 'Apple Juice', 'Carrot Juice', 'Watermelon Juice', 
      'Pineapple Juice', 'Grapefruit Juice', 'Celery Juice', 'Beet Juice', 
      'Cucumber Juice', 'Mixed Fruit Juice',
    ],
    'Specialty Drinks': [
      'Caramel Frappuccino', 'Vanilla Bean Frappe', 'Chocolate Milkshake', 
      'Strawberry Milkshake', 'Iced Matcha Latte', 'Coconut Water', 'Horchata', 
      'Boba Milk Tea', 'Lavender Latte', 'Turmeric Golden Milk',
    ],
  };

  // Create beverages
  console.log('Creating beverages...');
  const createdBeverages = [];
  for (const category of createdCategories) {
    // TypeScript: Use type assertion to ensure the type is correct
    const categoryName = category.name as keyof typeof beveragesByCategory;
    const beverageNames = beveragesByCategory[categoryName];

    for (const name of beverageNames) {
      const price = parseFloat((Math.random() * 8 + 2).toFixed(2)); // Random price between $2 and $10
      const isPopular = Math.random() > 0.7; // 30% chance of being popular
      const isNew = Math.random() > 0.8; // 20% chance of being new

      const beverage = {
        name,
        description: `Delicious ${name.toLowerCase()} made with premium ingredients.`,
        price,
        imageUrl: `https://example.com/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        isPopular,
        isNew,
        categoryId: category.id,
      };

      const createdBeverage = await prisma.beverage.create({
        data: beverage,
      });
      createdBeverages.push(createdBeverage);
      console.log(`Created beverage: ${beverage.name}`);
    }
  }

  // Create customizations for each beverage
  console.log('Creating beverage customizations...');
  const customizationTypes: CustomizationType[] = [
    {
      type: 'size',
      options: [
        { name: 'Small', price: 0 },
        { name: 'Medium', price: 1 },
        { name: 'Large', price: 2 },
      ],
    },
    {
      type: 'temperature',
      options: [
        { name: 'Hot', price: 0 },
        { name: 'Iced', price: 0.5 },
      ],
    },
    {
      type: 'sweetness',
      options: [
        { name: 'Unsweetened', price: 0 },
        { name: 'Half Sweet', price: 0 },
        { name: 'Normal Sweet', price: 0 },
        { name: 'Extra Sweet', price: 0.5 },
      ],
    },
    {
      type: 'add-in',
      options: [
        { name: 'Boba', price: 1 },
        { name: 'Aloe Vera', price: 1 },
        { name: 'Grass Jelly', price: 1 },
        { name: 'Coconut Jelly', price: 1 },
      ],
    },
  ];

  for (const beverage of createdBeverages) {
    // Not all customizations apply to all beverages
    const applicableCustomizations = customizationTypes.filter((c) => {
      if (c.type === 'add-in' && !beverage.name.includes('Tea') && !beverage.name.includes('Smoothie')) {
        return false;
      }
      if ((c.type === 'temperature' && beverage.name.includes('Smoothie')) || beverage.name.includes('Juice')) {
        return false;
      }
      return true;
    });

    for (const customization of applicableCustomizations) {
      await prisma.beverageCustomization.create({
        data: {
          name: `${customization.type.charAt(0).toUpperCase() + customization.type.slice(1)}`,
          type: customization.type,
          options: customization.options,
          beverageId: beverage.id,
        },
      });
      console.log(`Created customization: ${customization.type} for ${beverage.name}`);
    }
  }

  console.log('Successfully created basic beverages and customizations!');
}

// Run the function
generateBasicBeverageData().then(() => {
  console.log('Data generation complete!');
  process.exit(0);
}).catch((error) => {
  console.error('Error generating data:', error);
  process.exit(1);
}); 
