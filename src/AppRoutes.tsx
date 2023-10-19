import { lazy, Suspense, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loading from './components/UI/Loading/Loading';
import Protected from './components/core/Protected/Protected';
import NotFound from './pages/NotFound/NotFound';

import { BoletuxContext } from './store/boletux-context';

const Home = lazy(() => import('./pages/Home/Home'));
const Bets = lazy(() => import('./pages/Bets/Bets'));
const Lottery = lazy(() => import('./pages/Lottery/Lottery'));
const Vault = lazy(() => import('./pages/Vault/Vault'));
const NFTs = lazy(() => import('./pages/NFTs/NFTs'));
const Prizes = lazy(() => import('./pages/Prizes/Prizes'));

const AppRoutes = () => {
    const { isLoggedIn } = useContext(BoletuxContext);

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route
                path="/home"
                element={
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path="/bets"
                element={
                    <Suspense fallback={<Loading />}>
                        <Bets />
                    </Suspense>
                }
            />
            <Route
                path="/lottery"
                element={
                    <Suspense fallback={<Loading />}>
                        <Lottery />
                    </Suspense>
                }
            />
            <Route
                path="/vault"
                element={
                    <Suspense fallback={<Loading />}>
                        <Vault />
                    </Suspense>
                }
            />
            <Route
                path="/nfts"
                element={
                    <Suspense fallback={<Loading />}>
                        <NFTs />
                    </Suspense>
                }
            />
            <Route
                path="/prizes"
                element={
                    <Suspense fallback={<Loading />}>
                        <Prizes />
                    </Suspense>
                }
            />
            {/* <Route path="/bets"
                element={
                    <Suspense fallback={<Loading />}>
                        <Protected isLoggedIn={isLoggedIn}>
                            <Bets />
                        </Protected>
                    </Suspense>
                }
            /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
