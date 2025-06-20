import { useState, useEffect, useRef } from 'react';

export const useScrollspy = (ids: string[], options?: IntersectionObserverInit): string => {
    const [activeId, setActiveId] = useState('');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const elements = ids.map(id => document.getElementById(id.substring(1)));

        observer.current?.disconnect();

        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry?.isIntersecting) {
                    setActiveId(`#${entry.target.id}`);
                }
            });
        }, options);

        elements.forEach(el => {
            if (el) observer.current?.observe(el);
        });

        return () => observer.current?.disconnect();
    }, [ids, options]);

    return activeId;
};
