import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Highlights
  {
    id: 'h1',
    name: 'Authentic Kosovo Macchiato',
    originalName: 'Makiato e Madhe',
    category: 'highlights',
    price: 1.50,
    description: 'Kosovo’s world-renowned layered macchiato. Double ristretto topped with dense, silky microfoam created by expert baristas. Served in a crystal glass with sparkling water.',
    ingredients: ['Double espresso blend', 'Whole milk microfoam', 'Cocoa dust (optional)'],
    dietary: ['vegetarian', 'signature'],
    highlight: true,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    originStory: 'Kosovo has been hailed as having the best macchiato culture in Europe, perfecting the microfoam technique over decades.',
    rating: 4.9
  },
  {
    id: 'h2',
    name: 'Museum Handmade Pierogi',
    originalName: 'Piroga Tradicionale',
    category: 'highlights',
    price: 5.50,
    description: 'Freshly hand-kneaded dumplings stuffed with spiced potato and farmer curd cheese or seasoned minced beef. Pan-seared in butter and topped with caramelized onions and chilled sour cream.',
    ingredients: ['Handmade dough', 'Potato & curd cheese', 'Caramelized sweet onions', 'Balkan sour cream', 'Chives'],
    dietary: ['vegetarian', 'chef-pick'],
    highlight: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    originStory: 'A specialty brought to the pub celebrating cross-cultural travelers and historic comfort culinary traditions.',
    rating: 4.8
  },
  {
    id: 'h3',
    name: 'Museum Garden & Grill Wrap',
    originalName: 'Wrap Special Muzeu',
    category: 'highlights',
    price: 4.80,
    description: 'Warm grilled flatbread wrapped with your choice of seasoned chicken, grilled halloumi, or our 100% Vegan configuration with roasted Mediterranean vegetables, house hummus & tahini.',
    ingredients: ['Artisan flatbread', 'Crisp romaine', 'Pickled red cabbage', 'Smoked garlic sauce / Tahini', 'Fresh mint'],
    dietary: ['halal', 'vegan', 'signature'],
    highlight: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    originStory: 'Praised by our regular guests and local guides for its versatility and fully customizable vegan preparations.',
    rating: 4.7
  },
  {
    id: 'h4',
    name: 'Sharri Stone Smoked Burger',
    originalName: 'Burgers me Djath Sharri',
    category: 'highlights',
    price: 6.90,
    description: '200g prime aged Balkan beef patty char-grilled over lava stones, melted local Sharri smoked kashkaval cheese, crispy shallots, tomato, and Museum Pub secret relish in brioche.',
    ingredients: ['Aged prime beef', 'Sharri mountain cheese', 'Brioche bun', 'House relish', 'Hand-cut fries'],
    dietary: ['halal', 'signature'],
    highlight: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },

  // Coffee & Breakfast
  {
    id: 'c1',
    name: 'Espresso Single / Double',
    originalName: 'Ekspres',
    category: 'coffee-breakfast',
    price: 1.00,
    description: 'Rich, aromatic medium-dark roast with a thick golden crema. Served with complimentary mineral water and chocolate bite.',
    ingredients: ['100% Arabica & Robusta select blend'],
    dietary: ['vegan', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'c2',
    name: 'Turkish Coffee in Sand Cezve',
    originalName: 'Kafe Turke me Nishaste',
    category: 'coffee-breakfast',
    price: 1.50,
    description: 'Slow-brewed in a brass cezve over hot sand, yielding an intensely rich, velvety foam. Served with authentic Balkan lokum (Turkish delight).',
    ingredients: ['Fine-ground roasted coffee', 'Spring water', 'Pistachio Turkish delight'],
    dietary: ['vegan', 'gluten-free', 'signature'],
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'c3',
    name: 'Museum Morning Board',
    originalName: 'Mëngjes Tradicional',
    category: 'coffee-breakfast',
    price: 5.20,
    description: 'Fried farm eggs, cured beef suxhuk slices, fresh village white cheese, cured olives, homemade ajvar, honey, and warm somun bread.',
    ingredients: ['Farm eggs', 'Cured suxhuk', 'White brine cheese', 'Ajvar', 'Hot somun bread'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },

  // Starters & Mezze
  {
    id: 's1',
    name: 'Ottoman Bath Vault Mezze Board',
    originalName: 'Pjatë Meze Hamami',
    category: 'starters',
    price: 8.90,
    description: 'Generous sharing platter featuring aged Sharri cheeses, smoked beef prosciutto, house-made roasted red pepper ajvar, pickled hot peppers, olives, and fresh herb somun.',
    ingredients: ['Prosciutto', 'Artisan cheeses', 'Homemade ajvar', 'Kajmak', 'Olives', 'Somun flatbread'],
    dietary: ['chef-pick'],
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 's2',
    name: 'Crispy Fried Cheese Sticks with Garlic Dip',
    originalName: 'Kaçkavall i Skuqur',
    category: 'starters',
    price: 4.50,
    description: 'Golden crumbed Sharri kashkaval cheese melted on the inside, served with lemon-garlic aioli and sweet chili jam.',
    ingredients: ['Balkan kashkaval', 'Panko breadcrumbs', 'Garlic herb aioli'],
    dietary: ['vegetarian'],
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80',
    rating: 4.6
  },
  {
    id: 's3',
    name: 'Roasted Pepper & Tahini Hummus',
    originalName: 'Humus me Speca të Pjekur',
    category: 'starters',
    price: 4.20,
    description: 'Silky whipped chickpea dip blended with sesame tahini, charred sweet red peppers, pomegranate molasses, extra virgin olive oil, and toasted zaatar flatbread.',
    ingredients: ['Chickpeas', 'Tahini', 'Roasted red pepper', 'Olive oil', 'Warm flatbread'],
    dietary: ['vegan', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },

  // Mains & Grills
  {
    id: 'm1',
    name: 'Traditional Ćevapi (10 pcs) with Kajmak',
    originalName: 'Qevapa Mitrovice me Kajmak',
    category: 'mains',
    price: 6.50,
    description: 'Ten handcrafted grilled minced beef kebabs seasoned to perfection, tucked inside stone-baked somun bread with creamy clotted kajmak and diced sweet onion.',
    ingredients: ['100% seasoned beef', 'Stone-baked somun bread', 'Clotted kajmak', 'Raw sweet onion', 'Ajvar dip'],
    dietary: ['halal', 'signature'],
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'm2',
    name: 'Balkan Mixed Grill Board',
    originalName: 'Mish i Përzier në Zgarë',
    category: 'mains',
    price: 12.50,
    description: 'A feast for meat lovers: 5 ćevapi, grilled chicken skewers, smoked suxhuk sausage, and lamb cutlet served with golden rustic fries, grilled chili, and somun.',
    ingredients: ['Beef ćevapi', 'Marinated chicken breast', 'Suxhuk', 'Fries', 'Grilled peppers'],
    dietary: ['halal', 'chef-pick'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'm3',
    name: 'Stone-Baked Chicken Schnitzel',
    originalName: 'Shnicell Pule me Kaçkavall',
    category: 'mains',
    price: 7.20,
    description: 'Tender chicken breast coated in herb crumbs, topped with melted kashkaval cheese and roasted garlic cream sauce. Accompanied by potato wedges and seasonal salad.',
    ingredients: ['Free-range chicken breast', 'Herb crumb crust', 'Melted cheese', 'Seasoned wedges'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },

  // Wraps & Burgers
  {
    id: 'w1',
    name: 'Smoked Pulled Beef Brioche Burger',
    originalName: 'Burger me Mish të Zier Ngadalë',
    category: 'wraps-burgers',
    price: 7.50,
    description: '12-hour slow-braised beef brisket shredded and tossed in pub stout BBQ sauce, topped with crunchy slaw and pickled jalapenos on a buttered brioche bun.',
    ingredients: ['Slow-cooked beef', 'Stout barbecue sauce', 'Cabbage slaw', 'Pickled jalapeños', 'Fries'],
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'w2',
    name: 'Crispy Falafel & Tahini Wrap (Vegan)',
    originalName: 'Wrap me Falafel dhe Salcë Tahini',
    category: 'wraps-burgers',
    price: 4.50,
    description: 'House-made spiced chickpea falafels with crisp greens, sumac red onions, ripe tomatoes, and rich lemon-sesame tahini wrapped in fresh lavash.',
    ingredients: ['Handmade falafel', 'Sesame tahini', 'Sumac onions', 'Tomatoes', 'Lavash wrap'],
    dietary: ['vegan', 'vegetarian'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },

  // Beers & Draught
  {
    id: 'b1',
    name: 'Birra Peja Draft (0.5L)',
    originalName: 'Birra Peja Fuçi',
    category: 'beers',
    price: 2.20,
    description: 'Kosovo’s historic lager brewed with pure spring water from the Rugova mountains. Crisp, balanced, with a clean golden malt finish.',
    ingredients: ['Malted barley', 'Rugova spring water', 'Balkan hops'],
    dietary: ['vegan'],
    highlight: true,
    image: 'https://images.unsplash.com/photo-1608270118029-798b48858a74?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'b2',
    name: 'Paulaner Hefe-Weißbier (0.5L)',
    category: 'beers',
    price: 3.50,
    description: 'Traditional Bavarian wheat beer naturally cloudy with glowing amber hints, banana and clove yeast aromas, and a silky smooth body.',
    ingredients: ['Wheat malt', 'Barley malt', 'Bavarian yeast'],
    dietary: ['vegetarian'],
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'b3',
    name: 'Guinness Extra Stout Pint',
    category: 'beers',
    price: 4.00,
    description: 'Iconic dark Irish stout poured with a rich, creamy velvet head. Notes of roasted barley, dark chocolate, and roasted espresso.',
    ingredients: ['Roasted unmalted barley', 'Stout yeast', 'Pure water'],
    dietary: ['vegan'],
    image: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 'b4',
    name: 'Museum IPA Craft (Local Batch)',
    category: 'beers',
    price: 3.80,
    description: 'Locally crafted Indian Pale Ale bursting with citrus, pine, and stone fruit aromas. Unfiltered with a crisp, refreshing hoppy bitterness.',
    ingredients: ['Citra & Mosaic hops', 'Pale malt', 'Craft brewing yeast'],
    dietary: ['vegan', 'chef-pick'],
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },

  // Drinks & Cocktails
  {
    id: 'd1',
    name: 'Hamam Spiced Bourbon Old Fashioned',
    category: 'drinks',
    price: 5.50,
    description: 'Oak-aged bourbon infused with smoked fig and orange peel, spiced bitters, served over hand-cut crystal ice with flamed rosemary.',
    ingredients: ['Bourbon', 'Smoked fig syrup', 'Angostura bitters', 'Orange zest'],
    dietary: ['signature'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'd2',
    name: 'Fresh Mint & Pomegranate Lemonade',
    originalName: 'Limonadë me Shegë dhe Mente',
    category: 'drinks',
    price: 2.50,
    description: 'Freshly squeezed lemons, crushed garden spearmint, natural pomegranate juice, lightly sweetened with wild honey or agave.',
    ingredients: ['Fresh lemon juice', 'Pomegranate', 'Wild spearmint', 'Spring water'],
    dietary: ['vegan', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },

  // Desserts
  {
    id: 'de1',
    name: 'Warm Pistachio & Walnut Baklava',
    originalName: 'Bakllavë Shtëpie',
    category: 'desserts',
    price: 3.50,
    description: 'Dozens of paper-thin buttered filo sheets packed with crushed roasted pistachios and walnuts, baked golden and soaked in aromatic lemon syrup.',
    ingredients: ['Filo pastry', 'Roasted pistachios', 'Walnuts', 'Pure butter', 'Lemon syrup'],
    dietary: ['vegetarian', 'signature'],
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 'de2',
    name: 'Museum Molten Chocolate Fondant',
    category: 'desserts',
    price: 4.00,
    description: 'Warm dark chocolate cake with a molten truffle center, accompanied by vanilla bean gelato and crushed roasted hazelnuts.',
    ingredients: ['70% Belgian chocolate', 'Butter', 'Free range eggs', 'Vanilla bean gelato'],
    dietary: ['vegetarian'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: 'Sparkles' },
  { id: 'highlights', label: 'Highlights', icon: 'Flame' },
  { id: 'coffee-breakfast', label: 'Coffee & Morning', icon: 'Coffee' },
  { id: 'starters', label: 'Starters & Mezze', icon: 'Salad' },
  { id: 'mains', label: 'Mains & Grills', icon: 'UtensilsCrossed' },
  { id: 'wraps-burgers', label: 'Wraps & Burgers', icon: 'Sandwich' },
  { id: 'beers', label: 'Craft Beers', icon: 'Beer' },
  { id: 'drinks', label: 'Drinks & Cocktails', icon: 'GlassWater' },
  { id: 'desserts', label: 'Desserts', icon: 'Cake' }
] as const;
