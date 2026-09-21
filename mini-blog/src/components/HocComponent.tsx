import {useEffect} from 'react';
import type {ComponentType} from 'react';

export const withLogger = <p extends object>(Component: ComponentType<p>)=>{
    const WrappedComponent=(props:p)=>{
        useEffect(()=>{
            console.log(`Component ${Component.name} mounted`);

            return()=>{
                console.log(`Component ${Component.name} unmounted`);
            };
        },[])
        return <Component {...props}/>
    }
    return WrappedComponent;
}