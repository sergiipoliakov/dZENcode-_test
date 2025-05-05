import { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import { Spinner } from 'react-bootstrap';

// Middlewares
import withTranslation from './middlewares/i18n';
import withOauth from './decorators/Oauth.dec';

function App(props: { routes?: string }) {
  const { routes } = props;

  const [routerComponents, setRouterComponents] = useState<{ path: string, key: string, component: React.FunctionComponent }[] | null>(null);

  async function getRouteComponets() {
    const cmp = routes === 'private' ? await import('./routing/private') : await import('./routing/public');
    setRouterComponents(cmp.default as any);
  }

  const renderComponent = (Component: React.FunctionComponent, key: string) => {
    return (
      <Layout title={key}>
        <Suspense
          fallback={<Spinner />}
        >
          <Component />
        </Suspense>
      </Layout>
    );
  };

  useEffect(() => {
    getRouteComponets();
    return () => {
      setRouterComponents(null);
    };
  }, [routes]);

  return (
    <Routes>
      <Route path="*" element={<Spinner />} />
      {
        (
          routerComponents?.map((route, i) => {
            const {
              path,
              component: Component
            } = route;
            return (
              <Route
                key={`${path}-${i}`}
                path={path}
                element={renderComponent(Component, path)}
              />
            );
          })
        )
      }
    </Routes>
  )
}

export default withTranslation(withOauth(App));
