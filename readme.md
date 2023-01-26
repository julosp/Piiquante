API Piiquante
Projet 6 OCR par Julien Ospital

Cette API crée pour le site Piiquante a pour but de pouvoir crée des comptes utilisateurs,
poster, modifier, supprimer, like et dislike des sauces.

L'app a était crée sur Nodejs avec Express.
Toutes la base de donnée est sur MongoDB.

Le serveur local frontend peut etre lancé avec la commande "npm start".
Le serveur local backend peut etre lancé avec la commande "nodemon server".

-------SPECIFICATION DE CONNEXION / CREATION DE COMPTE-----------

Création de compte :
POST -> /api/auth/signup
Request body : { email: string, password: string }
Specification : le pasword est crypté via Bcrypt.

Connexion au compte :
POST -> /api/auth/login
Request body : { email: string, password: string }
Specification : création d'un token lors de la connexion de l'utilisateur.

-------SPECIFICATION DES SAUCES-----------

Avoir la liste de toutes sauces :
GET -> /api/sauces
Retourne un array de toutes les sauces

Avoir une sauce en particulier:
GET -> /api/sauces/:id
Retourne la sauce selon sont ID

Crée une sauce :
POST -> /api/sauces
Request body : {sauce: String, image: File}
Crée la sauce via les informations et l'images donné par l'utilisateur. Taille max de l'image 1Mo.

Modifié une sauce :
PUT -> /api/sauces/:id
Seulement si userId de la sauce est egale au userId, l'utilisateur peux modifié les informations de la sauce (nom,description,image,ect...)

Supprimer une sauce :
DELETE -> /api/sauces/:id
Seulement si userId de la sauce est egale au userId, l'utilisateur peux supprimé la sauce.

-------SPECIFICATION DES LIKES-----------

Ajouter et supprimer les like/dislike
POST -> /api/sauces/:id/like
Ajoute ou supprime l'id de l'utilisateur au array usersLiked ou usersDisliked

-------SECURITER-----------

Fichier .env --> Protege les differentes key et token

Helmet --> Sécurise les headers HTTP
Mongo Sanitize --> Sécurise des injéctions
hpp --> Protege les requetes HTTP 
xss --> Filtre les inputs des utilisateurs
bcrypt --> Crypte les mots de passe des utilisateurs
limitter --> Limite le nombre de connexion utilisateur unique par seconde