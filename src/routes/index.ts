import React from 'react';
import Main from '../pages/MainPage';

export interface IRoute{
    path:string;
    component:React.ComponentType;
    exact?:boolean;
}

export enum RouteNames {
    MAIN = '/'
}

export const routes: IRoute[]= [
    {path:'/', exact:true, component:Main}
]