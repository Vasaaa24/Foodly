// Mock data pro menu
export const MENU_CATEGORIES = [
  { id: "predkrmy", name: "Předkrmy" },
  { id: "hlavni", name: "Hlavní jídla" },
  { id: "dezerty", name: "Dezerty" },
  { id: "napoje", name: "Nápoje" },
];

export const MENU_ITEMS = [
  // Předkrmy
  {
    id: 1,
    category: "predkrmy",
    name: "Česnekový chléb",
    description: "Domácí chléb s česnekovým máslem a bylinkami",
    price: 89,
    image:
      "https://www.nejrecept.cz/upload/82229975_63ba87fab48e45_full.jpg",
  },
  {
    id: 2,
    category: "predkrmy",
    name: "Kuřecí křídélka",
    description: "Křupavá kuřecí křídélka s výběrem omáček a pálivosti",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    category: "predkrmy",
    name: "Mozzarella sticks",
    description: "Smažená mozzarella s marinara omáčkou",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300&h=200&fit=crop",
  },
  {
    id: 14,
    category: "predkrmy",
    name: "Avokádové toasty",
    description: "Čerstvé avokádo na grilovaném chlebu s lime",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop",
  },
  {
    id: 15,
    category: "predkrmy",
    name: "Carpaccio z hovězího",
    description: "Tenké plátky hovězího s rukolou a parmazánem",
    price: 189,
    image:
      "https://kuchynelidlu.cz/productFiles/7293/1-KW-20-21-beautyshot-1132x637-Hovezi-carpaccio.jpeg",
  },
  {
    id: 16,
    category: "predkrmy",
    name: "Bruschetta mix",
    description: "Tři druhy bruschett s rajčaty, olivami a kozím sýrem",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=300&h=200&fit=crop",
  },
  {
    id: 17,
    category: "predkrmy",
    name: "Hummus s pitou",
    description: "Domácí hummus s grilovanou pitou a zeleninou",
    price: 119,
    image:
      "https://www.damejidlo.cz/c/blog/wp-content/uploads/sites/2/2021/02/hummus-4.jpg",
  },
  {
    id: 18,
    category: "predkrmy",
    name: "Tatarák z lososa",
    description: "Čerstvý lososový tatarák s avokádem a kaviárem",
    price: 199,
    image:
      "https://www.letemgastrosvetem.cz/wp-content/uploads/2018/03/DSCF8267-2.jpg",
  },

  // Hlavní jídla
  {
    id: 4,
    category: "hlavni",
    name: "Steak s přílohou",
    description: "Šťavnatý steak z hovězího masa s výběrem přípravy a přílohy",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    category: "hlavni",
    name: "Pizza Margherita",
    description: "Rajčatová omáčka, mozzarella, bazalka - výběr velikosti a těsta",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    category: "hlavni",
    name: "Grilovaný losos",
    description: "Čerstvý losos s brambory a zeleninovou směsí",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=300&h=200&fit=crop",
  },
  {
    id: 7,
    category: "hlavni",
    name: "Kuřecí steak",
    description: "Grilované kuřecí prso s rýží a omáčkou",
    price: 219,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
  },
  {
    id: 19,
    category: "hlavni",
    name: "Pasta Carbonara",
    description: "Spaghetti s anglickou slaninou, vejci a parmazánem",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=200&fit=crop",
  },
  {
    id: 20,
    category: "hlavni",
    name: "Hovězí steak",
    description: "Premium hovězí steak s grilovanými bramborami",
    price: 389,
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop",
  },
  {
    id: 21,
    category: "hlavni",
    name: "Vegetariánská bowl",
    description: "Quinoa, avokádo, pečená zelenina a tahini",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
  },
  {
    id: 22,
    category: "hlavni",
    name: "Fish & Chips",
    description: "Smažená ryba v těstíčku s hranolky a tatarkou",
    price: 239,
    image:
      "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=300&h=200&fit=crop",
  },
  {
    id: 23,
    category: "hlavni",
    name: "Rizoto s houbami",
    description: "Krémové rizoto s lesními houbami a parmazánem",
    price: 209,
    image:
      "https://www.vegmania.cz/wp-content/uploads/2020/12/houbove-rizoto-1200.jpg",
  },
  {
    id: 24,
    category: "hlavni",
    name: "BBQ Ribs",
    description: "Vepřová žebírka marinovaná v BBQ omáčce",
    price: 279,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
  },

  // Dezerty
  {
    id: 8,
    category: "dezerty",
    name: "Tiramisu",
    description: "Klasický italský dezert s mascarpone",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
  },
  {
    id: 9,
    category: "dezerty",
    name: "Chocolate brownie",
    description: "Teplý brownie s vanilkovou zmrzlinou",
    price: 109,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop",
  },
  {
    id: 25,
    category: "dezerty",
    name: "Crème brûlée",
    description: "Vanilkový krém s karamelizovaným cukrem",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=300&h=200&fit=crop",
  },
  {
    id: 26,
    category: "dezerty",
    name: "Cheesecake s ovocem",
    description: "Newyorský cheesecake s čerstvým ovocem",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=200&fit=crop",
  },
  {
    id: 27,
    category: "dezerty",
    name: "Lava cake",
    description: "Čokoládový dort s tekutým jádrem",
    price: 139,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=300&h=200&fit=crop",
  },
  {
    id: 28,
    category: "dezerty",
    name: "Panna cotta",
    description: "Italský krémový dezert s ovocem",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
  },
  {
    id: 29,
    category: "dezerty",
    name: "Apple pie",
    description: "Domácí jablečný koláč s vanilkovou zmrzlinou",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=200&fit=crop",
  },

  // Nápoje
  {
    id: 10,
    category: "napoje",
    name: "Coca Cola",
    description: "Osvěžující limonáda 0.33l",
    price: 45,
    image:
      "https://t3.ftcdn.net/jpg/07/29/63/02/360_F_729630262_7hAna5MDjwAd0vAmU3v25u2v3jBaZw8A.jpg",
  },
  {
    id: 11,
    category: "napoje",
    name: "Pivo Pilsner",
    description: "Čerstvé točené pivo 0.5l",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=200&fit=crop",
  },
  {
    id: 12,
    category: "napoje",
    name: "Víno bílé",
    description: "Sauvignon Blanc 0.2l",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=300&h=200&fit=crop",
  },
  {
    id: 30,
    category: "napoje",
    name: "Fresh orange juice",
    description: "Čerstvě vymačkaný pomerančový džus 0.3l",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop",
  },
  {
    id: 31,
    category: "napoje",
    name: "Káva Espresso",
    description: "Silná italská káva",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop",
  },
  {
    id: 32,
    category: "napoje",
    name: "Cappuccino",
    description: "Espresso s napěněným mlékem",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop",
  },
  {
    id: 33,
    category: "napoje",
    name: "Green tea",
    description: "Japonský zelený čaj",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop",
  },
  {
    id: 34,
    category: "napoje",
    name: "Smoothie berry",
    description: "Mix lesních bobulí s jogurtem 0.4l",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop",
  },
  {
    id: 35,
    category: "napoje",
    name: "Víno červené",
    description: "Cabernet Sauvignon 0.2l",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=200&fit=crop",
  },
  {
    id: 36,
    category: "napoje",
    name: "Minerálka",
    description: "Perlivá minerální voda 0.5l",
    price: 35,
    image:
      "https://cdn.myshoptet.com/usr/eshop.optimia.cz/user/shop/big/77193-1_77193-pramenita-voda-rajec-jemne-perliva-12x-0-5-l.jpg?65142570",
  },
];
