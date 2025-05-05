import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom';
import publicRoutes from '../routing/public';
import { RoutesDefaultInterface, RoutesVisibilityTypes } from '../types/router';
import { Spinner } from 'react-bootstrap';

const withOauth = (WrapperComponent: React.FC<{routes: string}>): React.FC => {
    return () => {
        const isAuthorized = false
        const navigate = useNavigate();
        const [routes, setRoutes] = useState('');
        const location = useLocation();
        
        const routeKeys = useCallback(
            () => {
                return new Set([...publicRoutes.map((item: RoutesDefaultInterface): string => item.path)]);
            },
            [routes]
        );        
        const [isCheckedWhetherUserLoggedIn, setIsCheckedWhetherUserLoggedIn] = useState(false);


        const isUserLoggedIn = () => {
          setIsCheckedWhetherUserLoggedIn(true)
        }

        useEffect(() => {
            if (!isCheckedWhetherUserLoggedIn) return;
            const trailingSlash = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`;
            const matchedPublic = matchRoutes([...publicRoutes], location.pathname);
            
            if (!isAuthorized && !matchedPublic) {
                setRoutes(RoutesVisibilityTypes.public);
                navigate('/');
            } else if (!isAuthorized && matchedPublic) {
                setRoutes(RoutesVisibilityTypes.public);
            } else {
                setRoutes(RoutesVisibilityTypes.private);
                if (routeKeys().has(trailingSlash)) {
                  navigate(sessionStorage.getItem('lastPathname') || '/');
              }
            }
        }, [isAuthorized, isCheckedWhetherUserLoggedIn]);
        
        useEffect(() => {
            isUserLoggedIn();
        }, []);

        if (routes) return <WrapperComponent routes={routes} />;
        return <Spinner />;
    };
};

export default withOauth;
