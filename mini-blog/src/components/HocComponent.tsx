import {useEffect} from 'react';
import type {ComponentType} from 'react';

export const withLogger = <P extends object>(Component: ComponentType<P>)=>{
    const WrappedComponent=(props:P)=>{
        useEffect(()=>{
            console.log(`Component mounted`);

            return()=>{
                console.log(`Component  unmounted`);
            };
        },[])
        return <Component {...props}/>
    }
    return WrappedComponent;
}