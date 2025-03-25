import { prisma } from "../src/models/PrismaClient";

// Define type for customization options
type CustomizationOption = {
  name: string;
  price: number;
};

async function generateBeverageData(): Promise<void> {
  // Define beverage categories
  const categories = [
    { name: "Coffee", description: "Freshly brewed coffee drinks", imageUrl: "https://example.com/coffee.jpg" },
    { name: "Tea", description: "Variety of tea options", imageUrl: "https://example.com/tea.jpg" },
    { name: "Smoothies", description: "Fruit and vegetable smoothies", imageUrl: "https://example.com/smoothies.jpg" },
    { name: "Juices", description: "Freshly squeezed juices", imageUrl: "https://example.com/juices.jpg" },
    { name: "Specialty Drinks", description: "Signature specialty beverages", imageUrl: "https://example.com/specialty.jpg" }
  ];

  // Create beverage categories
  console.log("Creating beverage categories...");
  const createdCategories = [];
  for (const category of categories) {
    const createdCategory = await prisma.beverageCategory.create({
      data: category
    });
    createdCategories.push(createdCategory);
    console.log(`Created category: ${category.name}`);
  }

  // Define beverage names for each category
  const beveragesByCategory = {
    "Coffee": [
      "Espresso", "Americano", "Cappuccino", "Latte", "Mocha", "Macchiato", 
      "Cold Brew", "Flat White", "Affogato", "Irish Coffee"
    ],
    "Tea": [
      "Green Tea", "Black Tea", "Oolong Tea", "Chai Tea", "Earl Grey", 
      "Chamomile", "Peppermint Tea", "Matcha Latte", "Bubble Tea", "Jasmine Tea"
    ],
    "Smoothies": [
      "Berry Blast", "Tropical Paradise", "Green Machine", "Banana Boost", 
      "Mango Tango", "Strawberry Delight", "Pineapple Punch", "Blueberry Bliss", 
      "Kale Kickstart", "Protein Power"
    ],
    "Juices": [
      "Orange Juice", "Apple Juice", "Carrot Juice", "Watermelon Juice", 
      "Pineapple Juice", "Grapefruit Juice", "Celery Juice", "Beet Juice", 
      "Cucumber Juice", "Mixed Fruit Juice"
    ],
    "Specialty Drinks": [
      "Caramel Frappuccino", "Vanilla Bean Frappe", "Chocolate Milkshake", 
      "Strawberry Milkshake", "Iced Matcha Latte", "Coconut Water", "Horchata", 
      "Boba Milk Tea", "Lavender Latte", "Turmeric Golden Milk"
    ]
  };

  // Create beverages
  console.log("Creating beverages...");
  const createdBeverages = [];
  for (const category of createdCategories) {
    const beverageNames = beveragesByCategory[category.name as keyof typeof beveragesByCategory];

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
        categoryId: category.id
      };

      const createdBeverage = await prisma.beverage.create({
        data: beverage
      });
      createdBeverages.push(createdBeverage);
      console.log(`Created beverage: ${beverage.name}`);
    }
  }

  // Create customizations for each beverage
  console.log("Creating beverage customizations...");
  const customizationTypes = [
    {
      type: "size",
      options: [
        { name: "Small", price: 0 },
        { name: "Medium", price: 1 },
        { name: "Large", price: 2 }
      ]
    },
    {
      type: "temperature",
      options: [
        { name: "Hot", price: 0 },
        { name: "Iced", price: 0.5 }
      ]
    },
    {
      type: "sweetness",
      options: [
        { name: "Unsweetened", price: 0 },
        { name: "Half Sweet", price: 0 },
        { name: "Normal Sweet", price: 0 },
        { name: "Extra Sweet", price: 0.5 }
      ]
    },
    {
      type: "add-in",
      options: [
        { name: "Boba", price: 1 },
        { name: "Aloe Vera", price: 1 },
        { name: "Grass Jelly", price: 1 },
        { name: "Coconut Jelly", price: 1 }
      ]
    }
  ];

  for (const beverage of createdBeverages) {
    // Not all customizations apply to all beverages
    const applicableCustomizations = customizationTypes.filter(c => {
      if (c.type === "add-in" && !beverage.name.includes("Tea") && !beverage.name.includes("Smoothie")) {
        return false;
      }
      if (c.type === "temperature" && beverage.name.includes("Smoothie") || beverage.name.includes("Juice")) {
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
          beverageId: beverage.id
        }
      });
      console.log(`Created customization: ${customization.type} for ${beverage.name}`);
    }
  }

  // Create some orders and order items
  console.log("Creating orders and order items...");
  const customerNames = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Williams", "Charlie Brown"];
  const customerEmails = ["john@example.com", "jane@example.com", "bob@example.com", "alice@example.com", "charlie@example.com"];
  const customerPhones = ["+886912345678", "+886923456789", "+886934567890", "+886945678901", "+886956789012"];
  const paymentMethods = ["Credit Card", "Cash", "Mobile Payment"];
  const orderStatuses = ["pending", "preparing", "ready", "completed", "cancelled"];
  const paymentStatuses = ["unpaid", "paid", "refunded"];

  // Create 100 orders
  for (let i = 0; i < 100; i++) {
    const customerIndex = Math.floor(Math.random() * customerNames.length);
    const orderItems = [];
    const numItems = Math.floor(Math.random() * 5) + 1; // 1-5 items per order

    // Select random beverages for this order
    const selectedBeverages = [];
    for (let j = 0; j < numItems; j++) {
      const randomBeverageIndex = Math.floor(Math.random() * createdBeverages.length);
      selectedBeverages.push(createdBeverages[randomBeverageIndex]);
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const beverage of selectedBeverages) {
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
      const customizations = [];

      // Add random customizations
      const customizationData = await prisma.beverageCustomization.findMany({
        where: { beverageId: beverage.id }
      });

      for (const customization of customizationData) {
        const options = customization.options satisfies CustomizationOption[];
        const selectedOption = options[Math.floor(Math.random() * options.length)];
        customizations.push({
          type: customization.type,
          option: selectedOption.name,
          price: selectedOption.price
        });
        totalAmount += selectedOption.price * quantity;
      }

      totalAmount += parseFloat(beverage.price.toString()) * quantity;

      orderItems.push({
        beverageId: beverage.id,
        quantity,
        price: beverage.price,
        customizations,
        notes: Math.random() > 0.7 ? "Extra hot please" : null
      });
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        customerName: customerNames[customerIndex],
        customerEmail: customerEmails[customerIndex],
        customerPhone: customerPhones[customerIndex],
        status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        totalAmount,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        items: {
          create: orderItems.map(item => ({
            beverageId: item.beverageId,
            quantity: item.quantity,
            price: item.price,
            customizations: item.customizations,
            notes: item.notes
          }))
        }
      }
    });

    console.log(`Created order #${order.id} with ${orderItems.length} items, total: $${totalAmount.toFixed(2)}`);
  }

  // Create some group orders
  console.log("Creating group orders...");
  const groupNames = ["Office Lunch", "Team Meeting", "Birthday Party", "Study Group", "Family Gathering"];
  const creatorNames = ["Team Lead", "Manager", "Birthday Person", "Group Organizer", "Family Member"];

  for (let i = 0; i < 10; i++) {
    const nameIndex = Math.floor(Math.random() * groupNames.length);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + Math.floor(Math.random() * 48) + 1); // Expires in 1-48 hours

    // Generate a unique share code with timestamp and random string
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 6);
    const shareCode = `SHARE${timestamp}${randomStr}`.toUpperCase();

    const groupOrder = await prisma.groupOrder.create({
      data: {
        name: `${groupNames[nameIndex]} ${i + 1}`,
        shareCode,
        creatorName: `${creatorNames[nameIndex]} ${i + 1}`,
        expiresAt,
        status: Math.random() > 0.2 ? "active" : "completed"
      }
    });

    console.log(`Created group order: ${groupOrder.name} with share code: ${groupOrder.shareCode}`);
  }

  // Create some cart items
  console.log("Creating cart items...");
  const sessionIds = ["session1", "session2", "session3", "session4", "session5"];

  for (let i = 0; i < 20; i++) {
    const sessionId = sessionIds[Math.floor(Math.random() * sessionIds.length)];
    const beverageId = createdBeverages[Math.floor(Math.random() * createdBeverages.length)].id;
    const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity

    const customizations = [];
    const customizationData = await prisma.beverageCustomization.findMany({
      where: { beverageId }
    });

    for (const customization of customizationData) {
      const options = customization.options satisfies CustomizationOption[];
      const selectedOption = options[Math.floor(Math.random() * options.length)];
      customizations.push({
        type: customization.type,
        option: selectedOption.name,
        price: selectedOption.price
      });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        sessionId,
        beverageId,
        quantity,
        customizations,
        notes: Math.random() > 0.7 ? "No ice please" : null
      }
    });

    console.log(`Created cart item for session: ${sessionId}, beverage ID: ${beverageId}`);
  }

  console.log("Successfully created all beverage-related mock data!");
}

generateBeverageData().then(() => {
  console.log("Data generation complete!");
  process.exit(0);
}).catch(error => {
  console.error("Error generating data:", error);
  process.exit(1);
});