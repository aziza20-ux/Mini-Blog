import {useEffect} from 'react';
import type {ComponentType} from 'react';

export const withLogger = <p extends object>(Component: ComponentType<p>)=>{
    const WrappedComponent=(props:p)=>{
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