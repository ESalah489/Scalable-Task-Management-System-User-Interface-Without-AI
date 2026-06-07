
# Scalable Task Management System (user interface)

A responsive, high-performance task management dashboard built with **React.js**, **Tailwind CSS**, and **TanStack Query (React Query)**. This user interface is designed with a strong focus on decoupled component design, seamless server-state caching, and real-time synchronization.

---

##  Setup Instructions

1. **Clone the repository and navigate to the FrontEnd directory:**
cd filename

2. **Install dependencies:**
npm install

3. **Start the application:**
npm run dev

---

##  Architecture Decisions

* **Declarative State Management & Automatic Re-fetching:** Instead of abusing local React states or complex global managers (like Redux) for asynchronous data, we utilized **TanStack Query (React Query)**. This isolated our server state, giving us built-in caching, instant loading/error status handling, and automated UI re-fetching via explicit data mutations.

  * **Search & Filtering:** The `SearchBar` and `StatusFilters` capture user inputs dynamically. Instead of processing data locally, they instantly emit these search keywords and filter criteria upward to sync with the main API query parameters, ensuring that any typed text or status toggle immediately updates the fetched task collection.

  * **Pagination:** Works hand-in-hand with the filters to split high-volume tasks into structured, lightweight pages.

* **Isolated Real-Time Update Wrapper (`SocketListener.jsx`):** To avoid memory leaks and constant, redundant socket reconnections when a user types rapidly or changes pages,

* **Performance-Optimized Dynamic Sorting:** Built a centralized sorting utility wrapped inside a `useMemo` block using `localeCompare`. 

---

##  Key Trade-offs Made

 * **Local State Filters vs. URL Params:**
 Task filters and search terms are managed via standard React useState hooks instead of syncing them with the browser URL parameters. This was chosen to ensure immediate, zero-latency state changes within the given project timeframe.

---

## 📈 Production-Scale Improvements

**Debounced Search Inputs:**
  Implement a debouncer mechanism (like lodash.debounce) on the SearchBar to stop sending active HTTP network requests to the server on every single keystroke, drastically reducing server load.
