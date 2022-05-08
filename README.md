# ____________ GROUPOMANIA ____________
Ceci est le dernier projet de la formation Web Développement OpenClassrooms: création d'un réseau social d'entreprise. L'exercice consistait à développer le backend et le frontend d'un réseau social interne.

J'ai développer le front et le back dans deux repos différents, que j'ai 'unifié' plus tard. Si vous souhaitez voir les étapes de développement du projet, voici les liens des repos:
    - frontend: https://github.com/CamRic/groupomania-frontend.git
    - backend: https://github.com/CamRic/groupomania-backend.git




# ____________ TECHNOLOGIES ___________
Pour le frontend, j'ai utilisé VUEJS avec la bibliothèque Quasar. Pour le backend, j'ai réalisé une API REST avec node.js + express. Enfin pour la gestion des données, j'ai utilisé MySql.




# ____________ INSTALLATION ___________

Pour pouvoir utiliser la base de donnée, vous devez avoir MySql 8.0 installé. 
Ouvrez un terminal de commande, connectez vous à mysql, puis:
    - pour creer la base de donnée:
        $ CREATE DATABASE groupomania;
        $ USE groupomania;
    - pour creer l'utilisateur:
        $ CREATE USER 'groupomania'@'localhost' IDENTIFIED BY 'r1gGsos1m9VWf0KJ';
        $ GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania'@'localhost';
    - pour creer les tables:
        $ CREATE TABLE users(
            user_id CHAR(36) UNIQUE KEY,
            email VARCHAR(254) NOT NULL PRIMARY KEY,
            password CHAR(60),
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            access_level ENUM('admin', 'user'),
            topics JSON,
            posts JSON,
            favorites JSON,
            createdAt DATETIME,
            updatedAt DATETIME
        );
        $ CREATE TABLE topics(
            topic_id CHAR(36) UNIQUE KEY,
            user_id CHAR(36),
            title VARCHAR(255),
            body TEXT,
            imageUrl VARCHAR(255),
            replies JSON,
            createdAt DATETIME,
            updatedAt DATETIME
        );
        $ CREATE TABLE posts(
            post_id CHAR(36) UNIQUE KEY,
            topic_id CHAR(36),
            user_id CHAR(36),
            body TEXT,
            createdAt DATETIME,
            updatedAt DATETIME
        );


Pour lancer le projet, lancez le terminal de commande puis tapez:
- si le repo n'est pas encore cloné
    -> $ git clone [link]
    -> $ cd [folder_name]
- le repo est cloné, à partir du dossier source
    -> $ cd backend && npm install
    -> $ nodemon server / node server
- ouvrir un nouveau terminal de commande depuis le dossier source
    -> $ cd frontend && npm install
    -> $ quasar dev



ATTENTION: le server node utilise le port 3000, le frontend utilise le port 8080, vérifiez que ces ports sont disponnibles.
