/* ---------------------------------------------------------------------------
   Названия всех 111 рисунков на языках остальных четырех стран.

   Немецкий лежит отдельно, в wordsDe.ts: он был написан первым, и
   разделять их незачем.

   Правило одно на все языки: слово берется в той форме, в какой его
   говорят ребенку, а не в словарной. Французу lapin, а не lièvre,
   итальянцу macchina, а не automobile. Артикль не пишем: под рисунком
   в книге стоит одно слово, и подпись здесь должна совпадать с тем,
   что ребенок увидит на странице.

   Там, где в языке нет детского слова, оставлено взрослое: axolotl,
   badminton, skateboard так и называются везде.
--------------------------------------------------------------------------- */

export const wordsFr: Record<number, string> = {
  1: "Lion", 2: "Éléphant", 3: "Zèbre", 4: "Perroquet", 5: "Crocodile",
  6: "Singe", 7: "Kangourou", 8: "Rhinocéros", 9: "Flamant", 10: "Lémurien",
  11: "Colibri", 12: "Girafe", 13: "Koala", 14: "Grenouille", 15: "Alpaga",
  16: "Lapin", 17: "Hibou", 18: "Hérisson", 19: "Chèvre", 20: "Chauve-souris",
  21: "Raton laveur", 22: "Ours", 23: "Renard", 24: "Poule", 25: "Caméléon",
  26: "Vache", 27: "Castor", 28: "Aigle", 29: "Hamster", 30: "Chat",
  31: "Chien", 32: "Écureuil", 33: "Canard", 34: "Cerf", 35: "Souris",
  36: "Abeille", 37: "Libellule", 38: "Escargot", 39: "Papillon",

  40: "Requin", 41: "Dauphin", 42: "Baleine", 43: "Crabe", 44: "Pieuvre",
  45: "Méduse", 46: "Tortue de mer", 47: "Poisson-ange", 48: "Hippocampe",
  49: "Phoque", 50: "Poisson-clown", 51: "Coquillage", 52: "Axolotl",
  53: "Poisson-globe", 54: "Crevette", 55: "Raie manta",

  56: "Sirène", 57: "Licorne", 58: "Dragon", 59: "Couronne", 60: "Nain",
  61: "Griffon", 62: "Troll", 63: "Fée", 64: "Chaudron magique",
  65: "Chapeau de magicien", 66: "Potion magique",

  67: "Voiture", 68: "Hélicoptère", 69: "Avion", 70: "Montgolfière",
  71: "Bateau", 72: "Sous-marin", 73: "Fusée", 74: "Trottinette",

  75: "Skateboard", 76: "Cerf-volant", 77: "Badminton",
  78: "Football américain", 79: "Appareil photo", 80: "Tambour",
  81: "Ballon de plage",

  82: "Lunettes de soleil", 83: "Parasol", 84: "Chapeau de soleil",
  85: "Globe terrestre", 86: "Cadeau", 87: "Manette",

  88: "Feuille d'érable", 89: "Rose", 90: "Champignon", 91: "Trèfle",
  92: "Tournesol", 93: "Pomme de pin", 94: "Cactus", 95: "Muguet",
  96: "Lotus", 97: "Tulipe",

  98: "Gâteau", 99: "Glace", 100: "Pastèque", 101: "Carotte", 102: "Brocoli",
  103: "Orange", 104: "Cerise", 105: "Avocat", 106: "Fraise", 107: "Poire",
  108: "Ananas", 109: "Citron", 110: "Citrouille", 111: "Donut",
};

export const wordsNl: Record<number, string> = {
  1: "Leeuw", 2: "Olifant", 3: "Zebra", 4: "Papegaai", 5: "Krokodil",
  6: "Aap", 7: "Kangoeroe", 8: "Neushoorn", 9: "Flamingo", 10: "Maki",
  11: "Kolibrie", 12: "Giraf", 13: "Koala", 14: "Kikker", 15: "Alpaca",
  16: "Konijn", 17: "Uil", 18: "Egel", 19: "Geit", 20: "Vleermuis",
  21: "Wasbeer", 22: "Beer", 23: "Vos", 24: "Kip", 25: "Kameleon",
  26: "Koe", 27: "Bever", 28: "Adelaar", 29: "Hamster", 30: "Kat",
  31: "Hond", 32: "Eekhoorn", 33: "Eend", 34: "Hert", 35: "Muis",
  36: "Bij", 37: "Libel", 38: "Slak", 39: "Vlinder",

  40: "Haai", 41: "Dolfijn", 42: "Walvis", 43: "Krab", 44: "Octopus",
  45: "Kwal", 46: "Zeeschildpad", 47: "Keizersvis", 48: "Zeepaardje",
  49: "Zeehond", 50: "Clownvis", 51: "Schelp", 52: "Axolotl",
  53: "Kogelvis", 54: "Garnaal", 55: "Manta",

  56: "Zeemeermin", 57: "Eenhoorn", 58: "Draak", 59: "Kroon", 60: "Dwerg",
  61: "Griffioen", 62: "Trol", 63: "Fee", 64: "Toverketel",
  65: "Tovenaarshoed", 66: "Toverdrank",

  67: "Auto", 68: "Helikopter", 69: "Vliegtuig", 70: "Luchtballon",
  71: "Schip", 72: "Onderzeeër", 73: "Raket", 74: "Step",

  75: "Skateboard", 76: "Vlieger", 77: "Badminton",
  78: "American football", 79: "Camera", 80: "Trommel", 81: "Strandbal",

  82: "Zonnebril", 83: "Parasol", 84: "Zonnehoed", 85: "Wereldbol",
  86: "Cadeau", 87: "Controller",

  88: "Esdoornblad", 89: "Roos", 90: "Paddenstoel", 91: "Klaver",
  92: "Zonnebloem", 93: "Dennenappel", 94: "Cactus",
  95: "Lelietje-van-dalen", 96: "Lotus", 97: "Tulp",

  98: "Taart", 99: "IJs", 100: "Watermeloen", 101: "Wortel", 102: "Broccoli",
  103: "Sinaasappel", 104: "Kers", 105: "Avocado", 106: "Aardbei",
  107: "Peer", 108: "Ananas", 109: "Citroen", 110: "Pompoen", 111: "Donut",
};

export const wordsPl: Record<number, string> = {
  1: "Lew", 2: "Słoń", 3: "Zebra", 4: "Papuga", 5: "Krokodyl",
  6: "Małpa", 7: "Kangur", 8: "Nosorożec", 9: "Flaming", 10: "Lemur",
  11: "Koliber", 12: "Żyrafa", 13: "Koala", 14: "Żaba", 15: "Alpaka",
  16: "Królik", 17: "Sowa", 18: "Jeż", 19: "Koza", 20: "Nietoperz",
  21: "Szop", 22: "Niedźwiedź", 23: "Lis", 24: "Kura", 25: "Kameleon",
  26: "Krowa", 27: "Bóbr", 28: "Orzeł", 29: "Chomik", 30: "Kot",
  31: "Pies", 32: "Wiewiórka", 33: "Kaczka", 34: "Jeleń", 35: "Mysz",
  36: "Pszczoła", 37: "Ważka", 38: "Ślimak", 39: "Motyl",

  40: "Rekin", 41: "Delfin", 42: "Wieloryb", 43: "Krab", 44: "Ośmiornica",
  45: "Meduza", 46: "Żółw morski", 47: "Ryba anioł", 48: "Konik morski",
  49: "Foka", 50: "Błazenek", 51: "Muszla", 52: "Aksolotl",
  53: "Rozdymka", 54: "Krewetka", 55: "Manta",

  56: "Syrena", 57: "Jednorożec", 58: "Smok", 59: "Korona", 60: "Krasnal",
  61: "Gryf", 62: "Troll", 63: "Wróżka", 64: "Magiczny kocioł",
  65: "Kapelusz czarodzieja", 66: "Magiczna mikstura",

  67: "Samochód", 68: "Helikopter", 69: "Samolot", 70: "Balon",
  71: "Statek", 72: "Łódź podwodna", 73: "Rakieta", 74: "Hulajnoga",

  75: "Deskorolka", 76: "Latawiec", 77: "Badminton",
  78: "Futbol amerykański", 79: "Aparat", 80: "Bęben", 81: "Piłka plażowa",

  82: "Okulary przeciwsłoneczne", 83: "Parasol plażowy", 84: "Kapelusz",
  85: "Globus", 86: "Prezent", 87: "Kontroler",

  88: "Liść klonu", 89: "Róża", 90: "Grzyb", 91: "Koniczyna",
  92: "Słonecznik", 93: "Szyszka", 94: "Kaktus", 95: "Konwalia",
  96: "Lotos", 97: "Tulipan",

  98: "Ciasto", 99: "Lody", 100: "Arbuz", 101: "Marchewka", 102: "Brokuł",
  103: "Pomarańcza", 104: "Wiśnia", 105: "Awokado", 106: "Truskawka",
  107: "Gruszka", 108: "Ananas", 109: "Cytryna", 110: "Dynia", 111: "Pączek",
};

export const wordsIt: Record<number, string> = {
  1: "Leone", 2: "Elefante", 3: "Zebra", 4: "Pappagallo", 5: "Coccodrillo",
  6: "Scimmia", 7: "Canguro", 8: "Rinoceronte", 9: "Fenicottero",
  10: "Lemure", 11: "Colibrì", 12: "Giraffa", 13: "Koala", 14: "Rana",
  15: "Alpaca", 16: "Coniglio", 17: "Gufo", 18: "Riccio", 19: "Capra",
  20: "Pipistrello", 21: "Procione", 22: "Orso", 23: "Volpe", 24: "Gallina",
  25: "Camaleonte", 26: "Mucca", 27: "Castoro", 28: "Aquila", 29: "Criceto",
  30: "Gatto", 31: "Cane", 32: "Scoiattolo", 33: "Anatra", 34: "Cervo",
  35: "Topo", 36: "Ape", 37: "Libellula", 38: "Lumaca", 39: "Farfalla",

  40: "Squalo", 41: "Delfino", 42: "Balena", 43: "Granchio", 44: "Polpo",
  45: "Medusa", 46: "Tartaruga marina", 47: "Pesce angelo",
  48: "Cavalluccio marino", 49: "Foca", 50: "Pesce pagliaccio",
  51: "Conchiglia", 52: "Axolotl", 53: "Pesce palla", 54: "Gambero",
  55: "Manta",

  56: "Sirena", 57: "Unicorno", 58: "Drago", 59: "Corona", 60: "Nano",
  61: "Grifone", 62: "Troll", 63: "Fata", 64: "Calderone magico",
  65: "Cappello da mago", 66: "Pozione magica",

  67: "Macchina", 68: "Elicottero", 69: "Aereo", 70: "Mongolfiera",
  71: "Nave", 72: "Sottomarino", 73: "Razzo", 74: "Monopattino",

  75: "Skateboard", 76: "Aquilone", 77: "Badminton",
  78: "Football americano", 79: "Fotocamera", 80: "Tamburo",
  81: "Pallone da spiaggia",

  82: "Occhiali da sole", 83: "Ombrellone", 84: "Cappello da sole",
  85: "Mappamondo", 86: "Regalo", 87: "Controller",

  88: "Foglia d'acero", 89: "Rosa", 90: "Fungo", 91: "Trifoglio",
  92: "Girasole", 93: "Pigna", 94: "Cactus", 95: "Mughetto",
  96: "Loto", 97: "Tulipano",

  98: "Torta", 99: "Gelato", 100: "Anguria", 101: "Carota", 102: "Broccolo",
  103: "Arancia", 104: "Ciliegia", 105: "Avocado", 106: "Fragola",
  107: "Pera", 108: "Ananas", 109: "Limone", 110: "Zucca", 111: "Ciambella",
};
