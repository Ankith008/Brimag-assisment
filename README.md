My design approach for this assignment was to keep everything simple, modular and clear. I first identified the basic features needed like adding orders, listing all orders, showing the details of a single order, and updating order status. Based on that, I structured my backend API and then built the frontend screens to talk to those endpoints. I wanted the system to feel similar to what a small factory or warehouse could actually use day-to-day.

For the backend, I used Express.js because it is lightweight and flexible. I created separate routes for adding a new order, fetching all orders, fetching by id, and updating the status. I connected it to a MySQL database since relational tables make more sense for order records. I also parameterized all SQL queries to avoid injection issues. I kept each function short and readable, just focusing on the logic needed for each request.

On the frontend, I used Next.js and TailwindCSS. I structured each section as its own page component — Add Order, Order List, Single Order and Update Order. I made sure the UI was minimal and clean, with a common navbar for navigation. In the update page, I also used a modal to highlight the selected order and blur the background, just to make the interaction smoother.

The biggest challenge was connecting the UI to the backend correctly, especially while switching ports, handling CORS and adjusting route names. I also had to rewrite some fetch logic so React doesn’t complain about state updates inside effects. Another challenge was displaying database results in an organized table format.

If I had more time, I would add login roles, order history, I would also include status-based color badges and better error handling.

For scaling this system in a real manufacturing company, I would move the database to a managed cloud server, add load balancers,split services into micro-functional modules, and implement role-based authorization. I’d also add caching for frequent reads, proper monitoring logs, and a message-queue system if order traffic becomes heavy. In large factories, I would even integrate live dashboards and warehouse sensors for real-time updates.

Overall, I tried to keep this system straightforward, but with a structure that can grow in the future.
