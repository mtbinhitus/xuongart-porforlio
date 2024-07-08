import { VideoPlayer } from '../layouts';
import { HomePage } from '../pages';
import { route } from './route';

const routes = [
    { path: route.home, element: HomePage },
    { path: route.video, element: VideoPlayer },
];

export default routes;
