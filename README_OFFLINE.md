# Mode Hors Ligne - Guide d'utilisation

## 📱 Comment ça marche maintenant ?

L'application fonctionne **complètement hors ligne** grâce à un **Service Worker** qui met en cache toutes les ressources (React, ReactDOM, Babel, etc.).

### ⚙️ Configuration requise :

Les trois fichiers suivants **doivent être dans le même dossier** :
- `index.html` (l'application)
- `sw.js` (Service Worker - cache et offline)
- `manifest.json` (données PWA)

---

## 🔧 Première utilisation (avec connexion Internet)

1. **Ouvre l'application dans ton navigateur** avec une **connexion Internet active**
2. L'application télécharge React, ReactDOM, Babel depuis les CDN et les **cache localement**
3. Une notification d'installation PWA peut apparaître
4. **C'est bon !** L'app est maintenant complètement téléchargée

---

## ✈️ Mode avion / Hors ligne (après la première utilisation)

Une fois le cache rempli, tu peux :
- ✅ Activer le mode avion
- ✅ Couper la WiFi et les données mobiles
- ✅ Utiliser l'app **sans aucun problème**
- ✅ Tous les sons, timers, fonctionnalités marchent normalement

---

## 🔄 Mise à jour du cache

Le Service Worker :
- ✅ Vérifie les mises à jour toutes les **60 secondes** (si connecté)
- ✅ Charge les nouvelles versions automatiquement
- ✅ Met à jour les ressources en arrière-plan

---

## 🎯 Sur smartphone

### **Android Chrome :**
1. Ouvre l'app la première fois **avec connexion**
2. Une banneau apparaît : **"Installer sur l'écran d'accueil"**
3. Appuie sur **"Installer"**
4. L'app est désormais une PWA native
5. Ça marche en mode avion 🛫

### **iPhone iOS 16.1+ :**
1. Ouvre l'app la première fois **avec connexion**
2. Appuie sur **Partager ⬆️**
3. Sélectionne **"Sur l'écran d'accueil"**
4. Appuie sur **Ajouter**
5. L'app est maintenant sur ton écran d'accueil
6. Ça marche en mode avion 🛫

---

## 🐛 Résolution de problèmes

### L'app ne charge pas en offline ?
→ **Première utilisation obligatoire avec connexion** pour télécharger les dépendances

### Le cache n'a pas été sauvegardé ?
→ Vérifier que les trois fichiers sont au même emplacement :
```
dossier/
  ├─ index.html
  ├─ sw.js
  └─ manifest.json
```

### Forcer un nouveau cache ?
→ Appuyez sur **F12** → **Application** → **Service Workers** → **Unregister**
→ Rechargez et la première utilisation réinstallera tout

---

## 📋 Fichiers ajoutés/modifiés

| Fichier | Rôle |
|---------|------|
| `index.html` | App + gestion offline ajoutée |
| `sw.js` | ✨ **NOUVEAU** - Service Worker pour le caching |
| `manifest.json` | ✨ **NOUVEAU** - Données PWA (icône, nom, etc.) |

---

## 🎊 Résumé

- **Première utilisation** → Besoin de connexion (30 sec pour télécharger les dépendances)
- **Utilisations suivantes** → Fonctionne **100% hors ligne** 🚀
- **Mode avion** → Aucun problème ✅
- **Mise en veille** → Empêchée pendant le tabata ✅

Bon entraînement ! 💪
