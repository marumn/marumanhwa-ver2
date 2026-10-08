# Maru Manhwa

A mobile-friendly manga/manhwa reader starter built with HTML/CSS/JS + Firebase.

## Features
- Home, browse, series and long-scroll reader
- Firebase Authentication
- Firestore bookmarks and reading history
- Per-chapter reactions (👍 ❤️ 🔥 😂)
- Per-chapter comments with delete-own-comment
- Admin catalog and chapter uploader
- Firebase Storage image uploads
- Privacy Policy, Terms, DMCA, Status, Report Issue and Discord footer links

## 1. Connect Firebase
Create a Firebase web app and copy `js/firebase-config.example.js` to `js/firebase-config.js`, then paste your Firebase web configuration.

Enable:
- Authentication → Email/Password
- Firestore Database
- Storage

## 2. Make yourself admin
After creating your account, open Firestore and edit `users/YOUR_UID` to add:

`role: "admin"`

The Admin page and Storage rules require this role. Do not leave admin writes open to every signed-in user.

## 3. Add a manhwa
Open `/admin/` while signed in as an admin.

Example:
- Series ID: `solo-leveling`
- Title: `Solo Leveling`
- Add cover
- Genres: `Action, Fantasy`
- Description
- Save Manhwa

## 4. Add a chapter
In the same Admin page:
- Series ID: `solo-leveling`
- Chapter number: `1`
- Select all page images in reading order
- Click Upload & Save Chapter

The pages are uploaded to Firebase Storage and their URLs are saved in Firestore. The reader automatically loads them.

For a new chapter, repeat with the same Series ID and a new chapter number.

## 5. Comments and reactions
Each chapter has its own Firestore subcollections:

`series/{seriesId}/chapters/{chapterId}/comments`

`series/{seriesId}/chapters/{chapterId}/reactions`

Users must be signed in to post comments or reactions. Users can delete their own comments.

## 6. Legal/footer links
The included legal pages are starter templates. Replace the placeholder contact details and have the final Privacy Policy, Terms, and copyright/DMCA process reviewed for your actual operation and jurisdiction before launch.

## 7. Deploy
You can use Firebase Hosting or another static host. If using Firebase CLI:

`firebase login`

`firebase init hosting firestore storage`

`firebase deploy`

Only upload content you have the legal right or permission to distribute.
