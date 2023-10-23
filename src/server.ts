import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@/routes/events.route';
import BookingRoute from '@/routes/booking.route';
import DashboardRoute from '@/routes/dashboard.route';
import validateEnv from '@utils/validateEnv';

validateEnv();
const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new DashboardRoute(), new BookingRoute()]);

app.listen();
