# Previsualizor

**Prévisualisation de publications pour les réseaux sociaux** — une application
React + Vite + Tailwind CSS qui simule en temps réel le rendu natif d'un post
sur **Facebook, Instagram, LinkedIn, Google My Business et X (ex-Twitter)**.

Saisissez votre texte, déposez une image, et visualisez immédiatement le résultat
au bon format pour chaque plateforme, avec compteur de caractères, contrôle des
dimensions d'image et mode sombre.

> 🔒 100 % côté client. Aucun backend, aucune authentification, aucune
> publication réelle. Vos brouillons restent dans le `localStorage` du
> navigateur.

---

## ✨ Fonctionnalités

- **Vue deux colonnes** : 40 % saisie à gauche, 60 % prévisualisation à droite.
- **Onglets par plateforme** aux couleurs de marque + **sous-onglets de format**
  (Square, Portrait, Story, Article, Thread…).
- **Compteur de caractères** en temps réel avec retour visuel coloré :
  - 0 → 70 % : vert
  - 70 → 90 % : orange
  - 90 → 100 % : rouge
  - au-delà : rouge gras + nombre de caractères en trop (négatif)
- **Upload d'image** par glisser-déposer ou par clic (lecture via `FileReader`).
- **Badge d'avertissement** si les dimensions de l'image ne correspondent pas
  aux specs de la plateforme + **repère de ratio** en superposition.
- **Texte tronqué** avec bouton « Voir plus » pour reproduire le comportement natif.
- **Sauvegarde automatique** dans le `localStorage` (activable/désactivable),
  plus boutons **Sauvegarder**, **Copier** (presse-papiers) et **Reset**.
- **Panneau de specs escamotable** : tableau (Plateforme, Format, Largeur,
  Hauteur, Caractères max) + notes sur le format d'image recommandé.
- **Mode sombre** via les classes `dark` de Tailwind, préférence stockée dans le
  `localStorage` et détection initiale via `prefers-color-scheme`.

### Specs intégrées

| Plateforme         | Format         | Largeur | Hauteur | Caractères max |
| ------------------ | -------------- | ------- | ------- | -------------- |
| Facebook           | Post           | 1200    | 630     | 63 206         |
| Facebook           | Story          | 1080    | 1920    | 63 206         |
| Instagram          | Feed Square    | 1080    | 1080    | 2 200          |
| Instagram          | Feed Portrait  | 1080    | 1350    | 2 200          |
| Instagram          | Story          | 1080    | 1920    | 2 200          |
| LinkedIn           | Post           | 1200    | 627     | 3 000          |
| LinkedIn           | Article        | 744     | libre   | 125 000        |
| Google My Business | Post           | 720     | 540     | 1 500          |
| X (ex-Twitter)     | Post           | 1600    | 900     | 280            |
| X (ex-Twitter)     | Thread / tweet | 1600    | 900     | 280            |

Les valeurs sont centralisées dans [`src/config/platforms.js`](src/config/platforms.js).

---

## 🧱 Stack technique

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- ESLint + Prettier

Pas de routing, pas de gestionnaire d'état externe.

---

## 📁 Architecture

```
previsualizor/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── config/
    │   └── platforms.js        # Specs de toutes les plateformes/formats
    ├── hooks/
    │   └── useDraft.js         # Sauvegarde/chargement localStorage
    └── components/
        ├── Sidebar.jsx         # Saisie texte + upload image + actions
        ├── PreviewPanel.jsx    # Prévisualisation temps réel
        ├── PlatformTabs.jsx    # Onglets plateforme + sous-onglets format
        ├── CharCounter.jsx     # Compteur de caractères coloré
        ├── SpecsDrawer.jsx     # Tableau de specs escamotable
        └── previews/
            ├── FacebookPreview.jsx
            ├── InstagramPreview.jsx
            ├── LinkedInPreview.jsx
            ├── GmbPreview.jsx
            ├── XPreview.jsx
            ├── PreviewImage.jsx   # Image + ratio + badge dimensions (partagé)
            └── TruncatedText.jsx  # Troncature + « Voir plus » (partagé)
```

---

## 🚀 Démarrage en local

Prérequis : **Node.js ≥ 18** et npm.

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
# → http://localhost:5173

# 3. Construire la version de production
npm run build
# → génère le dossier dist/

# 4. Prévisualiser le build de production en local
npm run preview
# → http://localhost:4173
```

### Scripts disponibles

| Script                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Serveur de développement (HMR)                  |
| `npm run build`        | Build de production dans `dist/`                |
| `npm run preview`      | Sert le build de production en local            |
| `npm run lint`         | Analyse ESLint                                  |
| `npm run format`       | Formate le code avec Prettier                   |
| `npm run format:check` | Vérifie le formatage sans modifier les fichiers |

---

## 🌐 Mise en production sur un VPS Ubuntu + Nginx

L'application est **100 % statique** : `npm run build` produit un dossier `dist/`
contenant du HTML/CSS/JS qu'il suffit de servir avec Nginx.

### 1. Préparer le serveur

Connectez-vous en SSH à votre VPS, puis :

```bash
sudo apt update && sudo apt upgrade -y

# Installer Nginx
sudo apt install -y nginx

# Installer Node.js 20 LTS (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier
node -v && npm -v
```

### 2. Récupérer et construire le projet

```bash
# Cloner le dépôt (ou transférer les sources via scp/rsync)
cd /var/www
sudo git clone https://github.com/lucasl72/previsualizor.git
cd previsualizor

# Installer les dépendances et construire
sudo npm install
sudo npm run build
```

Le site statique est maintenant dans `/var/www/previsualizor/dist`.

> 💡 **Alternative** : vous pouvez aussi builder en local (`npm run build`) et
> n'envoyer que le dossier `dist/` sur le serveur via
> `rsync -avz dist/ user@VOTRE_IP:/var/www/previsualizor/dist/`.

### 3. Configurer Nginx

Créez un fichier de configuration de site :

```bash
sudo nano /etc/nginx/sites-available/previsualizor
```

Collez la configuration suivante (remplacez `votre-domaine.com` par votre nom
de domaine ou l'IP du serveur) :

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name votre-domaine.com www.votre-domaine.com;

    root /var/www/previsualizor/dist;
    index index.html;

    # SPA : toujours renvoyer index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache long pour les assets versionnés (hash dans le nom de fichier)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compression gzip
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 1024;
}
```

Activez le site puis rechargez Nginx :

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/previsualizor /etc/nginx/sites-enabled/

# (Optionnel) désactiver le site par défaut
sudo rm -f /etc/nginx/sites-enabled/default

# Tester la configuration puis recharger
sudo nginx -t
sudo systemctl reload nginx
```

Votre application est accessible sur `http://votre-domaine.com`. 🎉

### 4. (Recommandé) Activer le HTTPS avec Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

Certbot configure automatiquement le HTTPS et le renouvellement du certificat.

### 5. Mettre à jour le site après une modification

```bash
cd /var/www/previsualizor
sudo git pull
sudo npm install
sudo npm run build
# Nginx sert directement le nouveau dist/, aucun redémarrage nécessaire.
```

#### Permissions

Assurez-vous que Nginx (utilisateur `www-data`) peut lire les fichiers :

```bash
sudo chown -R www-data:www-data /var/www/previsualizor/dist
```

---

## 🚫 Hors scope

Conformément aux specs, l'application **ne gère pas** :

- l'authentification ou la gestion de comptes ;
- la publication réelle sur les réseaux sociaux ;
- le redimensionnement ou l'export d'image ;
- l'internationalisation (interface en français uniquement).

---

## 📄 Licence

Projet à usage interne / démonstration.
