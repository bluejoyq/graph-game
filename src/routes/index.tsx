import { createFileRoute } from '@tanstack/react-router';
import { Home } from '@/game/_modules/home';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Home />;
}
