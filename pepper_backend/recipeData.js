const recipes = [
    {
        title: "Spaghetti Carbonara",
        imgSrc: "https://example.com/images/spaghetti-carbonara.jpg",
        cookTime: "20 mins",
        prepTime: "10 mins",
        Servings: "4",
        cardDescription: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        description: "Spaghetti Carbonara is a rich, creamy pasta dish that's easy to make and incredibly delicious. Perfect for a quick dinner.",
        sts_process: [
            "Cook the spaghetti in a large pot of boiling salted water until al dente.",
            "Meanwhile, cook the pancetta in a large skillet over medium heat until crisp.",
            "In a bowl, whisk together the eggs and Parmesan cheese.",
            "Drain the pasta, reserving some cooking water, and add it to the skillet with the pancetta.",
            "Remove from heat and quickly mix in the egg and cheese mixture, adding reserved pasta water if needed to create a creamy sauce.",
            "Season with black pepper and serve immediately."
        ],
        noOfIngredients: 7,
        ingredients: [
            "200g spaghetti",
            "100g pancetta",
            "2 large eggs",
            "50g grated Parmesan cheese",
            "Salt to taste",
            "Black pepper to taste",
            "1/2 cup of reserved pasta water"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Classic Margherita Pizza",
        imgSrc: "https://example.com/images/margherita-pizza.jpg",
        cookTime: "15 mins",
        prepTime: "1 hour",
        Servings: "2",
        cardDescription: "A simple and delicious pizza topped with fresh tomatoes, mozzarella, and basil.",
        description: "Margherita Pizza is a traditional Italian pizza that is known for its simple yet flavorful toppings. Perfect for pizza night.",
        sts_process: [
            "Preheat the oven to 475°F (245°C).",
            "Roll out the pizza dough on a floured surface to your desired thickness.",
            "Spread a thin layer of tomato sauce over the dough.",
            "Top with fresh mozzarella slices and tomato slices.",
            "Bake in the preheated oven until the crust is golden brown and the cheese is bubbly.",
            "Remove from the oven and top with fresh basil leaves before serving."
        ],
        noOfIngredients: 6,
        ingredients: [
            "1 pizza dough",
            "1/2 cup of tomato sauce",
            "150g fresh mozzarella",
            "2 tomatoes, sliced",
            "Fresh basil leaves",
            "1 tbsp of olive oil"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Chicken Caesar Salad",
        imgSrc: "https://example.com/images/chicken-caesar-salad.jpg",
        cookTime: "10 mins",
        prepTime: "20 mins",
        Servings: "4",
        cardDescription: "A refreshing salad with romaine lettuce, grilled chicken, croutons, and Caesar dressing.",
        description: "Chicken Caesar Salad is a hearty and flavorful salad that makes for a perfect lunch or light dinner.",
        sts_process: [
            "Grill the chicken breasts until fully cooked, then slice.",
            "In a large bowl, toss the romaine lettuce with Caesar dressing.",
            "Add the sliced chicken and croutons to the salad.",
            "Top with grated Parmesan cheese and a squeeze of lemon juice.",
            "Serve immediately."
        ],
        noOfIngredients: 8,
        ingredients: [
            "2 chicken breasts",
            "1 head of romaine lettuce, chopped",
            "1/2 cup of Caesar dressing",
            "1 cup of croutons",
            "1/4 cup of grated Parmesan cheese",
            "1 lemon, cut into wedges",
            "Salt to taste",
            "Black pepper to taste"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Beef Tacos",
        imgSrc: "https://example.com/images/beef-tacos.jpg",
        cookTime: "15 mins",
        prepTime: "10 mins",
        Servings: "4",
        cardDescription: "Flavorful beef tacos topped with fresh vegetables and a tangy sauce.",
        description: "Beef Tacos are a quick and delicious meal that can be customized with your favorite toppings.",
        sts_process: [
            "Cook the ground beef in a skillet over medium heat until browned.",
            "Add taco seasoning and water according to the package instructions.",
            "Simmer until the sauce thickens.",
            "Warm the taco shells in the oven or microwave.",
            "Assemble the tacos with beef, lettuce, tomatoes, cheese, and your favorite toppings.",
            "Serve immediately."
        ],
        noOfIngredients: 10,
        ingredients: [
            "500g ground beef",
            "1 packet of taco seasoning",
            "1/2 cup of water",
            "8 taco shells",
            "1 cup of shredded lettuce",
            "1 cup of diced tomatoes",
            "1 cup of shredded cheese",
            "1/2 cup of sour cream",
            "1/2 cup of salsa",
            "1/2 cup of guacamole"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Vegetable Stir-Fry",
        imgSrc: "https://example.com/images/vegetable-stir-fry.jpg",
        cookTime: "10 mins",
        prepTime: "15 mins",
        Servings: "4",
        cardDescription: "A colorful and healthy vegetable stir-fry with a savory sauce.",
        description: "Vegetable Stir-Fry is a quick and easy meal that's packed with nutrients and flavor.",
        sts_process: [
            "Heat oil in a large skillet or wok over high heat.",
            "Add the chopped vegetables and stir-fry for 5-7 minutes until tender-crisp.",
            "In a small bowl, whisk together soy sauce, garlic, ginger, and cornstarch with water.",
            "Pour the sauce over the vegetables and stir to coat evenly.",
            "Cook for another 2-3 minutes until the sauce thickens.",
            "Serve immediately over rice or noodles."
        ],
        noOfIngredients: 9,
        ingredients: [
            "2 tbsp of vegetable oil",
            "1 red bell pepper, sliced",
            "1 yellow bell pepper, sliced",
            "1 head of broccoli, cut into florets",
            "1 carrot, julienned",
            "1 cup of snap peas",
            "3 tbsp of soy sauce",
            "2 cloves of garlic, minced",
            "1 tsp of grated ginger"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Chocolate Chip Cookies",
        imgSrc: "https://example.com/images/chocolate-chip-cookies.jpg",
        cookTime: "12 mins",
        prepTime: "15 mins",
        Servings: "24",
        cardDescription: "Classic chocolate chip cookies with a chewy center and crispy edges.",
        description: "These Chocolate Chip Cookies are a favorite treat that's perfect for any occasion. Enjoy with a glass of milk.",
        sts_process: [
            "Preheat the oven to 350°F (175°C).",
            "In a bowl, cream together the butter and sugars until light and fluffy.",
            "Beat in the eggs one at a time, then stir in the vanilla.",
            "Combine the flour, baking soda, and salt; gradually add to the creamed mixture.",
            "Stir in the chocolate chips.",
            "Drop by rounded spoonfuls onto ungreased baking sheets.",
            "Bake for 10-12 minutes until edges are golden brown.",
            "Cool on wire racks."
        ],
        noOfIngredients: 10,
        ingredients: [
            "1 cup of butter, softened",
            "1 cup of white sugar",
            "1 cup of packed brown sugar",
            "2 large eggs",
            "2 tsp of vanilla extract",
            "3 cups of all-purpose flour",
            "1 tsp of baking soda",
            "1/2 tsp of salt",
            "2 cups of semisweet chocolate chips",
            "1 cup of chopped walnuts (optional)"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Mango Smoothie",
        imgSrc: "https://example.com/images/mango-smoothie.jpg",
        cookTime: "5 mins",
        prepTime: "5 mins",
        Servings: "2",
        cardDescription: "A refreshing and creamy mango smoothie made with fresh mangoes and yogurt.",
        description: "This Mango Smoothie is perfect for a quick breakfast or a refreshing snack. It's healthy and delicious.",
        sts_process: [
            "Peel and dice the mangoes.",
            "Combine the mango, yogurt, milk, honey, and ice cubes in a blender.",
            "Blend until smooth and creamy.",
            "Pour into glasses and serve immediately."
        ],
        noOfIngredients: 5,
        ingredients: [
            "2 ripe mangoes",
            "1 cup of plain yogurt",
            "1/2 cup of milk",
            "2 tbsp of honey",
            "1 cup of ice cubes"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Chicken Curry",
        imgSrc: "https://example.com/images/chicken-curry.jpg",
        cookTime: "30 mins",
        prepTime: "15 mins",
        Servings: "4",
        cardDescription: "A flavorful and spicy chicken curry cooked with aromatic spices and coconut milk.",
        description: "Chicken Curry is a comforting dish that's full of flavor. Serve it with rice or naan bread.",
        sts_process: [
            "Heat oil in a large pot over medium heat.",
            "Add the onions and cook until softened.",
            "Add the garlic, ginger, and spices; cook for another minute.",
            "Add the chicken and cook until browned on all sides.",
            "Stir in the tomatoes and coconut milk.",
            "Simmer for 20 minutes until the chicken is cooked through and the sauce has thickened.",
            "Serve hot with rice or naan."
        ],
        noOfIngredients: 12,
        ingredients: [
            "2 tbsp of vegetable oil",
            "1 large onion, chopped",
            "3 cloves of garlic, minced",
            "1 tbsp of grated ginger",
            "1 tbsp of curry powder",
            "1 tsp of ground cumin",
            "1 tsp of ground coriander",
            "1/2 tsp of turmeric",
            "1/2 tsp of chili powder",
            "500g of chicken breast, cut into pieces",
            "1 can (400ml) of coconut milk",
            "1 can (400g) of diced tomatoes"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "French Toast",
        imgSrc: "https://example.com/images/french-toast.jpg",
        cookTime: "10 mins",
        prepTime: "5 mins",
        Servings: "4",
        cardDescription: "Classic French toast made with thick slices of bread soaked in a cinnamon-vanilla custard.",
        description: "French Toast is a perfect breakfast or brunch treat that's easy to make and absolutely delicious.",
        sts_process: [
            "In a shallow dish, whisk together the eggs, milk, cinnamon, and vanilla extract.",
            "Dip each slice of bread into the egg mixture, ensuring both sides are well-coated.",
            "Heat a non-stick skillet over medium heat and melt the butter.",
            "Cook the bread slices until golden brown on both sides.",
            "Serve with maple syrup, fresh fruit, or powdered sugar."
        ],
        noOfIngredients: 7,
        ingredients: [
            "4 large eggs",
            "1 cup of milk",
            "1 tsp of ground cinnamon",
            "1 tsp of vanilla extract",
            "8 slices of thick bread",
            "2 tbsp of butter",
            "Maple syrup for serving"
        ],
        nutrition: null,
        user: null,
        reviews: []
    },
    {
        title: "Caprese Salad",
        imgSrc: "https://example.com/images/caprese-salad.jpg",
        cookTime: "0 mins",
        prepTime: "10 mins",
        Servings: "4",
        cardDescription: "A simple and fresh salad with tomatoes, mozzarella, and basil, drizzled with balsamic glaze.",
        description: "Caprese Salad is a classic Italian dish that's perfect as an appetizer or a light meal.",
        sts_process: [
            "Slice the tomatoes and mozzarella into 1/4-inch thick slices.",
            "Arrange the tomato and mozzarella slices on a serving platter, alternating them and overlapping slightly.",
            "Tuck fresh basil leaves between the slices.",
            "Drizzle with olive oil and balsamic glaze.",
            "Season with salt and pepper to taste.",
            "Serve immediately."
        ],
        noOfIngredients: 6,
        ingredients: [
            "4 ripe tomatoes",
            "250g of fresh mozzarella",
            "1 bunch of fresh basil leaves",
            "2 tbsp of olive oil",
            "2 tbsp of balsamic glaze",
            "Salt and pepper to taste"
        ],
        nutrition: null,
        user: null,
        reviews: []
    }
];

module.exports = recipes;
