```javascript
import {
    auth,
    db,
    firebaseReady,
    FB
} from './firebase.js';

import {
    demoSeries
} from './data.js';


/*
 * Escape HTML
 */

export function esc(value = '') {

    return String(value).replace(
        /[&<>"']/g,
        character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[character])
    );

}


/*
 * Footer
 */

export function footer() {

    return `
        <footer class="footer">

            <div class="container footergrid">

                <div>

                    <strong>
                        MARU <b>MANHWA</b>
                    </strong>

                    <p class="muted">
                        Read your next obsession.
                    </p>

                </div>


                <div class="footerlinks">

                    <a href="privacy.html">
                        Privacy Policy
                    </a>

                    <a href="terms.html">
                        Terms of Service
                    </a>

                    <a href="dmca.html">
                        DMCA
                    </a>

                    <a href="status.html">
                        Status
                    </a>

                    <a href="report.html">
                        Report Issue
                    </a>

                    <a
                        href="https://discord.com/"
                        target="_blank"
                        rel="noopener"
                    >
                        Discord
                        <span class="newpill">
                            NEW
                        </span>
                    </a>

                </div>

            </div>


            <div class="container copyright">

                © 2026 Maru Manhwa.
                All rights reserved.

            </div>

        </footer>
    `;

}


/*
 * Navigation
 */

export function nav() {

    const navElement =
        document.querySelector('#nav');


    if (!navElement) {

        return;
    }


    navElement.innerHTML = `

        <div class="nav">

            <div class="container navin">


                <!-- Logo -->

                <a
                    class="logo"
                    href="index.html"
                >
                    MARU <b>MANHWA</b>
                </a>


                <!-- Navigation links -->

                <div class="links">

                    <a href="browse.html">
                        Browse
                    </a>

                    <a href="index.html#latest">
                        Latest
                    </a>

                    <a href="index.html#popular">
                        Popular
                    </a>

                </div>


                <div class="grow"></div>


                <!-- Search -->

                <input
                    id="globalSearch"
                    class="search"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                >


                <!-- Account -->

                <span id="userNav">

                    <a
                        class="btn"
                        href="auth/login.html"
                    >
                        Login
                    </a>

                </span>

            </div>

        </div>

    `;


    /*
     * Search
     */

    const search =
        document.querySelector(
            '#globalSearch'
        );


    if (search) {

        search.addEventListener(
            'keydown',
            event => {

                if (event.key === 'Enter') {

                    const query =
                        search.value.trim();


                    if (query) {

                        window.location.href =
                            'browse.html?q=' +
                            encodeURIComponent(query);

                    }

                }

            }
        );

    }


    /*
     * Account state
     */

    if (!auth) {

        return;
    }


    FB.onAuthStateChanged(
        auth,
        async user => {

            const userNav =
                document.querySelector(
                    '#userNav'
                );


            if (!userNav) {

                return;
            }


            /*
             * Logged out
             */

            if (!user) {

                userNav.innerHTML = `

                    <a
                        class="btn"
                        href="auth/login.html"
                    >
                        Login
                    </a>

                `;

                return;
            }


            /*
             * Logged in
             */

            let username =
                user.displayName ||
                'Account';


            let isAdmin = false;


            /*
             * Get user information
             * from Firestore.
             */

            try {

                const userRef =
                    FB.doc(
                        db,
                        'users',
                        user.uid
                    );


                const userSnapshot =
                    await FB.getDoc(
                        userRef
                    );


                if (
                    userSnapshot.exists()
                ) {

                    const data =
                        userSnapshot.data();


                    if (data.username) {

                        username =
                            data.username;
                    }


                    if (
                        data.role === 'admin'
                    ) {

                        isAdmin = true;
                    }

                }

            } catch (error) {

                console.error(
                    'Could not load user:',
                    error
                );

            }


            /*
             * Account button
             */

            userNav.innerHTML = `

                <a
                    class="btn secondary"
                    href="profile.html"
                >
                    ${esc(username)}
                </a>

            `;


            /*
             * Admin shortcut
             */

            if (isAdmin) {

                userNav.innerHTML += `

                    <a
                        class="btn"
                        href="admin/index.html"
                    >
                        Admin
                    </a>

                `;

            }

        }
    );

}


/*
 * Get one series
 */

export async function getSeries(id) {

    if (!firebaseReady) {

        return (
            demoSeries.find(
                series => series.id === id
            ) ||
            demoSeries[0]
        );

    }


    const snapshot =
        await FB.getDoc(
            FB.doc(
                db,
                'series',
                id
            )
        );


    if (snapshot.exists()) {

        return {
            id: snapshot.id,
            ...snapshot.data()
        };

    }


    return demoSeries.find(
        series => series.id === id
    );

}


/*
 * Get all series
 */

export async function listSeries() {

    if (!firebaseReady) {

        return demoSeries;
    }


    const query =
        FB.query(
            FB.collection(
                db,
                'series'
            ),
            FB.orderBy(
                'updatedAt',
                'desc'
            ),
            FB.limit(50)
        );


    const snapshot =
        await FB.getDocs(query);


    if (snapshot.empty) {

        return demoSeries;
    }


    return snapshot.docs.map(
        document => ({
            id: document.id,
            ...document.data()
        })
    );

}


/*
 * Manhwa card
 */

export function card(series) {

    return `

        <a
            class="card"
            href="series.html?id=${encodeURIComponent(series.id)}"
        >

            <div class="cover">

                <img
                    src="${esc(
                        series.cover ||
                        'assets/placeholder.svg'
                    )}"
                    alt="${esc(
                        series.title ||
                        'Manhwa'
                    )}"
                    loading="lazy"
                >

            </div>


            <div class="cardbody">

                <div class="title">
                    ${esc(
                        series.title ||
                        'Untitled'
                    )}
                </div>


                <div class="meta">

                    ★ ${series.rating || '—'}

                    ·

                    ${esc(
                        series.status ||
                        'Ongoing'
                    )}

                </div>


                <span class="badge">

                    ${series.chapters || 0}
                    Chapters

                </span>

            </div>

        </a>

    `;

}


/*
 * Save reading history
 */

export async function saveHistory(
    series,
    chapter
) {

    if (
        !auth ||
        !auth.currentUser
    ) {

        return;
    }


    await FB.setDoc(

        FB.doc(
            db,
            'users',
            auth.currentUser.uid,
            'history',
            series.id
        ),

        {
            seriesId: series.id,
            title: series.title,
            cover: series.cover,
            lastChapter: chapter,
            updatedAt:
                FB.serverTimestamp()
        },

        {
            merge: true
        }

    );

}


/*
 * Add/remove bookmark
 */

export async function toggleBookmark(
    series
) {

    if (
        !auth ||
        !auth.currentUser
    ) {

        return false;
    }


    const reference =
        FB.doc(
            db,
            'users',
            auth.currentUser.uid,
            'bookmarks',
            series.id
        );


    const snapshot =
        await FB.getDoc(
            reference
        );


    /*
     * Remove bookmark
     */

    if (snapshot.exists()) {

        await FB.deleteDoc(
            reference
        );

        return false;
    }


    /*
     * Add bookmark
     */

    await FB.setDoc(
        reference,
        {
            seriesId: series.id,
            title: series.title,
            cover: series.cover,
            createdAt:
                FB.serverTimestamp()
        }
    );


    return true;

}
```
